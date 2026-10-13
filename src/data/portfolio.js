// ============================================================
// CENTRAL DATA FILE — Edit all personal information here.
// ============================================================

export const personalInfo = {
  name: "Arnav Band",
  firstName: "Arnav",
  headline: "Computer Science Engineering Student | Developer | Technology Enthusiast",
  tagline: "Computer Science Engineering Student | Developer | Technology Enthusiast",
  bio: `I'm a third-year Computer Science and Engineering student at Symbiosis Institute of Technology (SIT), Nagpur, interested in building practical projects, learning modern technologies, and continuously developing my technical skills.

I believe in learning by building — whether that's a threat correlation framework, a portfolio website, or exploring how explainability can make AI-driven security tools more trustworthy. I'm always looking to expand my skill set and contribute to meaningful projects.`,
  shortBio: "I'm a third-year Computer Science and Engineering student at Symbiosis Institute of Technology (SIT), Nagpur.",
  email: "arnavofficial321@gmail.com",
  phone: "[ADD YOUR PHONE NUMBER]",
  location: "Nagpur, Maharashtra, India",
  degree: "B.Tech in Computer Science and Engineering",
  institution: "Symbiosis Institute of Technology (SIT), Nagpur",
  year: "3rd Year",
  resumeFile: "/Arnav_Band_Resume.pdf",
  profileImage: "/profile.jpg", // Replace with your actual photo
  github: "https://github.com/arnavband321?tab=repositories",
  linkedin: "https://www.linkedin.com/in/arnav-band-599113320/",
  // Academic details — PRN is private; showPRN: false hides it from the public portfolio
  academic: {
    degree: "B.Tech in Computer Science and Engineering",
    year: "3rd Year",
    semester: "Semester V",
    section: "D",
    institution: "Symbiosis Institute of Technology (SIT), Nagpur",
    prn: "24070521223",
    showPRN: false,
  },
  quickFacts: [
    { label: "Name", value: "Arnav Band" },
    { label: "Degree", value: "B.Tech in Computer Science and Engineering" },
    { label: "Year", value: "3rd Year" },
    { label: "Semester", value: "Semester V" },
    { label: "Section", value: "D" },
    { label: "Institution", value: "Symbiosis Institute of Technology (SIT), Nagpur" },
    { label: "Location", value: "Nagpur, Maharashtra, India" },
    { label: "Interests", value: "Web Dev · Cybersecurity · AI/ML" },
    { label: "Primary Tech", value: "Python · JavaScript · React" },
  ],
};

export const education = [
  {
    id: 1,
    degree: "Bachelor of Technology – Computer Science and Engineering",
    institution: "Symbiosis Institute of Technology (SIT), Nagpur",
    location: "Nagpur, Maharashtra, India",
    duration: "2023 – 2027",
    status: "Ongoing · 3rd Year · Semester V · Section D",
    description: "I am a third-year Computer Science and Engineering student at Symbiosis Institute of Technology (SIT), Nagpur, currently pursuing my B.Tech in Computer Science and Engineering.",
    highlights: [
      "Coursework: Data Structures, Algorithms, Computer Networks, Operating Systems, Database Systems",
      "Focus Areas: Web Development, Cybersecurity, AI/ML",
    ],
  },
  {
    id: 2,
    degree: "Higher Secondary Education (Class XII – PCM + CS)",
    institution: "[ADD YOUR SCHOOL NAME]",
    location: "[ADD YOUR CITY], India",
    duration: "2021 – 2023",
    status: "Completed",
    description: "Completed Class XII with Physics, Chemistry, Mathematics, and Computer Science.",
    highlights: [],
  },
  {
    id: 3,
    degree: "Secondary Education (Class X)",
    institution: "[ADD YOUR SCHOOL NAME]",
    location: "[ADD YOUR CITY], India",
    duration: "2019 – 2021",
    status: "Completed",
    description: "Completed secondary education with distinction.",
    highlights: [],
  },
];

export const academics = [
  { semester: "Semester 1", sgpa: null, note: "[ADD SGPA]" },
  { semester: "Semester 2", sgpa: null, note: "[ADD SGPA]" },
  { semester: "Semester 3", sgpa: null, note: "[ADD SGPA]" },
  { semester: "Semester 4", sgpa: null, note: "[ADD SGPA]" },
  { semester: "Semester 5", sgpa: null, note: "Current" },
];

