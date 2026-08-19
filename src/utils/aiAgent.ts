import { GoogleGenAI } from '@google/genai';
import {
  personalDetails,
  projectsData,
  skillsData,
  certificationsData,
  experienceData,
  educationData,
} from '../data/resumeData';

export type AgentMode = 'general' | 'recruiter' | 'architect' | 'hire';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'jarvis';
  text: string;
  timestamp: string;
  action?: string | null;
  mode?: AgentMode;
}

// Get API Key from localStorage, Vite, or process environment
export const getApiKey = (): string => {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('JARVIS_GEMINI_API_KEY');
      if (stored && stored.trim().length > 10) return stored.trim();
    }
  } catch {}
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) {
      const key = import.meta.env.VITE_GEMINI_API_KEY;
      if (key && !key.startsWith('AQ.')) return key;
    }
  } catch {}
  try {
    if (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) {
      const key = process.env.GEMINI_API_KEY;
      if (key && !key.startsWith('AQ.')) return key;
    }
  } catch {}
  return '';
};

export const setCustomApiKey = (key: string) => {
  try {
    if (typeof window !== 'undefined') {
      if (key.trim()) {
        localStorage.setItem('JARVIS_GEMINI_API_KEY', key.trim());
      } else {
        localStorage.removeItem('JARVIS_GEMINI_API_KEY');
      }
    }
  } catch {}
};

// Build comprehensive system prompt with rich context tailored to current Agent Mode
const buildSystemInstruction = (mode: AgentMode = 'general'): string => {
  const skillsList = skillsData
    .map((cat) => `${cat.category}: ${cat.skills.map((s) => `${s.name} (${s.level}%)`).join(', ')}`)
    .join('\n');

  const projectsList = projectsData
    .map(
      (p, i) =>
        `${i + 1}. **${p.title}** (${p.category})
   - Subtitle: ${p.subtitle}
   - Description: ${p.description}
   - Tech Stack: ${p.technologies.join(', ')}
   - Key Metrics: ${p.metrics.join(' | ')}
   - Architecture Highlights: ${p.architectureDetails.highlights.join('; ')}`
    )
    .join('\n\n');

  const certsList = certificationsData
    .map(
      (c) =>
        `- **${c.title}** (${c.year}) by ${c.issuer} | Skills: ${c.skills.join(', ')} | Verification: ${c.verifyUrl || 'Verified'}`
    )
    .join('\n');

  const expList = experienceData
    .map(
      (e) => `- **${e.role}** @ ${e.company} (${e.period}, ${e.location})
  Key Contributions:
  ${e.bullets.map((b) => `  * ${b}`).join('\n')}
  Stack: ${e.techStack.join(', ')}`
    )
    .join('\n\n');

  let modeSpecificPrompt = '';
  switch (mode) {
    case 'recruiter':
      modeSpecificPrompt = `\nCURRENT MODE: RECRUITER & TALENT SCREENING MODE\nFocus on evaluating job fit, soft skills, team collaboration, technical competence in React/Node/Python, and highlighting business value, latency improvements (+30%), and 100% on-time delivery.`;
      break;
    case 'architect':
      modeSpecificPrompt = `\nCURRENT MODE: SYSTEM ARCHITECT & TECHNICAL DEEP-DIVE MODE\nFocus on full-stack architecture, API security, JWT authentication with HTTP-Only cookies, database schemas (MongoDB & MySQL), transactional locks, and prompt engineering pipelines.`;
      break;
    case 'hire':
      modeSpecificPrompt = `\nCURRENT MODE: HIRE & INTERVIEW SCHEDULING MODE\nFocus on Mudasir's immediate availability for full-time and remote roles, direct contact channels (email: ${personalDetails.email}, phone: ${personalDetails.phone}), and interview scheduling.`;
      break;
    default:
      modeSpecificPrompt = `\nCURRENT MODE: GENERAL HIGH-TECH AGENT MODE\nDeliver articulate, tech-savvy, and comprehensive responses across Mudasir's full portfolio, background, credentials, and projects.`;
      break;
  }

  return `You are JARVIS 2050, the Personal AI Agent and Autonomous Digital Representative of Mudasir Ahmed Abro.
You are embedded inside Mudasir's futuristic 2050 portfolio website.
Your role is to represent Mudasir as an intelligent, articulate, high-level AI Assistant.

==================================================
KNOWLEDGE BASE: MUDASIR AHMED ABRO
==================================================

1. CANDIDATE PROFILE:
- Full Name: ${personalDetails.name}
- Title: ${personalDetails.title}
- Tagline: ${personalDetails.tagline}
- Location: ${personalDetails.location}
- Email: ${personalDetails.email}
- Phone: ${personalDetails.phone}
- LinkedIn: ${personalDetails.linkedin}
- GitHub: ${personalDetails.github}
- Summary: ${personalDetails.summary}

2. STATS & TRACK RECORD:
- 4+ Production-ready applications delivered across E-Commerce, AI & Enterprise
- 100% On-Time Delivery Rate with verified client satisfaction
- +30% Page Load Speed Boost via frontend & REST API optimization
- 4x Verified Professional Certifications from Meta and Google

3. ACADEMIC QUALIFICATION:
- Degree: ${educationData.degree}
- Institution: ${educationData.institution}
- Location: ${educationData.location} (${educationData.period})
- Core Disciplines: SDLC, OOP, Data Structures & Algorithms, DBMS, Software Architecture, System Design, Software QA & Agile testing.

4. 4x VERIFIED PROFESSIONAL CERTIFICATIONS (2026):
${certsList}

5. TECHNICAL SKILLS & PROFICIENCY:
${skillsList}

6. PRODUCTION PROJECTS & ARCHITECTURES:
${projectsList}

7. WORK EXPERIENCE & IMPACT:
${expList}

${modeSpecificPrompt}

==================================================
INTERACTIVE ACTIONS / TOOLS CAPABILITY:
==================================================
You can trigger website actions ONLY when the visitor explicitly asks to perform an action or navigate:
- Explicit request to open/view/download ATS resume: include "[ACTION:OPEN_RESUME]"
- Explicit request to navigate/scroll to projects section: include "[ACTION:SCROLL_PROJECTS]"
- Explicit request to navigate/scroll to skills section: include "[ACTION:SCROLL_SKILLS]"
- Explicit request to navigate/scroll to certifications: include "[ACTION:SCROLL_CERTS]"
- Explicit request to navigate/scroll to contact section: include "[ACTION:SCROLL_CONTACT]"

CRITICAL RULE FOR ACTIONS:
- If the visitor simply asks a question (e.g. "What certifications do you have?" or "How does the AI Resume builder work?"), DO NOT trigger an action tag! Instead, answer the question directly, articulately, and in full detail in the chat!

==================================================
BEHAVIORAL GUIDELINES:
==================================================
1. ANSWER DIRECTLY: Always answer the user's specific question directly with high eloquence.
2. TONE: Sharp, knowledgeable, professional, and tech-forward.
3. ACCURACY: Strict adherence to verified credentials.`;
};

