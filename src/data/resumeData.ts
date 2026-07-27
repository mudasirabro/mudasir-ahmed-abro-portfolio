import { Project, Experience, SkillCategory, Certification, Education } from '../types';

export const personalDetails = {
  name: 'Mudasir Ahmed Abro',
  title: 'Full Stack Developer & Software Engineer',
  tagline: 'Building High-Performance E-Commerce, AI & Enterprise Solutions',
  location: 'Karachi, Sindh, Pakistan',
  phone: '+92 300 1883369',
  email: 'mudasirahmedabro@gmail.com',
  linkedin: 'https://linkedin.com/in/mudasir-ahmed-abro',
  github: 'https://github.com/mudasirabro',
  
  // ✅ FIXED IMAGE PATHS FOR VERCEL (using /images/ instead of /src/assets/images/)
  avatarUrl: '/images/myimagepfp.jpeg',
  originalAvatarUrl: '/images/myimagepfp.jpeg',
  hologramAvatarUrl: '/images/myimagepfp.jpeg',
  real2050AvatarUrl: '/images/myimagepfp.jpeg',
  
  summary: `Results-driven Full Stack Developer and Software Engineer with hands-on experience building and deploying production-ready web and mobile applications across e-commerce, AI, and enterprise domains. Proficient in the complete SDLC — from responsive front-end interfaces (React.js) and robust RESTful APIs (Node.js, Express.js) to scalable database architecture (MongoDB, MySQL). Certified by Google in IT Automation with Python, Project Management, and AI. Eager to contribute clean, maintainable code, strong problem-solving skills, and a solid engineering foundation to a forward-thinking software team.`,
  stats: [
    { label: 'Production Apps Delivered', value: '4+', subtext: 'E-commerce, AI & Enterprise' },
    { label: 'On-Time Delivery Rate', value: '100%', subtext: 'Client Satisfaction Verified' },
    { label: 'Page Load Speed Boost', value: '30%', subtext: 'Frontend & API Optimized' },
    { label: 'Google Certifications', value: '3x', subtext: 'Python, Project Mgmt & AI' },
  ],
};

export const skillsData: SkillCategory[] = [
  {
    category: 'Frontend',
    iconName: 'Layout',
    skills: [
      { name: 'React.js', level: 95, experienceYear: '3+ Yrs', isPrimary: true },
      { name: 'JavaScript (ES6+)', level: 92, experienceYear: '3+ Yrs', isPrimary: true },
      { name: 'HTML5 / CSS3', level: 95, experienceYear: '3+ Yrs' },
      { name: 'Responsive UI Design', level: 90, experienceYear: '3+ Yrs', isPrimary: true },
      { name: 'Tailwind CSS', level: 90, experienceYear: '2+ Yrs' },
    ],
  },
  {
    category: 'Backend',
    iconName: 'Server',
    skills: [
      { name: 'Node.js', level: 92, experienceYear: '3+ Yrs', isPrimary: true },
      { name: 'Express.js', level: 92, experienceYear: '3+ Yrs', isPrimary: true },
      { name: 'RESTful API Design', level: 95, experienceYear: '3+ Yrs', isPrimary: true },
      { name: 'Authentication & JWT', level: 90, experienceYear: '2+ Yrs', isPrimary: true },
      { name: 'Role-Based Access Control', level: 88, experienceYear: '2+ Yrs' },
    ],
  },
  {
    category: 'Mobile',
    iconName: 'Smartphone',
    skills: [
      { name: 'React Native', level: 85, experienceYear: '2+ Yrs', isPrimary: true },
      { name: 'Flutter', level: 78, experienceYear: '1+ Yr' },
      { name: 'Cross-Platform Dev', level: 85, experienceYear: '2+ Yrs' },
    ],
  },
  {
    category: 'Languages',
    iconName: 'Code',
    skills: [
      { name: 'JavaScript', level: 94, experienceYear: '3+ Yrs', isPrimary: true },
      { name: 'Python', level: 88, experienceYear: '2+ Yrs', isPrimary: true },
      { name: 'Java', level: 80, experienceYear: '2+ Yrs' },
      { name: 'C++', level: 78, experienceYear: '2+ Yrs' },
    ],
  },
  {
    category: 'Databases',
    iconName: 'Database',
    skills: [
      { name: 'MongoDB', level: 90, experienceYear: '2+ Yrs', isPrimary: true },
      { name: 'MySQL / SQL', level: 88, experienceYear: '2+ Yrs', isPrimary: true },
      { name: 'Database Architecture', level: 85, experienceYear: '2+ Yrs' },
    ],
  },
  {
    category: 'DevOps & Tools',
    iconName: 'Wrench',
    skills: [
      { name: 'Git & GitHub', level: 92, experienceYear: '3+ Yrs', isPrimary: true },
      { name: 'Postman', level: 90, experienceYear: '3+ Yrs' },
      { name: 'VS Code', level: 95, experienceYear: '3+ Yrs' },
      { name: 'Linux CLI', level: 82, experienceYear: '2+ Yrs' },
    ],
  },
  {
    category: 'Practices',
    iconName: 'Layers',
    skills: [
      { name: 'Agile / Scrum', level: 90, experienceYear: '2+ Yrs', isPrimary: true },
      { name: 'SDLC', level: 92, experienceYear: '3+ Yrs', isPrimary: true },
      { name: 'OOP & MVC Architecture', level: 90, experienceYear: '3+ Yrs' },
      { name: 'Data Structures & Algo', level: 85, experienceYear: '3+ Yrs' },
      { name: 'Software QA', level: 82, experienceYear: '2+ Yrs' },
      { name: 'Business Analysis', level: 80, experienceYear: '1+ Yr' },
    ],
  },
];

