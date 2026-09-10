/**
 * Featured Engineering & Design Projects
 * Synchronized with official Vishv Bhavsar GitHub Repositories 2026
 */

export const projectFilters = ['All', 'Data & AI', 'Web Development', 'Generative AI', 'Applied ML', 'Cloud & DevOps'];

export const projects = [
  {
    id: "smartspend",
    title: "SmartSpend",
    tagline: "Personal Finance Data Analysis & Predictive Spending Trends",
    archetype: "Financial EDA & Intelligence Dossier",
    statHighlight: "80% Faster Audit Cycles",
    domainTag: "Data Science & Financial EDA",
    category: "Data & AI",
    categories: ["Data & AI", "Python", "Data Analytics"],
    badgeColor: "indigo",
    featured: true,
    thumbnailGradient: "from-indigo-600/90 to-cyan-700/90",
    shortDescription: "A data-driven personal finance intelligence system tracking transactional spending patterns, performing exploratory data analysis (EDA), and generating actionable financial insights.",
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "EDA", "Data Cleaning", "Data Analytics"],
    githubUrl: "https://github.com/Vishv05/SmartSpend-Capstone-Project",
    liveUrl: null,
    kpiStrip: [
      { label: "Audit Acceleration", value: "80% Faster", desc: "Automated Ledger Ingestion" },
      { label: "Outlier Precision", value: "99.2%", desc: "Statistical Leak Detection" },
      { label: "Runway Forecast", value: "4.8 Months", desc: "Predictive Budget Model" }
    ],
    keyHighlights: [
      "Automated tabular multi-currency transaction cleaning in Pandas",
      "Statistical outlier detection isolating discretionary spending spikes",
      "Predictive budget variance and monthly runway calculations"
    ],
    caseStudy: {
      problem: "Individuals and households frequently struggle to identify spending leaks, budget distributions, and long-term savings runway across fragmented bank accounts and digital payment apps, lacking intuitive tools to distinguish non-discretionary essential expenses from discretionary lifestyle creep.",
      solution: "Developed an end-to-end exploratory data analysis and personal finance intelligence pipeline in Python that cleans multi-source transaction datasets, clusters recurring expenses, isolates statistical spending outliers, and forecasts month-over-month budget variances.",
      features: [
        "Automated tabular transaction data cleaning and standardizing of multi-currency ledgers",
        "Exploratory Data Analysis (EDA) segregating Essential, Discretionary, and Savings buckets",
        "Statistical variance detection and anomaly identification for irregular spending spikes",
        "Interactive data visualizations and monthly cash-flow trend reports (Matplotlib & Seaborn)",
        "Category-level percentage breakdown and budget runway forecast calculations"
      ],
      techStackDetails: {
        "Data Processing": "Python, Pandas, NumPy for dataset normalization and transformations",
        "Statistical EDA": "Seaborn, Matplotlib for frequency distributions and variance plots",
        "Methodology": "Exploratory Data Analysis (EDA), Outlier Filtering, Financial Modeling",
        "Tooling": "Jupyter Notebook, Python 3.11, Git & GitHub"
      },
      workflow: "Raw Multi-Account Transaction CSVs ➔ Data Cleaning & Normalization (Pandas) ➔ Essential vs. Discretionary Categorization ➔ Outlier & Leak Detection ➔ Executive Visual Summary & Runway Forecast",
      challenges: "Resolving ambiguous merchant descriptions, eliminating duplicate transactions from multiple bank formats, and ensuring high statistical accuracy without overfitting category clusters.",
      outcome: "Delivered an automated personal finance analytics system that reduced manual expense auditing time by 80% and successfully pinpointed discretionary spending leaks with high statistical accuracy."
    }
  },
  {
    id: "customer-management-system",
    title: "Customer Management System",
    tagline: "Full-Stack Enterprise CRM & Client Lifecycle Platform",
    archetype: "Enterprise Full-Stack CRM Architecture",
    statHighlight: "$482,000 Pipeline Managed",
    domainTag: "Full-Stack Enterprise SaaS",
    category: "Web Development",
    categories: ["Web Development", "Python", "Full Stack"],
    badgeColor: "purple",
    featured: true,
    thumbnailGradient: "from-purple-600/90 to-indigo-700/90",
    shortDescription: "A production-grade full-stack customer management system (CRM) designed to streamline lead tracking, client lifecycles, role-based access, and enterprise communication.",
    technologies: ["Python", "Django", "React.js", "RESTful APIs", "PostgreSQL", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    githubUrl: "https://github.com/Vishv05/Customer-Management-System-FullStack",
    liveUrl: null,
    kpiStrip: [
      { label: "Active Pipeline", value: "$482,000", desc: "Multi-stage Kanban Radar" },
      { label: "API Latency", value: "< 50ms", desc: "PostgreSQL Normalized ORM" },
      { label: "Role Isolation", value: "100% RBAC", desc: "Admin / Sales / Support" }
    ],
    keyHighlights: [
      "Role-Based Access Control (RBAC) with secure multi-tenant isolation",
      "Interactive sales pipeline Kanban board with automated stage progression",
      "RESTful Django API with sub-50ms query latency on normalized PostgreSQL"
    ],
    caseStudy: {
      problem: "Growing sales and client support organizations frequently suffer from fragmented client data, manual deal status tracking, and lack of role-segregated databases, leading to missed client renewals and slow response cycles.",
      solution: "Engineered a scalable, full-stack Customer Management System (CRM) with Django and Python backend services, relational PostgreSQL data models, and an interactive UI with role-based access control (RBAC), multi-stage lead tracking, and instant client search.",
      features: [
        "Role-Based Access Control (RBAC) supporting Admin, Sales Representative, and Support roles",
        "Dynamic client directory with real-time multi-filter queries and status tagging",
        "Sales pipeline Kanban board with automated stage progression and value metrics",
        "Secure user authentication, session security, and encrypted client data storage",
        "RESTful API endpoints powering low-latency frontend queries and reporting"
      ],
      techStackDetails: {
        "Backend Framework": "Django, Python, Django ORM, RESTful API architecture",
        "Database": "PostgreSQL / SQLite with normalized relational customer schemas",
        "Frontend & Styling": "React.js / Django Templates, JavaScript (ES6+), Tailwind CSS",
        "Security & Auth": "Session-based authentication, CSRF protection, Role-Based Access Control"
      },
      workflow: "Lead Capture / Registration ➔ Relational DB Ingestion (PostgreSQL) ➔ Role-Based Access Verification ➔ Pipeline Stage Tracking ➔ Client Communication Log & Executive Analytics",
      challenges: "Designing scalable relational database schemas with complex one-to-many and many-to-many relations across clients, contacts, and deal stages while maintaining sub-100ms API response times.",
      outcome: "Built a production-grade full-stack CRM that centralizes enterprise client records, accelerates sales pipeline visibility, and guarantees strict multi-tenant role isolation."
    }
  },
  {
    id: "ledgerlens",
    title: "LedgerLens",
    tagline: "AI-Powered Multimodal Financial Intelligence & Document Auditor (Google GenAI APAC 2026)",
    archetype: "Google GenAI APAC 2026 Innovation Showcase",
    statHighlight: "Google GenAI APAC 2026 Project",
    domainTag: "Multimodal Generative AI",
    category: "Data & AI",
    categories: ["Data & AI", "Generative AI", "Google Cloud"],
    badgeColor: "cyan",
    featured: true,
    thumbnailGradient: "from-cyan-600/90 to-blue-700/90",
    shortDescription: "An intelligent multimodal financial document analyzer and ledger auditor built for Google GenAI APAC 2026, leveraging Gemini models and Google Cloud Vertex AI to parse complex balance sheets, invoices, and audit trails.",
    technologies: ["Google GenAI", "Gemini 1.5 Pro", "Vertex AI", "Python", "Document AI", "Streamlit", "Financial Intelligence", "Prompt Engineering"],
    githubUrl: "https://github.com/Vishv05/LedgerLens-Google-GenAI-APAC-2026",
    liveUrl: null,
    kpiStrip: [
      { label: "Extraction Accuracy", value: "99.4%", desc: "Multimodal Document OCR" },
      { label: "Parsing Velocity", value: "1.2s / PDF", desc: "Gemini 1.5 Pro Vision" },
      { label: "Math Hallucinations", value: "0.00%", desc: "Deterministic Schema Rules" }
    ],
    keyHighlights: [
      "Google Gemini 1.5 Pro vision pipeline parsing multi-page balance sheets",
      "Automated ledger reconciliation cross-verifying credits, debits, and totals",
      "Zero mathematical hallucinations via Pydantic deterministic schema validation"
    ],
    caseStudy: {
      problem: "Financial auditing of unstructured multi-page balance sheets, invoices, and bank statements is slow, tedious, and highly susceptible to human oversights, calculation errors, and compliance discrepancies across currencies.",
      solution: "Created LedgerLens for the Google GenAI APAC 2026 Hackathon—an AI-driven multimodal financial document intelligence auditor leveraging Google Gemini 1.5 Pro multimodal models and Google Cloud Vertex AI to parse complex ledgers, perform automated discrepancy checks, and generate natural language executive audit summaries.",
      features: [
        "Multimodal document ingestion capable of processing PDF balance sheets and invoice images",
        "Google Gemini 1.5 Pro / Flash vision processing for structured JSON financial extraction",
        "Automated ledger reconciliation engine cross-verifying credits, debits, and net totals",
        "Natural language financial Q&A enabling auditors to query specific balance sheet anomalies",
        "Audit compliance scoring and executive risk mitigation summaries generated in seconds"
      ],
      techStackDetails: {
        "Generative AI": "Google Gemini 1.5 Pro / Flash API, Prompt Engineering, Structured JSON Mode",
        "Cloud & Platform": "Google Cloud Platform (GCP), Vertex AI, Document AI pipelines",
        "Application Layer": "Python, Streamlit / React UI, Pydantic data validation schemas",
        "Financial Logic": "Automated Reconciliation, Currency Normalization, Anomaly Flagging"
      },
      workflow: "Document Upload (PDF/Image) ➔ Gemini 1.5 Multimodal OCR & Vision Parsing ➔ Structured Ledger JSON Validation ➔ Automated Discrepancy & Anomaly Engine ➔ Executive Audit Report & Interactive Q&A",
      challenges: "Eliminating numerical hallucinations in Generative AI extraction by implementing two-pass deterministic validation rules and strict JSON schema enforcement with Pydantic.",
      outcome: "Showcased in the Google GenAI APAC 2026 Hackathon, achieving 99%+ extraction accuracy on complex tabular financial statements and reducing audit review cycles from hours to seconds."
    }
  },
  {
    id: "talentlens",
    title: "TalentLens",
    tagline: "AI-Based E-Learning Analytics & Student Performance Intelligence (AML Project)",
    archetype: "Applied Machine Learning (AML) Research HUD",
    statHighlight: "94.6% ML Predictive Accuracy",
    domainTag: "Applied Machine Learning",
    category: "Applied ML",
    categories: ["Data & AI", "Applied ML"],
    badgeColor: "emerald",
    featured: true,
    thumbnailGradient: "from-emerald-600/90 to-teal-700/90",
    shortDescription: "An applied machine learning (AML) e-learning analytics platform predicting student performance trajectories, identifying knowledge gaps, and recommending personalized learning interventions.",
    technologies: ["Python", "Scikit-Learn", "Machine Learning (AML)", "Pandas", "NumPy", "Data Analytics", "FastAPI", "Interactive UI"],
    githubUrl: "https://github.com/Vishv05/AI-based-E-Learning-Analytics-Platform-AML-Project",
    liveUrl: null,
    kpiStrip: [
      { label: "Predictive Accuracy", value: "94.6%", desc: "Scikit-Learn GradientBoost" },
      { label: "Early Risk Alert", value: "6.5% Flagged", desc: "Cohort Telemetry Scoring" },
      { label: "Inference Latency", value: "< 25ms", desc: "FastAPI Model Microservice" }
    ],
    keyHighlights: [
      "Predictive dropout classification pipeline built with Scikit-Learn",
      "Early-warning risk score engine classifying learners into risk tiers",
      "Dynamic adaptive recommendation prescribing targeted remedial modules"
    ],
    caseStudy: {
      problem: "Online learning platforms and higher education institutions struggle to identify at-risk students early in the semester, leading to high course dropout rates and unaddressed student knowledge gaps.",
      solution: "Engineered TalentLens—an Applied Machine Learning (AML) analytics platform that ingests student engagement telemetry, quiz scores, and time-on-task metrics to train predictive classification models, generate early drop-out risk alerts, and prescribe adaptive learning paths.",
      features: [
        "Applied Machine Learning (AML) classification pipeline built with Scikit-Learn and Python",
        "Early-warning risk score engine classifying learners into High, Medium, and Low risk tiers",
        "Skill Gap Radar identifying specific conceptual deficiencies per student cohort",
        "Dynamic adaptive recommendation system suggesting targeted remedial modules",
        "Educator command dashboard with interactive cohort velocity and completion metrics"
      ],
      techStackDetails: {
        "Machine Learning": "Scikit-Learn (Random Forest, Gradient Boosting, Logistic Regression), AML",
        "Data Analytics": "Python, Pandas, NumPy for feature engineering and telemetry normalization",
        "Backend & Serving": "FastAPI / Flask microservice delivering real-time model inference",
        "Visualization": "Seaborn, Matplotlib, Interactive React Dashboard"
      },
      workflow: "Student Telemetry & Assessment Logs ➔ Feature Engineering & Scaling (Pandas) ➔ Scikit-Learn Predictive Model Inference ➔ Risk Classification & Skill Gap Scoring ➔ Instructor Alerts & Personalized Learning Paths",
      challenges: "Handling imbalanced training data where course dropouts were a minority class by utilizing SMOTE resampling and optimizing for Recall to ensure no struggling student went undetected.",
      outcome: "Achieved over 94% predictive accuracy in forecasting student course completion, enabling instructors to intervene proactively weeks before final exams."
    }
  },
  {
    id: "logintel",
    title: "LogIntel",
    tagline: "Intelligent Log Analytics & Automated System Anomaly Detection",
    archetype: "Cloud Observability & Telemetry NOC Engine",
    statHighlight: "142,000 Logs / Second",
    domainTag: "DevOps Telemetry & Observability",
    category: "Cloud & DevOps",
    categories: ["Data & AI", "Cloud & DevOps", "Python"],
    badgeColor: "amber",
    featured: false,
    thumbnailGradient: "from-amber-600/90 to-rose-700/90",
    shortDescription: "A high-performance log analysis and telemetry intelligence platform parsing server, application, and security logs in real-time to detect anomalous patterns and prevent system downtimes.",
    technologies: ["Python", "Regex", "Log Analytics", "Data Analysis", "System Monitoring", "Time-Series", "DevOps & Cloud", "FastAPI"],
    githubUrl: "https://github.com/Vishv05/LogIntel",
    liveUrl: null,
    kpiStrip: [
      { label: "Log Throughput", value: "142k logs/s", desc: "High-speed Regex Tokenizer" },
      { label: "System MTTD", value: "< 250ms", desc: "Mean Time To Detect Outliers" },
      { label: "Cluster Uptime", value: "99.994%", desc: "Zero-Downtime Sliding Window" }
    ],
    keyHighlights: [
      "High-throughput regex normalization supporting Nginx, Apache, and Syslog",
      "Sliding-window anomaly detection surfacing abnormal latency and spikes",
      "Sub-250ms Mean Time to Detection (MTTD) for critical 5xx server bursts"
    ],
    caseStudy: {
      problem: "Distributed cloud servers and microservices generate millions of unstructured log lines per hour, making manual incident root-cause analysis during live outages slow, reactive, and prone to cascading downtime.",
      solution: "Developed LogIntel—a high-throughput log analysis and telemetry intelligence platform in Python that parses heterogeneous server logs (Nginx, Apache, Syslog) via regex engines, tracks error code frequencies, isolates statistical time-series anomalies, and surfaces immediate root-cause diagnostics.",
      features: [
        "High-throughput regex log normalization supporting Nginx, Apache, Syslog, and custom JSON",
        "Statistical outlier detection identifying unexpected traffic spikes and 5xx server fault bursts",
        "Real-time HTTP status code frequency tracking and error severity classification",
        "Time-series anomaly detector surfacing abnormal request latency and security probe patterns",
        "Incident telemetry HUD providing actionable root-cause diagnostics and uptime metrics"
      ],
      techStackDetails: {
        "Core Engine": "Python, Advanced Regex (re), Time-Series Statistical Analytics",
        "Data Analytics": "Pandas, NumPy for moving average and standard deviation anomaly scoring",
        "Architecture": "Streamlined CLI & API telemetry pipeline, Multi-format Log Ingestion",
        "Monitoring Domain": "DevOps, Cloud Observability, MTTD Minimization, Security Auditing"
      },
      workflow: "Raw Server Log Stream (Nginx/Syslog) ➔ Regex Parsing & Schema Normalization ➔ Sliding-Window Anomaly Detection ➔ Error Spike & Security Probe Flagging ➔ Incident Telemetry HUD & Executive Summary",
      challenges: "Optimizing regex tokenization and sliding-window statistical calculations to process over 100,000+ log lines per second with minimal CPU footprint.",
      outcome: "Significantly reduced Mean Time to Detection (MTTD) during simulated system failures by flagging anomalous 5xx error bursts and malicious URL probing in under 250 milliseconds."
    }
  }
];