// Parse any embedded action token from AI response
export const parseAgentAction = (rawResponse: string): { cleanText: string; action: string | null } => {
  const actionRegex = /\[ACTION:([A-Z_]+)\]/i;
  const match = rawResponse.match(actionRegex);

  if (match) {
    const action = match[1].toUpperCase();
    const cleanText = rawResponse.replace(actionRegex, '').trim();
    return { cleanText, action };
  }

  return { cleanText: rawResponse.trim(), action: null };
};

// Execute UI action on webpage
export const executeUiAction = (
  action: string,
  callbacks?: {
    openResume?: () => void;
    openTerminal?: () => void;
  }
) => {
  switch (action) {
    case 'OPEN_RESUME':
      if (callbacks?.openResume) callbacks.openResume();
      break;
    case 'SCROLL_PROJECTS': {
      const el = document.getElementById('projects');
      el?.scrollIntoView({ behavior: 'smooth' });
      break;
    }
    case 'SCROLL_SKILLS': {
      const el = document.getElementById('skills');
      el?.scrollIntoView({ behavior: 'smooth' });
      break;
    }
    case 'SCROLL_EXPERIENCE': {
      const el = document.getElementById('experience');
      el?.scrollIntoView({ behavior: 'smooth' });
      break;
    }
    case 'SCROLL_CERTS': {
      const el = document.getElementById('certifications');
      el?.scrollIntoView({ behavior: 'smooth' });
      break;
    }
    case 'SCROLL_CONTACT': {
      const el = document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth' });
      break;
    }
    default:
      break;
  }
};