export const projectsData: Project[] = [
  {
    id: 'ai-resume-builder',
    title: 'AI-Powered Resume Builder',
    category: 'AI',
    subtitle: 'ATS-Optimized Content Automation Platform',
    description: 'Built a full stack web application leveraging OpenAI API and prompt engineering to generate tailored, ATS-optimised resumes — reducing manual resume writing time by 80% for end users through intelligent content automation.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'OpenAI API', 'MongoDB', 'Prompt Engineering'],
    metrics: [
      '80% reduction in resume writing time',
      'ATS-Optimized resume layout output',
      'Dynamic AI prompt tailoring',
    ],
    githubUrl: 'https://github.com/mudasirabro',
    liveUrl: '#',
    architectureDetails: {
      frontend: 'React.js with dynamic step wizards, real-time ATS score preview, live formatting editor.',
      backend: 'Express.js proxy engine enforcing OpenAI API prompt engineering rules & rate-limiting.',
      database: 'MongoDB for user profiles, generated templates, and history logs.',
      highlights: [
        'Custom prompt pipeline that converts raw text into structured JSON ATS sections',
        'Secure token handling without exposing OpenAI API keys client-side',
        'PDF export engine formatted specifically for recruitment software compliance',
      ],
    },
    demoCodeSnippet: `// Server-side OpenAI API resume generation pipeline
app.post('/api/resume/generate', async (req, res) => {
  const { userExperience, targetRole } = req.body;
  const prompt = \`Format experience for ATS optimization for role: \${targetRole}.\`;
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: "You are an ATS resume specialist." }, { role: "user", content: prompt }]
  });
  return res.json({ atsResume: response.choices[0].message.content });
});`,
  },
  {
    id: 'ecommerce-app',
    title: 'E-Commerce Web Application',
    category: 'Full Stack',
    subtitle: 'Transactional Multi-Vendor E-Commerce Engine',
    description: 'Engineered a complete transactional e-commerce platform supporting end-to-end order lifecycle management with secure JWT authentication, dynamic product catalogue, and a fully functional checkout flow handling 100% of CRUD operations with zero data integrity issues.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'REST API'],
    metrics: [
      '100% CRUD operations zero data integrity issues',
      'Cart-to-checkout secure multi-step pipeline',
      'Role-based access control (Admin & Customer)',
    ],
    githubUrl: 'https://github.com/mudasirabro',
    liveUrl: '#',
    architectureDetails: {
      frontend: 'React SPA with reactive cart state, dynamic search/filter, multi-step checkout dialogs.',
      backend: 'Express REST API with JWT middleware, payload validation, and order state transition locks.',
      database: 'MongoDB with Mongoose schemas for Users, Products, Orders, and Cart instances.',
      highlights: [
        'JWT token-based auth with HTTP-Only cookie security and RBAC middleware',
        'Optimized pipeline reducing order completion latency',
        'Transactional inventory deduction locks preventing race conditions',
      ],
    },
    demoCodeSnippet: `// Order processing transaction controller
const processOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const order = await Order.create([req.body], { session });
    await Inventory.updateMany({ id: { $in: req.body.itemIds } }, { $inc: { stock: -1 } }, { session });
    await session.commitTransaction();
    res.status(201).json({ success: true, orderId: order[0]._id });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: 'Order transaction failed' });
  }
};`,
  },
  {
    id: 'food-delivery-app',
    title: 'Food Delivery Mobile App',
    category: 'Mobile',
    subtitle: 'Cross-Platform Real-time Restaurant & Tracking App',
    description: 'Developed a cross-platform mobile application with real-time order tracking across multiple restaurant listings, multi-role user management (customer, restaurant, admin), and a seamless cart-to-checkout experience deployed on both iOS and Android.',
    technologies: ['React Native', 'Node.js', 'Express.js', 'REST API', 'MongoDB', 'Real-time Socket/Tracking'],
    metrics: [
      'Deployed on iOS & Android cross-platform',
      '3-Role system: Customer, Restaurant, Admin',
      'Real-time order tracking pipeline',
    ],
    githubUrl: 'https://github.com/mudasirabro',
    liveUrl: '#',
    architectureDetails: {
      frontend: 'React Native mobile app with smooth animation screens, map location hooks, cart context.',
      backend: 'Node.js REST service with order status dispatcher.',
      database: 'MongoDB geo-spatial index queries for location-based restaurant recommendations.',
      highlights: [
        'Shared native component library between iOS and Android',
        'Live order status updates (Placed -> Preparing -> Out for Delivery -> Delivered)',
        'Optimized bundle size for mobile devices',
      ],
    },
    demoCodeSnippet: `// React Native Order Status Tracking Hook
export const useOrderTracker = (orderId) => {
  const [status, setStatus] = useState('Preparing');
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(\`/api/orders/\${orderId}/status\`);
      const data = await res.json();
      setStatus(data.status);
    }, 5000);
    return () => clearInterval(interval);
  }, [orderId]);
  return { status };
};`,
  },
  {
    id: 'school-management-system',
    title: 'School Management System',
    category: 'Enterprise',
    subtitle: '3-Role Enterprise Educational Web Platform',
    description: 'Built a 3-role enterprise web platform (admin, teacher, student) with role-based access control, automated attendance tracking, and structured grade reporting managing 200+ student records with zero data inconsistencies.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Relational Schema', 'JWT RBAC'],
    metrics: [
      'Managed 200+ student records with zero inconsistencies',
      'Automated attendance tracking & grade reporting',
      'Strict 3-Role Access Control (Admin, Teacher, Student)',
    ],
    githubUrl: 'https://github.com/mudasirabro',
    liveUrl: '#',
    architectureDetails: {
      frontend: 'React administrative dashboard with data grids, gradebook views, attendance matrices.',
      backend: 'Node.js Express backend using SQL relational queries with parameters to prevent SQL injection.',
      database: 'MySQL database with normalized relational tables (Students, Courses, Attendance, Grades).',
      highlights: [
        'Automated grade point average (GPA) calculator trigger functions',
        'Granular role-based authorization ensuring students only access their own transcripts',
        'Exportable attendance and transcript PDF/CSV reports',
      ],
    },
    demoCodeSnippet: `// Relational SQL Grade Aggregator Query
SELECT s.student_id, s.full_name, AVG(g.score) as current_gpa,
  COUNT(CASE WHEN a.status = 'PRESENT' THEN 1 END) * 100.0 / COUNT(a.id) as attendance_percentage
FROM students s
JOIN grades g ON s.student_id = g.student_id
JOIN attendance a ON s.student_id = a.student_id
WHERE s.class_id = ?
GROUP BY s.student_id;`,
  },
];

