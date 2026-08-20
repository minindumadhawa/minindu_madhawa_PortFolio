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
    title: "CareerPath - Internship & Career Development Platform​",
    category: "Full Stack",
    description: "CareerPath is a modern web-based internship and career development platform designed to connect university students with companies.​",
    fullDescription: "CareerPath is a modern web-based internship and career development platform designed to connect university students with companies. ​The system simplifies internship searching, recruitment management, CV reviewing, and career guidance.​ By combining internship opportunities with leadership programs, skill tests, and AI-powered career support, CareerPath helps students become industry-ready professionals.​​",
    image: "/project1.png",
    tags: ["Mongo db​", "Express.js​", "React.js​", "Node.js​"],
    demoUrl: "https://example.com/CareerPath",
    githubUrl: "https://github.com/minindumadhawa/CareerPath",
    featured: true,
    highlights: [
      "Admin Dashboard with AI-Based CV",
      "Student Profile & Resume Management​",
      "Internship Posting & Company Dashboard​",
      "Career Advice Management"
    ]
  },
  {
    id: 2,
    title: "Smart Campus Operations Hub",
    category: "Full Stack",
    description: "The purpose of this project is to design and develop a web-based system called the Smart Campus Operations Hub, which helps manage university facilities, bookings, and maintenance activities in a centralized platform.",
    fullDescription: "Smart Campus Operations Hub is a comprehensive web-based platform designed to streamline the management of university facilities, bookings, and maintenance activities. It provides a centralized system for staff to handle room reservations, equipment requests, maintenance tracking, and facility analytics. The platform ensures efficient resource utilization, reduces administrative workload, and enhances the overall campus experience through automated workflows and real-time notifications.",
    image: "/project2.png",
    tags: ["Spring Boot, Java 17", "React", "Mysql", "Google OAuth"],
    demoUrl: "https://example.com/smart-campus-operations-hub",
    githubUrl: "https://github.com/minindumadhawa/it3030-paf-2026-smart-campus-group47",
    featured: true,
    highlights: [
      "40+ REST API endpoints",
      "20+ responsive frontend pages",
      "Clean layered architecture (Controller → Service → Repository)"
    ]
  },
  {
    id: 3,
    title: "Almira INC - Online Advertising Agency",
    category: "Frontend",
    description: "Almira INC is a modern, responsive online advertising agency website built with HTML, CSS, and Vanilla JavaScript.",
    fullDescription: "Almira INC is a modern, responsive online advertising agency website built with HTML, CSS, and Vanilla JavaScript. The site features a modern glassmorphism design with smooth micro-animations, hover effects, and seamless transitions between pages. It includes dedicated pages for the agency's services, a portfolio showcase, client testimonials, and a contact form for lead generation.",
    image: "/project3.png",
    tags: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://example.com/almira-inc",
    githubUrl: "https://github.com/minindumadhawa/almira-inc",
    featured: true,
    highlights: [
      "10+ fully responsive pages",
      "Modern Glassmorphism design",
      "Contact form for lead generation"
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