export const skills = [
  {
    category: "Programming Languages",
    icon: "Code2",
    items: [
      { name: "Python", level: "Intermediate" },
      { name: "C", level: "Familiar" },
      { name: "C++", level: "Familiar" },
      { name: "Java", level: "Familiar" },
      { name: "JavaScript", level: "Intermediate" },
    ],
  },
  {
    category: "Web Development",
    icon: "Globe",
    items: [
      { name: "HTML5", level: "Working Knowledge" },
      { name: "CSS3", level: "Working Knowledge" },
      { name: "JavaScript", level: "Intermediate" },
      { name: "React", level: "Familiar" },
      { name: "Responsive Design", level: "Working Knowledge" },
    ],
  },
  {
    category: "Cybersecurity",
    icon: "Shield",
    items: [
      { name: "SIEM Concepts", level: "Familiar" },
      { name: "SOC Operations", level: "Familiar" },
      { name: "Threat Detection", level: "Familiar" },
      { name: "Incident Response", level: "Familiar" },
      { name: "Network Security", level: "Familiar" },
    ],
  },
  {
    category: "Tools & Technologies",
    icon: "Wrench",
    items: [
      { name: "Git & GitHub", level: "Working Knowledge" },
      { name: "VS Code", level: "Working Knowledge" },
      { name: "Linux", level: "Familiar" },
      { name: "Streamlit", level: "Familiar" },
      { name: "NetworkX", level: "Familiar" },
      { name: "Plotly", level: "Familiar" },
    ],
  },
];

export const experience = [
  {
    id: 1,
    company: "Maincrafts Technology",
    role: "Web Development Intern",
    duration: "24 May 2025 – 24 June 2025",
    type: "Internship",
    location: "Remote",
    description: "Completed a one-month web development internship, working on real-world frontend development tasks including building responsive portfolio websites and a blog platform.",
    responsibilities: [
      "Developed and deployed a responsive portfolio website as part of the internship tasks.",
      "Built a JavaScript-based portfolio with interactive components.",
      "Created a blog website with structured HTML/CSS layout.",
      "Applied Git and GitHub for version control and deployment via GitHub Pages.",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Git", "GitHub Pages"],
    links: [],
  },
];

export const projects = [
  {
    id: 1,
    title: "Explainable Multi-Source Threat Correlation Framework for Adaptive Cyber Incident Response",
    shortTitle: "Threat Correlation Framework",
    description: "A framework that integrates multi-source log correlation with explainable AI (XAI) techniques to support SOC analysts in understanding and responding to cyber threats.",
    problem: "Modern SOC analysts are overwhelmed by alert fatigue. Correlating alerts from multiple sources and understanding why an alert was triggered is a critical challenge.",
    technologies: ["Python", "Streamlit", "NetworkX", "Plotly", "SIEM Concepts", "XAI (SHAP/LIME concepts)", "Threat Intelligence"],
    features: [
      "Multi-source log ingestion and correlation",
      "Graph-based threat visualization using NetworkX",
      "Explainability layer for analyst-friendly alert summaries",
      "Interactive Streamlit dashboard with Plotly charts",
    ],
    github: null,
    demo: null,
    status: "Academic Project",
    category: "Cybersecurity / AI",
  },
  {
    id: 2,
    title: "Maincrafts Portfolio Website",
    shortTitle: "Maincrafts Portfolio",
    description: "A clean, responsive portfolio website developed as part of the Maincrafts Technology internship. Built with HTML, CSS, and JavaScript.",
    problem: "Showcase internship deliverable — a professional portfolio layout for a technology company.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    features: [
      "Responsive layout across devices",
      "Smooth navigation and section transitions",
      "Clean typography and professional color scheme",
    ],
    github: "https://github.com/arnavband321/maincrafts-task-2-portfolio",
    demo: "https://arnavband321.github.io/maincrafts-task-2-portfolio/",
    status: "Completed",
    category: "Web Development",
  },
  {
    id: 3,
    title: "Portfolio JavaScript Website",
    shortTitle: "JS Portfolio",
    description: "An enhanced JavaScript-based portfolio with interactive UI components and dynamic content rendering.",
    problem: "Create a more interactive portfolio experience using vanilla JavaScript for dynamic content.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    features: [
      "Dynamic content with vanilla JavaScript",
      "Interactive UI components",
      "Responsive and mobile-friendly",
    ],
    github: "https://github.com/arnavband321/maincrafts-task-3-portfolio-js",
    demo: "https://arnavband321.github.io/maincrafts-task-3-portfolio-js/",
    status: "Completed",
    category: "Web Development",
  },
  {
    id: 4,
    title: "Blog Website",
    shortTitle: "Blog Website",
    description: "A structured blog website with organized post layouts, categories, and a clean reading experience.",
    problem: "Design and build a complete blog platform with article listings and readable post layouts.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    features: [
      "Structured blog post layout",
      "Category and navigation system",
      "Clean, readable typography",
      "Responsive across screen sizes",
    ],
    github: "https://github.com/arnavband321/maincrafts-task-4-blog-website",
    demo: "https://arnavband321.github.io/maincrafts-task-4-blog-website/",
    status: "Completed",
    category: "Web Development",
  },
];

