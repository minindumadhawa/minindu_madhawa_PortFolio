export const personalData = {
  name: "Minindu Madhawa",
  title: "Full-Stack Software Engineer & UI/UX Specialist",
  roles: [
    "Full-Stack Web Developer",
    "React & Node.js Engineer",
    "UI/UX Visual Designer",
    "Problem Solver & Tech Enthusiast"
  ],
  bio: "Passionate software engineer focused on crafting high-performance, visually stunning web applications and digital experiences. Experienced in modern JavaScript ecosystems, responsive design systems, and cloud integrations.",
  location: "Sri Lanka",
  email: "minidumadawa259@gmail.com",
  phone: "+94 76 454 5362",
  avatar: "/avatar.png",
  resumeUrl: "#",
  socials: {
    github: "https://github.com/minindumadhawa",
    linkedin: "https://linkedin.com/in/minindu-madhawa",
    twitter: "https://twitter.com/MininduMadhawa",
    email: "minidumadawa259@gmail.com"
  },
  stats: [
    { label: "Years of Project Experience", value: "3+" },
    { label: "Projects Completed", value: "10+" },
    { label: "Code Commits", value: "600+" }
  ]
};

export const skillsData = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React / Next.js", level: 92, icon: "Code2" },
      { name: "JavaScript (ES6+) / TypeScript", level: 90, icon: "FileCode" },
      { name: "HTML5 / Modern CSS3 / Tailwind", level: 95, icon: "Palette" },
      { name: "State Management (Redux/Zustand)", level: 85, icon: "Layers" }
    ]
  },
  {
    category: "Backend & Database",
    skills: [
      { name: "Node.js / Express.js", level: 88, icon: "Server" },
      { name: "RESTful & GraphQL APIs", level: 86, icon: "Webhook" },
      { name: "MongoDB & PostgreSQL", level: 82, icon: "Database" },
      { name: "Firebase & Supabase", level: 85, icon: "Flame" }
    ]
  },
  {
    category: "Tools & Cloud Architecture",
    skills: [
      { name: "Git / GitHub Version Control", level: 94, icon: "GitBranch" },
      { name: "Docker & Containerization", level: 78, icon: "Box" },
      { name: "Vercel / AWS / Netlify", level: 85, icon: "Cloud" },
      { name: "Figma UI/UX & Prototyping", level: 90, icon: "Figma" }
    ]
  }
];

export const projectsData = [
  {
    id: 1,
    title: "NovaMind - AI SaaS Intelligence Suite",
    category: "Full Stack",
    description: "An AI-powered dashboard offering realtime analytics, predictive reporting, and dynamic content generation with high-performance visualization widgets.",
    fullDescription: "NovaMind is a next-gen web platform built for modern product teams. It integrates LLM APIs with real-time analytics streaming, enabling seamless data visualization, dark glassmorphic widgets, and automated report generation with enterprise security standards.",
    image: "/project1.png",
    tags: ["React 19", "Node.js", "Tailwind CSS", "OpenAI API", "Recharts"],
    demoUrl: "https://example.com/novamind",
    githubUrl: "https://github.com/minindumadhawa/novamind",
    featured: true,
    highlights: [
      "Real-time WebSocket streaming analytics dashboards",
      "Custom dark UI design system with high contrast visuals",
      "OAuth 2.0 and JWT secure authentication workflow"
    ]
  },
  {
    id: 2,
    title: "Lumina - Modern E-Commerce Platform",
    category: "Full Stack",
    description: "A fast, headless e-commerce store with smooth shopping cart transitions, live stock inventory updates, and Stripe payment gateway integration.",
    fullDescription: "Lumina redefines modern online shopping with instantaneous page transitions, dynamic product filter matrix, secure single-click checkout, and customizable dark/light theme options.",
    image: "/project2.png",
    tags: ["React", "Express", "MongoDB", "Stripe API", "Framer Motion"],
    demoUrl: "https://example.com/lumina",
    githubUrl: "https://github.com/minindumadhawa/lumina-ecommerce",
    featured: true,
    highlights: [
      "Instant multi-criteria product search and filtering",
      "Stripe payment integration with webhooks handling",
      "Fully mobile responsive cart drawer and checkout flow"
    ]
  },
  {
    id: 3,
    title: "ApexPay - Crypto & Web3 Wallet Tracker",
    category: "Frontend",
    description: "Sleek mobile-first Web3 dashboard monitoring multi-chain asset balances, live market candlestick charts, and instant transaction logs.",
    fullDescription: "ApexPay simplifies crypto asset management with real-time price feeds, animated portfolio growth graphs, interactive transaction logs, and sleek glassmorphic UI cards.",
    image: "/project3.png",
    tags: ["React", "Vite", "Chart.js", "Web3.js", "CSS Modules"],
    demoUrl: "https://example.com/apexpay",
    githubUrl: "https://github.com/minindumadhawa/apexpay-web3",
    featured: true,
    highlights: [
      "Live WebSocket price ticker streaming",
      "Interactive asset allocation pie & linear growth charts",
      "PWA support for mobile device installation"
    ]
  }
];

export const experienceData = [
  {
    period: "2024 - Present",
    role: "Full-Stack Software Engineer",
    company: "Tech Innovation Lab",
    description: "Leading frontend architecture and building scalable REST/GraphQL APIs for web applications. Crafting responsive UI components with clean state management.",
    type: "Work"
  },
  {
    period: "2023 - 2024",
    role: "Associate Frontend Developer",
    company: "Digital Solutions Studio",
    description: "Developed user-centric single page applications (SPAs) with React and Tailwind CSS. Reduced page bundle sizes by 35% through code splitting and optimization.",
    type: "Work"
  },
  {
    period: "2021 - 2024",
    role: "B.Sc. (Hons) in Computer Science / Software Engineering",
    company: "University Degree",
    description: "Focused on Software Architecture, Data Structures & Algorithms, Database Management Systems, and Modern Web Engineering.",
    type: "Education"
  }
];

export const servicesData = [
  {
    icon: "Layout",
    title: "Full-Stack Web Development",
    description: "End-to-end modern web app development using React, Node.js, Express, and cloud databases with fast load speeds."
  },
  {
    icon: "Smartphone",
    title: "Responsive UI/UX Frontend",
    description: "Crafting visually striking, accessible, mobile-first web interfaces with smooth CSS animations and glassmorphism styling."
  },
  {
    icon: "Cpu",
    title: "API Design & Backend Services",
    description: "Designing secure, structured RESTful & GraphQL APIs, authentication flows, and database schemas built for scale."
  },
  {
    icon: "Zap",
    title: "Performance & SEO Optimization",
    description: "Auditing existing codebases to optimize Core Web Vitals, page speed, accessibility standards, and SEO rankings."
  }
];
