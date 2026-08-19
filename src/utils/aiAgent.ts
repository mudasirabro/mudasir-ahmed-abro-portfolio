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

// Get API Key securely from Vite or environment
const getApiKey = (): string => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) {
      return import.meta.env.VITE_GEMINI_API_KEY;
    }
    if (typeof import.meta !== 'undefined' && import.meta.env?.GEMINI_API_KEY) {
      return import.meta.env.GEMINI_API_KEY;
    }
  } catch {}
  try {
    if (typeof process !== 'undefined' && process.env?.VITE_GEMINI_API_KEY) {
      return process.env.VITE_GEMINI_API_KEY;
    }
    if (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) {
      return process.env.GEMINI_API_KEY;
    }
  } catch {}
  return '';
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
   - Architecture Highlights: ${p.architectureDetails.highlights.join('; ')}
   - Frontend: ${p.architectureDetails.frontend || 'N/A'}
   - Backend: ${p.architectureDetails.backend || 'N/A'}
   - Database: ${p.architectureDetails.database || 'N/A'}`
    )
    .join('\n\n');

  const certsList = certificationsData
    .map(
      (c) =>
        `- **${c.title}** (${c.year}) by ${c.issuer}\n  * Verified Skills: ${c.skills.join(', ')}\n  * Coursera Verification: ${c.verifyUrl || 'Verified'}`
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
      modeSpecificPrompt = `\nCURRENT MODE: SYSTEM ARCHITECT & TECHNICAL DEEP-DIVE MODE\nFocus on full-stack architecture, API security, JWT authentication with HTTP-Only cookies, database schemas (MongoDB & MySQL), transactional locks, and prompt engineering pipelines. Include code patterns or architectural ASCII diagrams when helpful.`;
      break;
    case 'hire':
      modeSpecificPrompt = `\nCURRENT MODE: HIRE & INTERVIEW SCHEDULING MODE\nFocus on Mudasir's availability (immediate for full-time and high-impact remote contract roles), direct contact channels (email: ${personalDetails.email}, phone: ${personalDetails.phone}), and facilitating interview scheduling.`;
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
- If the visitor simply asks a question (e.g. "What certifications do you have?" or "How does the AI Resume builder work?"), DO NOT trigger an action! Instead, answer the question thoroughly, articulately, and directly in the chat!

==================================================
BEHAVIORAL GUIDELINES:
==================================================
1. ANSWER DIRECTLY: Always answer the user's specific question first in detail. Never dump generic boilerplate or recite raw resumes.
2. TONE: Eloquent, tech-forward, professional, and confident (like an advanced AI assistant).
3. TRUTHFULNESS: Base all factual answers strictly on Mudasir's verified information.
4. FORMATTING: Use clean markdown with headings, bullet points, and code snippets where appropriate.`;
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

// Intelligent Offline Natural Language Responder
const generateSmartOfflineReply = (query: string, mode: AgentMode = 'general'): string => {
  const q = query.toLowerCase();

  if (q.includes('cert') || q.includes('google') || q.includes('meta')) {
    return `Mudasir holds **4 verified industry credentials** from **Meta** and **Google** (2026):

1. **Meta Front-End Developer Professional Certificate** — React.js, UI/UX, Responsive Design, JavaScript.
2. **Google IT Automation with Python Professional Certificate** — Python Scripting, Automation, Git, REST APIs.
3. **Google Advanced Data Analytics Certificate** — Python Data Analysis, Statistics, Machine Learning, Tableau.
4. **Google AI Professional Certificate** — Generative AI, Prompt Engineering, LLMs.

All certifications are officially verified on Coursera. Would you like to explore his technical projects or ATS resume?`;
  }

  if (q.includes('who') || q.includes('about') || q.includes('mudasir') || q.includes('background')) {
    return `**Mudasir Ahmed Abro** is a **Full Stack Developer & Software Engineer** based in Karachi, Pakistan.