export const experienceData: Experience[] = [
  {
    id: 'exp-1',
    role: 'Freelance Full Stack Developer',
    company: 'Fiverr & Upwork',
    location: 'Remote',
    period: 'Jan. 2024 – Present',
    isCurrent: true,
    bullets: [
      'Designed and delivered 4+ production-ready full stack web and mobile applications for clients across e-commerce, food delivery, and enterprise management — managing end-to-end from requirements gathering to deployment with a 100% on-time delivery rate.',
      'Architected RESTful APIs using Node.js and Express.js with secure JWT-based authentication and role-based access control, eliminating unauthorized access risk across 100% of delivered systems.',
      'Optimised API response pipelines and front-end rendering logic, improving average page load speed by 30% and significantly enhancing end-user experience across client applications.',
      'Integrated cart-to-checkout pipelines and order processing flows, implementing multi-step transactional logic across client-facing web and mobile platforms.',
      'Operated in self-managed Agile sprints — scoping, iterating, and shipping production-ready software on schedule with clean, well-documented codebases across multiple concurrent projects.',
    ],
    keyMetrics: [
      '100% On-Time Delivery Rate',
      '4+ Full Stack Production Apps',
      '+30% Page Load Speed Boost',
      'Zero Unauthorized Risk (100% Secure JWT)',
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'React Native', 'JWT', 'REST API'],
  },
  {
    id: 'exp-2',
    role: 'Web Development Intern',
    company: 'EvoDynamics Vision',
    location: 'Karachi / Remote',
    period: 'Jun. 2026 – Jul. 2026',
    bullets: [
      'Contributed to building full stack web features using React.js and Node.js within a professional engineering team, participating in Agile/Scrum sprint planning, stand-ups, and peer code reviews.',
      'Developed and integrated RESTful API endpoints, collaborating with senior developers and resolving production-level bugs — improving test coverage and reducing reported issues across the codebase.',
      'Applied industry-standard SDLC practices including version control via GitHub, branch management, and structured deployment workflows in a real-world team environment.',
    ],
    keyMetrics: [
      'Agile / Scrum Team Contributor',
      'Resolved Production-Level Bugs',
      'Improved API Test Coverage',
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'GitHub', 'Agile / Scrum', 'SDLC'],
  },
];

export const certificationsData: Certification[] = [
  {
    id: 'cert-python',
    title: 'Google IT Automation with Python Professional Certificate',
    issuer: 'Google',
    year: '2026',
    skills: ['Python', 'Automation', 'Scripting', 'APIs', 'Git', 'Troubleshooting'],
    badgeType: 'python',
  },
  {
    id: 'cert-pm',
    title: 'Google Project Management Professional Certificate',
    issuer: 'Google',
    year: '2026',
    skills: ['Agile', 'Scrum', 'SDLC', 'Risk Management', 'Project Planning'],
    badgeType: 'pm',
  },
  {
    id: 'cert-ai',
    title: 'Google AI Professional Certificate',
    issuer: 'Google',
    year: '2026',
    skills: ['Generative AI', 'Prompt Engineering', 'AI Applications', 'LLMs'],
    badgeType: 'ai',
  },
];

export const educationData: Education = {
  institution: 'Sukkur Institute of Business Administration (IBA)',
  degree: 'Bachelor of Science in Software Engineering',
  location: 'Sukkur, Pakistan',
  period: 'Oct. 2022 – May 2026',
};