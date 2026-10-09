/*
 * PORTFOLIO CONTENT — the single place to edit facts, links and projects.
 * Everything here comes from Refeena's verified CV (October 2026).
 * Rule: only add what is true and can be discussed in an interview.
 */
window.PORTFOLIO = {
  person: {
    name: "Refeena Refath",
    shortName: "Refeena",
    role: "Early-career AI/ML Engineer",
    roleLabel: "AI/ML ENGINEER · RAG · AI INTEGRATION · AUTOMATION",
    headline: "Building AI that answers from real knowledge.",
    intro:
      "I build AI assistants and integrations that ground every answer in trusted documents, and connect them to the systems people already use.",
    location: "Chennai, India",
    openTo: "India, UK, UAE, Australia and other international markets",
    email: "refinah20@gmail.com",
    cv: "assets/Refeena_Refath_CV.pdf",
    portrait: "assets/refeena-portrait.jpg",
  },

  links: {
    linkedin: "https://www.linkedin.com/in/refeena-refath-4668a8336",
    github: "https://github.com/refinah20",
    githubSecondary: "https://github.com/Refinah",
  },

  // GitHub accounts whose public repositories are listed live (newest activity first).
  githubUsers: ["refinah20", "Refinah"],

  // Contact form: paste a form endpoint (e.g. https://formspree.io/f/xxxxxx) to receive
  // messages directly. Left empty, the form opens the visitor's email app with the message filled in.
  formEndpoint: "",

  about: {
    summary:
      "Information Technology graduate (B.Tech, CGPA 8.0) working as a freelance AI/ML engineer at Cloudroits, where I develop Campus Assist, a retrieval-augmented AI assistant for universities. I'm completing the Applied AI and Machine Learning Essentials programme from Vishlesan i-Hub, IIT Patna, in collaboration with Masai School.",
    cards: [
      {
        id: "education",
        title: "Education Profile",
        body: [
          "B.Tech, Information Technology, Saveetha School of Engineering (SIMATS), Chennai. Completed December 2025, CGPA 8.0 / 10.",
          "Java Full Stack Development training course, Besant Technologies, Feb – Sep 2024.",
        ],
      },
      {
        id: "journey",
        title: "AI Learning Journey",
        body: [
          "Machine learning projects in Python: compared four classifiers for network intrusion detection.",
          "Applied AI and Machine Learning Essentials, Vishlesan i-Hub, IIT Patna with Masai School (online certificate programme, started May 2026, expected completion 25 October 2026).",
          "Professional work since July 2026: retrieval-augmented generation with ChromaDB and the Gemini API at Cloudroits.",
        ],
      },
      {
        id: "objective",
        title: "Career Objective",
        body: [
          "An early-career role in AI integration, AI implementation or AI application development, where I can connect AI models to real processes and keep learning from experienced teams.",
          "Open to opportunities in India and internationally.",
        ],
      },
      {
        id: "interests",
        title: "Areas of Interest",
        body: [
          "Document-grounded assistants and knowledge bases that cite their sources.",
          "Privacy-aware AI: role-based access and keeping each organisation's data separate.",
          "Workflow automation that connects AI to business systems such as ERPs and CRMs.",
        ],
      },
    ],
  },

  // level: "Professional use" | "Project experience" | "Foundational" | "Learning"
  skills: [
    {
      name: "Generative AI & RAG",
      level: "Professional use",
      what: "Retrieval-augmented generation: chunking documents, vector search and grounded answers with source links.",
      tools: ["Gemini API", "ChromaDB", "Prompt engineering"],
      where: "Campus Assist at Cloudroits",
    },
    {
      name: "Backend & API Integration",
      level: "Professional use",
      what: "REST endpoints for upload, authentication and chat; connecting an AI backend to an ERP.",
      tools: ["FastAPI", "REST APIs", "JWT", "Odoo", "OdooBot"],
      where: "Campus Assist at Cloudroits",
    },
    {
      name: "Privacy & Access Control",
      level: "Professional use",
      what: "Role-based access, institution-level data isolation and automated tests for privacy rules.",
      tools: ["RBAC", "Multi-tenant isolation", "Automated testing"],
      where: "Campus Assist at Cloudroits",
    },
    {
      name: "Python & Data Analysis",
      level: "Project experience",
      what: "Collecting data from APIs, cleaning and analysing it, and turning it into charts.",
      tools: ["Python", "pandas", "NumPy", "matplotlib", "requests"],
      where: "TrendPulse",
    },
    {
      name: "Machine Learning",
      level: "Project experience",
      what: "Training and comparing classification models, evaluated with precision, recall and F1.",
      tools: ["scikit-learn", "XGBoost", "Random Forest", "SVM", "Logistic Regression"],
      where: "Intrusion Detection System",
    },
    {
      name: "Programming Foundations",
      level: "Foundational",
      what: "Object-oriented programming and web fundamentals from my degree and full-stack training.",
      tools: ["Java", "JavaScript", "SQL", "C++", "HTML", "CSS", "React"],
      where: "B.Tech and Besant Technologies training",
    },
    {
      name: "Low-code Workflow Automation",
      level: "Learning",
      what: "Next step: connecting AI to business workflows with visual automation tools.",
      tools: ["n8n", "Power Automate"],
      where: "Planned portfolio project",
    },
  ],

  experience: [
    {
      org: "Cloudroits",
      role: "AI/ML Engineer (freelance contract)",
      dates: "Jul 2026 – Present",
      product: "Campus Assist: AI-powered university knowledge assistant",
      points: [
        "Developed a document-grounded AI assistant that answers university questions from uploaded reference documents, using FastAPI, ChromaDB and the Gemini API.",
        "Implemented document ingestion and retrieval: text chunking, vector search and answers linked to their source documents.",
        "Built and integrated REST API endpoints for document upload, JWT authentication, institutional chat and student chat.",
        "Implemented role-based access control and institution-level data isolation so each university tenant sees only its own information.",
        "Added document lifecycle controls (validity dates, version supersession) to reduce the risk of answers coming from outdated policies.",
        "Integrated the AI backend with an Odoo university management system and OdooBot.",
        "Wrote automated tests for API behaviour, retrieval, authentication and privacy restrictions.",
      ],
      skills: ["Python", "FastAPI", "RAG", "ChromaDB", "Gemini API", "Odoo", "SQL", "JWT"],
    },
  ],

  education: [
    {
      title: "Applied Artificial Intelligence and Machine Learning Essentials",
      org: "Vishlesan i-Hub, IIT Patna, in collaboration with Masai School",
      dates: "May 2026 – Oct 2026",
      status: "In progress",
      note: "Online certificate programme. Expected completion 25 October 2026. This is a training programme, not an IIT degree.",
    },
    {
      title: "B.Tech, Information Technology",
      org: "Saveetha School of Engineering, SIMATS, Chennai",
      dates: "Completed Dec 2025",
      status: "Completed",
      note: "CGPA 8.0 / 10",
    },
    {
      title: "Java Full Stack Development (training course)",
      org: "Besant Technologies",
      dates: "Feb 2024 – Sep 2024",
      status: "Completed",
      note: "",
    },
  ],

  certifications: [
    { title: "C++ Programming", issuer: "CodSoft" },
    { title: "WordPress", issuer: "Coursera" },
    { title: "Google BigQuery", issuer: "Coursera" },
  ],

  // status: "Professional" | "Completed" | "In progress" | "Planned"
  projects: [
    {
      id: "campus-assist",
      name: "Campus Assist",
      tagline: "Document-grounded AI assistant for universities",
      status: "Professional",
      context: "Built at Cloudroits (freelance)",
      problem: "University information is spread across policies, brochures and catalogues that students and staff struggle to search.",
      contribution: "Developed the retrieval pipeline, REST APIs, access control, document lifecycle rules, the Odoo integration and automated tests.",
      tech: ["Python", "FastAPI", "ChromaDB", "Gemini API", "Odoo", "SQL", "JWT"],
      features: [
        "Answers grounded in approved documents, linked to their sources",
        "Separate experiences for students, staff and administrators",
        "Each institution's data kept separate",
        "Validity dates and versioning so outdated policies aren't used",
      ],
      source: null,
      sourceNote: "Source code is private to Cloudroits. A walkthrough is available on request.",
      demo: null,
      visual: "rag",
    },
    {
      id: "trendpulse",
      name: "TrendPulse",
      tagline: "Trending-news data pipeline",
      status: "Completed",
      context: "Python data project, 2026",
      problem: "Raw trending-story data is hard to compare across topics without collecting, cleaning and summarising it.",
      contribution: "Built all four stages: collection from the Hacker News API, cleaning, analysis and charts.",
      tech: ["Python", "requests", "pandas", "NumPy", "matplotlib"],
      features: [
        "Pulls top stories from the Hacker News public API",
        "Sorts stories into topics with keyword rules",
        "Cleans and analyses engagement (score, comments)",
        "Generates charts such as the top 10 stories by score",
      ],
      source: "https://github.com/refinah20/trendpulse-refeena-refath-z",
      demo: null,
      visual: "pipeline",
    },
    {
      id: "ids",
      name: "Intrusion Detection System",
      tagline: "Machine-learning model comparison",
      status: "Completed",
      context: "Academic project, 2024",
      problem: "Spotting anomalous network connections early helps flag possible attacks.",
      contribution: "Prepared about 25,000 labelled records and trained and compared four classifiers.",
      tech: ["Python", "pandas", "scikit-learn", "XGBoost"],
      features: [
        "Random Forest, SVM, Logistic Regression and XGBoost compared",
        "Labels connections as normal or anomalous",
        "Evaluated with classification reports (precision, recall, F1)",
      ],
      source: "https://github.com/Refinah/intrusiondetection",
      demo: null,
      visual: "ml",
    },
    {
      id: "gst",
      name: "Grocery GST Billing",
      tagline: "Billing application for a small store",
      status: "Completed",
      context: "Academic project",
      problem: "Manual tax calculation and invoicing slow down small-store checkout.",
      contribution: "Developed the billing application.",
      tech: [],
      features: ["Calculates GST on purchases", "Generates customer invoices"],
      source: "https://github.com/Refinah/grocerygst",
      demo: null,
      visual: "invoice",
    },
    {
      id: "automation",
      name: "AI Workflow Automation",
      tagline: "AI email triage with human approval",
      status: "Planned",
      context: "Next portfolio project",
      problem: "Teams spend time sorting and answering routine emails.",
      contribution: "Planned: an n8n workflow where AI classifies emails and drafts replies, and a person approves them before sending.",
      tech: ["n8n", "LLM API"],
      features: ["Planned. Not built yet."],
      source: null,
      sourceNote: "Not started yet. It will appear here when it's built.",
      demo: null,
      visual: "flow",
    },
  ],

  // Repositories to leave out of the live GitHub list (old copies, duplicates).
  hiddenRepos: ["resume", "myportfolio", "portfolio", "github-portfolio", "imRefinah.github.io"],

  // Curated repositories shown even when the GitHub API is unavailable.
  // Their descriptions are also used for live repositories that have no GitHub description.
  featuredRepos: [
    { name: "trendpulse-refeena-refath-z", url: "https://github.com/refinah20/trendpulse-refeena-refath-z", desc: "Hacker News data pipeline: collect, clean, analyse, visualise.", lang: "Python" },
    { name: "intrusiondetection", url: "https://github.com/Refinah/intrusiondetection", desc: "Comparing four ML classifiers for network intrusion detection.", lang: "Jupyter / Python" },
    { name: "grocerygst", url: "https://github.com/Refinah/grocerygst", desc: "GST billing and invoicing application.", lang: "" },
    { name: "foodtruckfinder-web-", url: "https://github.com/Refinah/foodtruckfinder-web-", desc: "Web app to locate nearby food trucks.", lang: "" },
    { name: "foodtruckfinder-android-", url: "https://github.com/Refinah/foodtruckfinder-android-", desc: "Android app to locate nearby food trucks.", lang: "" },
    { name: "androidbooklisting", url: "https://github.com/Refinah/androidbooklisting", desc: "Android app for displaying and managing book listings.", lang: "" },
    { name: "myportfoliowebsite", url: "https://github.com/Refinah/myportfoliowebsite", desc: "Earlier personal portfolio website (2024).", lang: "HTML" },
    { name: "Codsoft", url: "https://github.com/Refinah/Codsoft", desc: "C++ programming exercises from CodSoft.", lang: "" },
  ],
};