* **Academic Degree:** Bachelor of Science in Software Engineering from Sukkur IBA University (Graduating 2026).
* **Core Specialties:** Modern React.js frontends, React Native mobile apps, scalable Node.js/Express REST APIs, MongoDB & MySQL databases, and Generative AI prompt pipelines.
* **Track Record:** 4+ delivered production systems with 100% on-time completion and a verified +30% page speed optimization.

How can I assist you with his project architectures or hiring availability?`;
  }

  if (q.includes('project') || q.includes('work') || q.includes('app') || q.includes('resume builder') || q.includes('ecommerce')) {
    return `Mudasir has built **4 major production applications**:

1. **AI-Powered Resume Builder:** React + Node.js + OpenAI API + MongoDB. Reduced resume writing time by 80% with ATS-optimized schema automation.
2. **Transactional E-Commerce Engine:** MERN Stack + JWT + Session locks. 100% CRUD reliability with zero race conditions during order placement.
3. **Food Delivery Mobile App:** React Native + Node.js + MongoDB. Real-time order status tracking with a 3-role permission workflow (Customer, Restaurant, Admin).
4. **School Management Platform:** React + Node.js + MySQL. Normalized relational database handling 200+ active student records and automated GPA triggers.`;
  }

  if (q.includes('evaluat') || q.includes('hire') || q.includes('fit') || q.includes('why should') || mode === 'recruiter') {
    return `### 🎯 Candidate Fit Assessment for Mudasir Ahmed Abro:

* **Frontend Mastery:** 95% proficiency in React.js, Tailwind CSS, TypeScript, and responsive state architecture (certified by Meta).
* **Backend & API Design:** 92% in Node.js & Express.js REST APIs with robust JWT token authentication, RBAC middleware, and SQL/NoSQL databases.
* **Production Reliability:** 100% on-time delivery rate on freelance client contracts, with +30% average speed boosts on delivered apps.
* **Strong CS Foundation:** Formal Software Engineering curriculum from Sukkur IBA (SDLC, Data Structures, OOP, QA).

Mudasir is available immediately for full-time software engineering roles and remote contracts.`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('phone') || mode === 'hire') {
    return `You can reach Mudasir directly via:

* 📧 **Email:** [${personalDetails.email}](mailto:${personalDetails.email})
* 📞 **Phone:** [${personalDetails.phone}](tel:${personalDetails.phone})
* 💼 **LinkedIn:** [${personalDetails.linkedin}](${personalDetails.linkedin})
* 🐙 **GitHub:** [${personalDetails.github}](${personalDetails.github})

He is currently active and open for full-time engineering opportunities and contract projects.`;
  }

  if (q.includes('open resume') || q.includes('show resume')) {
    return `Opening Mudasir's complete ATS-Optimized Resume specification for you right now. [ACTION:OPEN_RESUME]`;
  }

  return `I am **JARVIS 2050**, Mudasir's Autonomous AI Representative. I can assist you with his Full Stack engineering capabilities, 4x Meta & Google credentials, MERN & Python system architectures, or schedule an interview. What would you like to explore?`;
};

// Main Agent Response Generator
export const generateAgentResponse = async (
  conversationHistory: ChatMessage[],
  currentPrompt: string,
  mode: AgentMode = 'general'
): Promise<{ text: string; action: string | null }> => {
  const apiKey = getApiKey();

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = buildSystemInstruction(mode);

      // Map recent conversation history
      const recentHistory = conversationHistory.slice(-8);
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      for (const msg of recentHistory) {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        });
      }

      // Add current user prompt
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
          // Try fallback model
          continue;
        }
      }
    } catch {
      // Proceed to smart offline fallback
    }
  }

  // Fallback if no key or network failure
  const offlineRaw = generateSmartOfflineReply(currentPrompt, mode);
  const { cleanText, action } = parseAgentAction(offlineRaw);
  return { text: cleanText, action };
};
