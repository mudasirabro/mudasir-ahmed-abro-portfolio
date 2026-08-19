import { GoogleGenAI } from '@google/genai';
import {
  personalDetails,
  projectsData,
  skillsData,
  certificationsData,
  experienceData,
  educationData,
} from '../data/resumeData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'jarvis';
  text: string;
  timestamp: string;
  action?: string | null;
}

// Get API Key securely from Vite or environment (.env.local)
const getApiKey = (): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
  if (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) {
    return process.env.GEMINI_API_KEY;
  }
  return '';
};

// Build comprehensive system prompt with rich context
const buildSystemInstruction = (): string => {
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
    .map((c) => `- **${c.title}** (${c.year}) by ${c.issuer} [Skills: ${c.skills.join(', ')}] (Verification: ${c.verifyUrl || 'Verified'})`)
    .join('\n');

  const expList = experienceData
    .map(
      (e) => `- **${e.role}** @ ${e.company} (${e.period}, ${e.location})
  Key Contributions:
  ${e.bullets.map((b) => `  * ${b}`).join('\n')}
  Stack: ${e.techStack.join(', ')}`
    )
    .join('\n\n');

  return `You are JARVIS 2050, the Personal AI Agent and Autonomous Digital Representative of Mudasir Ahmed Abro.
You live inside Mudasir's high-tech, futuristic 2050 portfolio website.
Your mission is to represent Mudasir professionally, answer technical & architectural questions, assist recruiters/hiring managers, evaluate job fits, and interactively guide visitors through his portfolio.

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

4. VERIFIED CERTIFICATIONS (2026):
${certsList}

5. TECHNICAL SKILLS & STACK:
${skillsList}

6. PRODUCTION PROJECTS & ARCHITECTURE:
${projectsList}

7. WORK EXPERIENCE:
${expList}

==================================================
INTERACTIVE ACTIONS / TOOLS CAPABILITY:
==================================================
You have the power to control the user's view on this portfolio website by appending special action tags at the very end of your response when appropriate:
- If the user asks to see/open/download his resume or ATS resume: include "[ACTION:OPEN_RESUME]"
- If the user wants to see/browse his projects: include "[ACTION:SCROLL_PROJECTS]"
- If the user asks about his technical skills or stack: include "[ACTION:SCROLL_SKILLS]"
- If the user asks to see his work experience/history: include "[ACTION:SCROLL_EXPERIENCE]"
- If the user asks about credentials or certificates: include "[ACTION:SCROLL_CERTS]"
- If the user wants to contact, hire, or email Mudasir: include "[ACTION:SCROLL_CONTACT]"

==================================================
BEHAVIORAL GUIDELINES:
==================================================
1. TONE: Sharp, knowledgeable, professional, tech-savvy, articulate, and welcoming (like a sophisticated AI assistant).
2. ACCURACY: Provide exact, factual information based strictly on Mudasir's verified background. Never invent fake degrees or projects.
3. RECRUITER ASSISTANCE: If someone asks if Mudasir fits a certain role (e.g. Frontend Engineer, Full Stack Developer, React/Node Developer, AI Engineer), highlight his exact matching skills, production experience, and invite them to hire or schedule a conversation.
4. FORMATTING: Use clean markdown with bullet points, bold highlights, or short code snippets where appropriate to make responses pleasant and easy to read.
5. CONCISENESS: Be thorough yet concise. Keep responses between 2-4 focused paragraphs or structured bullet lists.`;
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

// Offline intelligent fallback in case of no internet
const generateSmartOfflineReply = (query: string): string => {
  const q = query.toLowerCase();

  if (q.includes('who') || q.includes('about') || q.includes('mudasir')) {
    return `${personalDetails.name} is a Full Stack Developer & Software Engineer with a BS in Software Engineering from Sukkur IBA. He is certified 4x by Meta & Google (Front-End, Python Automation, Advanced Data Analytics, and AI).\n\nWould you like me to open his ATS Resume for you? [ACTION:OPEN_RESUME]`;
  }
  if (q.includes('project') || q.includes('work') || q.includes('app')) {
    const pNames = projectsData.map((p) => p.title).join(', ');
    return `Mudasir has engineered production systems including: **${pNames}**.\n\nHis applications feature MERN architecture, transactional payment pipelines, and AI integration. [ACTION:SCROLL_PROJECTS]`;
  }
  if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
    return `Mudasir's core stack spans **React.js, Node.js, Express.js, MongoDB, MySQL, Python, TypeScript, Tailwind CSS, REST APIs, and React Native**. [ACTION:SCROLL_SKILLS]`;
  }
  if (q.includes('cert') || q.includes('google') || q.includes('meta')) {
    const certNames = certificationsData.map((c) => `• ${c.title} (${c.issuer})`).join('\n');
    return `Mudasir holds 4 verified professional certifications:\n\n${certNames}\n\nAll verified on Coursera! [ACTION:SCROLL_CERTS]`;
  }
  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone')) {
    return `You can reach Mudasir directly via Email at **${personalDetails.email}** or Phone at **${personalDetails.phone}**. He is open for full-time roles & contract opportunities! [ACTION:SCROLL_CONTACT]`;
  }
  if (q.includes('resume')) {
    return `Here is Mudasir's full ATS-optimized resume. Opening it now for you. [ACTION:OPEN_RESUME]`;
  }

  return `System Query Acknowledged: "${query}". Mudasir is an expert Full Stack Engineer with proven production apps in React, Node.js, and Python. How can I assist with his technical background or projects?`;
};

// Main Agent Response Generator
export const generateAgentResponse = async (
  conversationHistory: ChatMessage[],
  currentPrompt: string
): Promise<{ text: string; action: string | null }> => {
  const apiKey = getApiKey();

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = buildSystemInstruction();

    // Map conversation history into Gemini format (last 8 messages for context)
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
            temperature: 0.7,
          },
        });

        if (response.text) {
          const { cleanText, action } = parseAgentAction(response.text);
          return { text: cleanText, action };
        }
      } catch {
        // Try next fallback model
        continue;
      }
    }
    } catch {
      // Top-level catch: proceed to smart offline fallback
    }
  }

  // Fallback if all API attempts fail
  const offlineRaw = generateSmartOfflineReply(currentPrompt);
  const { cleanText, action } = parseAgentAction(offlineRaw);
  return { text: cleanText, action };
};