export const achievements = [
  {
    id: 1,
    title: "Web Designing Internship",
    category: "Technical", // or "Certification"
    description: "Successfully completed a Web Designing internship at Maincrafts Technology, demonstrating dedication, professionalism, and hands-on project contributions.",
    date: "June 2026", // or "24 May 2026 - 24 June 2026"
    image: "/certificates/maincrafts-internship.png",
    credentialUrl: "https://www.maincrafts.com", // Intern ID: MT4351
    placeholder: false,
  },
  {
    id: 2,
    title: "Mastering Agentic AI: From Prompt to Protocols to Production",
    category: "Certification", // or "Technical"
    description: "Completed a comprehensive 38-hour certification course by Vinit Singh covering end-to-end Agentic AI architecture, prompting strategies, protocols, and production deployment.",
    date: "Aug 3, 2026",
    image: "/certificates/mastering-agentic-ai.png",
    credentialUrl: "https://ude.my/UC-971a0293-eb07-4e56-92f0-24718f2ac417",
    placeholder: false,
  },
  {
    id: 3,
    title: "[ADD ACHIEVEMENT / CERTIFICATE TITLE]",
    category: "Project",
    description: "Describe any project-based achievement, hackathon, or event result.",
    date: "[ADD DATE / YEAR]",
    image: null,
    credentialUrl: null,
    placeholder: true,
  },
];

export const certifications = [
  {
    id: 1,
    title: "Mastering Agentic AI: From Prompt to Protocols to Production",
    issuer: "Udemy (Instructor: Vinit Singh)",
    date: "August 2026",
    credentialUrl: "https://ude.my/UC-971a0293-eb07-4e56-92f0-24718f2ac417",
    image: "/certificates/mastering-agentic-ai.png",
    placeholder: false,
  },
  {
    id: 2,
    title: "Web Designing Internship",
    issuer: "Maincrafts Technology",
    date: "June 2026",
    credentialUrl: "https://www.maincrafts.com",
    image: "/certificates/maincrafts-internship.png",
    placeholder: false,
  },
  {
    id: 3,
    title: "[ADD CERTIFICATION TITLE]",
    issuer: "[Issuing Organization]",
    date: "[Month, Year]",
    credentialUrl: null,
    image: null,
    placeholder: true,
  },
];

export const contributions = [
  {
    id: 1,
    title: "[ADD CLUB / EVENT NAME]",
    type: "Club / Organization",
    description: "Describe your role and contributions here.",
    date: "[ADD DATE / DURATION]",
    placeholder: true,
  },
  {
    id: 2,
    title: "[ADD WORKSHOP / SEMINAR]",
    type: "Workshop",
    description: "Describe the workshop, what you learned, or your role.",
    date: "[ADD DATE]",
    placeholder: true,
  },
  {
    id: 3,
    title: "[ADD EVENT / COMPETITION]",
    type: "Event / Competition",
    description: "Describe the event, your participation, or results.",
    date: "[ADD DATE]",
    placeholder: true,
  },
];

export const careerInterests = [
  {
    title: "Web Development",
    icon: "Globe",
    description: "Building modern, responsive, and performant web applications using current best practices and frameworks.",
    tags: ["React", "JavaScript", "Full Stack"],
  },
  {
    title: "Cybersecurity",
    icon: "Shield",
    description: "Security operations, threat detection, incident response, and applying XAI to make security tools more explainable.",
    tags: ["SOC", "SIEM", "Threat Intel"],
  },
  {
    title: "AI / Machine Learning",
    icon: "Brain",
    description: "Exploring the intersection of AI and cybersecurity, including explainability and intelligent automation.",
    tags: ["XAI", "SHAP", "Python"],
  },
  {
    title: "Cloud & DevOps",
    icon: "Cloud",
    description: "Learning cloud infrastructure, CI/CD pipelines, and modern deployment practices.",
    tags: ["GitHub Pages", "CI/CD", "Linux"],
  },
];

export const galleryImages = [
  {
    id: 1,
    src: "/gallery/sit-nagpur-campus.png",
    caption: "Symbiosis Institute of Technology (SIT), Nagpur Campus",
    category: "College",
  },
];

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Certifications", href: "#certifications" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];
