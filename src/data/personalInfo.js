/**
 * Centralized Personal Information & Configuration
 * Updated directly from official Vishv Bhavsar Resume 2026
 */

export const personalInfo = {
  name: "Vishv Bhavsar",
  roleTitle: "MSc IT Student & Technology Professional",
  tagline: "Data Analytics • Software Development • UI/UX Design",
  heroSubtitle: "Analytical and detail-oriented technologist bridging data analytics, full-stack software development, Generative AI, and user-centered UI/UX design.",
  
  // Profile Photo Configuration (Transparent Background Cutout)
  avatar: {
    imageUrl: "./vishv-cutout.png",
    fallbackInitials: "VB",
    alt: "Vishv Bhavsar - Technology & Data Specialist",
    subtitle: "GLS University • M.Sc. IT (2025 - 2027)"
  },

  bio: {
    summary: "Analytical and detail-oriented MSc IT student at GLS University with a strong foundation in data analysis, statistics, and data-driven decision-making. Proficient in Python, SQL, and data visualization, with hands-on experience in data cleaning, exploratory data analysis, and translating complex datasets into actionable business insights.",
    approach: "Certified in Data Analytics and AI foundations, with exposure to cloud-based data tools (BigQuery, GCP, Power BI, Looker) and business case simulations. My approach combines robust engineering with user-centered UI/UX practices to build scalable, high-impact digital solutions.",
    currentFocus: "Pursuing M.Sc. in Information Technology at GLS University (2025 – 2027), while actively designing and engineering web platforms at HRDM Global Solutions and building predictive data systems."
  },

  location: "Maninagar, Ahmedabad, Gujarat, India",
  phone: "+91 9924014723",
  availability: "Open to Data Analyst, AI & Software Engineering Roles",

  educationSummary: {
    currentDegree: "Master of Science in Information Technology (MSc.IT)",
    institution: "GLS University",
    expectedYear: "2027",
    period: "Jun 2025 – Apr 2027",
    undergraduateDegree: "Bachelor of Science in Information Technology (BSc.IT)",
    undergraduateInstitution: "GLS University",
    undergraduatePeriod: "Jun 2022 – Apr 2025"
  },

  contact: {
    email: "coding.on.replit@gmail.com",
    emailDisplay: "coding.on.replit@gmail.com",
    phone: "+91 9924014723",
    phoneDisplay: "+91 9924014723",
    linkedIn: "https://linkedin.com/in/vishv-bhavsar-b1507b290",
    linkedInDisplay: "linkedin.com/in/vishv-bhavsar-b1507b290",
    github: "https://github.com/Vishv05",
    githubDisplay: "github.com/Vishv05",
    portfolioUrl: "https://vishv05.github.io",
    location: "Maninagar, Ahmedabad, Gujarat, India",
  },

  resume: {
    fileName: "Vishv Bhavsar Resume 2026.pdf",
    filePath: "./Vishv Bhavsar Resume 2026.pdf",
    lastUpdated: "2026",
    isPlaceholder: false,
  },

  // Contact Form Integration Settings (configured with official Formspree endpoint)
  formspreeEndpoint: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FORMSPREE_ENDPOINT) || "https://formspree.io/f/xnpqwpgz",
  // Google Apps Script Auto-Responder Endpoint (sends confirmation email from your Gmail)
  googleScriptEndpoint: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_SCRIPT_ENDPOINT) || "https://script.google.com/macros/s/AKfycbwtlg702s-n95c5ooWYVteW0brrv0wFguBt9xC9oort2_Bx10zmCK1Ht0a6ambJa-U/exec",
  emailJsConfig: {
    serviceId: "",
    templateId: "",
    publicKey: ""
  }
};