// Deep Multi-Intent Natural Language Intelligence Engine
export const generateSmartOfflineReply = (query: string, mode: AgentMode = 'general'): string => {
  const q = query.toLowerCase().trim();

  // 1. Specific Certifications / Credentials Query
  if (
    q.includes('cert') ||
    q.includes('google and meta') ||
    q.includes('meta & google') ||
    q.includes('credential') ||
    q.includes('meta cert') ||
    q.includes('google cert')
  ) {
    return `Mudasir holds **4 verified Professional Certifications** issued by **Meta** and **Google** (via Coursera):

1. **Meta Front-End Developer Professional Certificate (2026)**
   * **Core Competencies:** React.js, Advanced JavaScript (ES6+), HTML5/CSS3, Responsive UI/UX, Component Architecture.
   * [Verify on Coursera](https://coursera.org/verify/professional-cert/SWDZZUJZAZ06)

2. **Google IT Automation with Python Professional Certificate (2026)**
   * **Core Competencies:** Python Scripting, Workflow Automation, REST APIs, Git/GitHub Version Control, System Troubleshooting.
   * [Verify on Coursera](https://coursera.org/verify/professional-cert/5V7PGR43TZGI)

3. **Google Advanced Data Analytics Certificate (2026)**
   * **Core Competencies:** Exploratory Data Analysis, Statistical Modeling, Machine Learning foundations, Python, Tableau.
   * [Verify on Coursera](https://coursera.org/verify/professional-cert/C6WGLX3FN30J)

4. **Google AI Professional Certificate (2026)**
   * **Core Competencies:** Generative AI Architecture, Prompt Engineering, Large Language Models (LLMs), AI Application Integration.
   * [Verify on Coursera](https://coursera.org/verify/professional-cert/EEMOLF5E7TNV)

These credentials validate his proficiency across front-end engineering, backend automation, data analytics, and generative AI.`;
  }

  // 2. Candidate Evaluation for Full Stack / Recruiter Fit
  if (
    q.includes('evaluate') ||
    q.includes('full stack react') ||
    q.includes('react & node') ||
    q.includes('react and node') ||
    q.includes('fit') ||
    q.includes('why should') ||
    q.includes('hire him') ||
    mode === 'recruiter'
  ) {
    return `### 🎯 Candidate Fit Assessment for Mudasir Ahmed Abro:

* **Frontend Engineering (95% Mastery):** Certified by Meta. Expert in React.js, Tailwind CSS, TypeScript, component modularity, state management, and real-time UI synchronization.
* **Backend & REST APIs (92% Mastery):** Proficient in Node.js & Express.js with secure JWT authentication (HTTP-Only cookies), Role-Based Access Control (RBAC), and transactional database queries across MongoDB and MySQL.
* **Quantifiable Impact:** Proven record of achieving a **+30% Page Load Speed Boost** and maintaining a **100% On-Time Delivery Rate** across freelance contracts.
* **CS & Systems Rigor:** Completing a formal **BS in Software Engineering** at Sukkur IBA University (Graduating 2026), mastering Data Structures, Algorithms, SDLC, and Software QA.

Mudasir brings end-to-end product development velocity with high engineering standards from Day 1.`;
  }

  // 3. Key Delivery Metrics & Performance Boosts
  if (
    q.includes('metric') ||
    q.includes('performance boost') ||
    q.includes('delivery rate') ||
    q.includes('speed') ||
    q.includes('boost')
  ) {
    return `### ⚡ Mudasir's Verified Engineering Metrics:

1. **+30% Page Load Speed Boost:** Optimized front-end bundling, implemented code-splitting in Vite/React, and streamlined database queries across full-stack applications.
2. **100% On-Time Delivery Rate:** Completed and deployed 4+ full-stack and mobile production applications on schedule with zero critical post-deployment blockers.
3. **80% Resume Writing Time Reduction:** Designed and launched an AI-Powered Resume Builder utilizing dynamic prompt pipelines and schema-strict OpenAI integration.
4. **100% Transactional Integrity:** Engineered a full-scale multi-vendor e-commerce platform with concurrency locks preventing race conditions in cart and inventory operations.`;
  }

  // 4. Hiring Availability & Contact
  if (
    q.includes('availab') ||
    q.includes('when can start') ||
    q.includes('open for') ||
    q.includes('hire mudasir') ||
    mode === 'hire'
  ) {
    return `### 💼 Mudasir's Availability & Direct Contact:

* **Current Status:** Available immediately for full-time Software Engineer positions and remote engineering contracts.
* **Preferred Roles:** Full Stack Developer, Frontend Engineer (React), Node.js Backend Engineer, or AI Application Engineer.
* **Direct Channels:**
  * 📧 **Email:** [${personalDetails.email}](mailto:${personalDetails.email})
  * 📞 **Phone:** [${personalDetails.phone}](tel:${personalDetails.phone})
  * 💼 **LinkedIn:** [${personalDetails.linkedin}](${personalDetails.linkedin})
  * 🐙 **GitHub:** [${personalDetails.github}](${personalDetails.github})
  * 📍 **Location:** ${personalDetails.location} (Open to Remote & Relocation)`;
  }

  // 5. System Architecture: AI Resume Builder
  if (
    q.includes('ai resume') ||
    q.includes('resume builder') ||
    (q.includes('architecture') && q.includes('resume'))
  ) {
    return `### 🏗️ AI-Powered Resume Builder Architecture:

* **Frontend:** React.js dynamic multi-step wizard with live ATS preview canvas and real-time keyword density calculations.
* **Backend Proxy:** Node.js & Express.js secure API gateway isolating OpenAI API credentials and enforcing rate-limiting middleware.
* **Prompt Pipeline:** Custom prompt engineering that enforces structured JSON schema outputs from LLMs for automated section parsing.
* **Database:** MongoDB storing user profile schemas, saved resume configurations, and template states.
* **Export Engine:** Client-side ATS-compliant PDF generation optimized for recruitment parsing software (Lever, Greenhouse).`;
  }

  // 6. System Architecture: E-Commerce Web Platform
  if (
    q.includes('ecommerce') ||
    q.includes('e-commerce') ||
    q.includes('shop') ||
    (q.includes('architecture') && q.includes('commerce'))
  ) {
    return `### 🏗️ E-Commerce Web Platform Architecture:

* **Stack:** Full MERN (MongoDB, Express.js, React.js, Node.js).
* **Security & Auth:** JSON Web Tokens (JWT) stored in HTTP-Only cookies with role-based access control (Admin, Vendor, Customer).
* **Concurrency Handling:** Transactional database session locks that prevent race conditions and inventory overselling during simultaneous checkouts.
* **State Management:** Centralized cart and checkout pipeline with real-time order lifecycle tracking.`;
  }

  // 7. System Architecture: Food Delivery Mobile App
  if (
    q.includes('food') ||
    q.includes('mobile app') ||
    q.includes('react native') ||
    q.includes('delivery app')
  ) {
    return `### 📱 Food Delivery Mobile App Architecture:

* **Framework:** React Native delivering cross-platform iOS and Android builds from a single codebase.
* **Backend:** Node.js & Express.js REST API with MongoDB data persistence.
* **Role Architecture:** 3-role workflow partition (Customer ordering, Restaurant dashboard, Courier delivery dispatch).
* **Key Feature:** Dynamic menu search, order dispatch lifecycle, and real-time status management.`;
  }

  // 8. System Architecture: School Management System
  if (
    q.includes('school') ||
    q.includes('student') ||
    q.includes('management system') ||
    q.includes('mysql')
  ) {
    return `### 🏫 School Management System Architecture:

* **Stack:** React.js frontend connected to a Node.js REST API backed by **MySQL**.
* **Relational Design:** 3NF normalized schema with foreign key constraints across Students, Teachers, Courses, and Attendance tables.
* **Scale:** Manages 200+ active student records with automated GPA calculations and role-restricted teacher/admin dashboards.`;
  }

  // 9. Education & Academic Degree
  if (
    q.includes('sukkur') ||
    q.includes('degree') ||
    q.includes('iba') ||
    q.includes('university') ||
    q.includes('education') ||
    q.includes('study')
  ) {
    return `### 🎓 Academic Degree & Foundation:

* **Degree:** Bachelor of Science in Software Engineering (BS-SE)
* **Institution:** **Sukkur IBA University** (Sukkur Institute of Business Administration)
* **Graduation:** Expected May 2026 | Location: Sukkur, Pakistan
* **Core Disciplines:** Software Architecture & System Design, Data Structures & Algorithms, Object-Oriented Programming (OOP), Database Management Systems (DBMS), Software Testing & Quality Assurance, Agile/Scrum Methodologies.`;
  }

  // 10. Technical Skills & Matrix
  if (
    q.includes('skill') ||
    q.includes('stack') ||
    q.includes('technolog') ||
    q.includes('languages') ||
    q.includes('tools')
  ) {
    return `### 💻 Mudasir's Categorized Technical Skill Matrix:

* **Frontend:** React.js (95%), Tailwind CSS (95%), JavaScript ES6+ (95%), React Native (85%), HTML5/CSS3 (95%), TypeScript (80%).
* **Backend:** Node.js (92%), Express.js (92%), RESTful APIs (95%), JWT Authentication (90%), Python (85%).
* **Databases:** MongoDB / Mongoose (90%), MySQL / SQL (85%).
* **AI & Automation:** Prompt Engineering & LLM APIs (88%), Generative AI Pipelines (85%), Automation Scripting (85%).
* **Tools & DevOps:** Git/GitHub (95%), Postman (90%), Vite (90%), VS Code (95%).`;
  }

  // 11. Work Experience & EvoDynamics
  if (
    q.includes('experience') ||
    q.includes('evodynamics') ||
    q.includes('work history') ||
    q.includes('company') ||
    q.includes('intern')
  ) {
    return `### 💼 Work Experience & Track Record:

* **Software Engineer Intern @ EvoDynamics Vision** (2024 – Present | Karachi, Pakistan)
  * Developed modular, reusable React UI components reducing development cycles across sprints.
  * Designed RESTful API endpoints with Express.js and optimized MongoDB aggregations for high query performance.
  * Conducted API unit testing with Postman and participated in Agile sprint reviews and code reviews.
* **Full Stack Freelance Engineer** (2023 – Present)
  * Built and deployed 4+ production web and mobile platforms with 100% on-time delivery and +30% average speed boosts.`;
  }

  // 12. Open Resume Action
  if (q.includes('open resume') || q.includes('show resume') || q.includes('view resume')) {
    return `Opening Mudasir Ahmed Abro's complete ATS-Optimized Resume specification right now. [ACTION:OPEN_RESUME]`;
  }

  // Default Overview
  return `### 🤖 JARVIS 2050 — Mudasir Ahmed Abro

* **Title:** Full Stack Software Engineer & Quantum AI Architect
* **Education:** BS Software Engineering @ Sukkur IBA University (2026)
* **Credentials:** 4x Meta & Google Certified (React, Python, Data Analytics, Generative AI)
* **Production Projects:** AI Resume Builder, Multi-Vendor E-Commerce, Food Delivery App, School Management Platform.

How can I assist you with his candidate evaluation, technical deep dives, or interview scheduling?`;
};

// Main Agent Response Generator
export const generateAgentResponse = async (
  conversationHistory: ChatMessage[],
  currentPrompt: string,
  mode: AgentMode = 'general'
): Promise<{ text: string; action: string | null }> => {
  const apiKey = getApiKey();

  // If a valid Google AI Studio key is configured (AIzaSy...)
  if (apiKey && apiKey.startsWith('AIzaSy')) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = buildSystemInstruction(mode);

      const recentHistory = conversationHistory.slice(-8);
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      for (const msg of recentHistory) {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        });
      }

      contents.push({
        role: 'user',
        parts: [{ text: currentPrompt }],
      });

      const modelsToTry = ['gemini-3.7-flash', 'gemini-3.6-flash'];

      for (const model of modelsToTry) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents,
            config: {
              systemInstruction,
              temperature: 0.65,
            },
          });

          if (response.text) {
            const { cleanText, action } = parseAgentAction(response.text);
            return { text: cleanText, action };
          }
        } catch {
          continue;
        }
      }
    } catch {
      // Proceed to smart offline NLP engine
    }
  }

  // Fallback to our deep Multi-Intent Natural Language Intelligence Engine
  const offlineRaw = generateSmartOfflineReply(currentPrompt, mode);
  const { cleanText, action } = parseAgentAction(offlineRaw);
  return { text: cleanText, action };
};
