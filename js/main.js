/* =========================================================
   Hassan Jamal Khan — Portfolio Script
   Vanilla JS only. Renders data-driven sections, handles
   nav/menu/scroll behavior, reveal animations, and the
   project detail modal.
   ========================================================= */

(() => {
  "use strict";

  /* ---------------------------------------------------------
     Data
     --------------------------------------------------------- */

  const SKILL_ICON = {
    code: '<path d="m8 6-6 6 6 6M16 6l6 6-6 6"/>',
    brain: '<path d="M9.5 2a2.5 2.5 0 0 0-2.5 2.5v.5A2.5 2.5 0 0 0 4.5 7.5 2.5 2.5 0 0 0 4 12.4 2.5 2.5 0 0 0 6 17h1.5A2.5 2.5 0 0 0 10 14.5v-10A2.5 2.5 0 0 0 9.5 2ZM14.5 2a2.5 2.5 0 0 1 2.5 2.5v.5a2.5 2.5 0 0 1 2.5 2.5A2.5 2.5 0 0 1 20 12.4 2.5 2.5 0 0 1 18 17h-1.5A2.5 2.5 0 0 1 14 14.5v-10A2.5 2.5 0 0 1 14.5 2Z"/>',
    chart: '<path d="M3 3v18h18M8 17V10M13 17V6M18 17v-4"/>',
    sparkles: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
    layers: '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',
    cloud: '<path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4-1.5A4.5 4.5 0 0 0 6.5 19h11Z"/>',
    bot: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M12 8V4m-4 0h8M8 14v1m8-1v1"/>',
    bolt: '<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/>',
  };

  // Outline icons for project thumbnails — same stroke style as
  // SKILL_ICON, shown centered over a dark, color-tinted hero area.
  const PROJECT_ICON = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/>',
    face: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/>',
    bot: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M12 8V4m-4 0h8M8 14v1m8-1v1"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z"/><path d="M12 8v5M12 16h.01"/>',
    bank: '<path d="M3 10 12 4l9 6"/><path d="M4 10v9M9 10v9M15 10v9M20 10v9"/><path d="M2 21h20"/>',
    box: '<path d="M3 8 12 3l9 5v8l-9 5-9-5Z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  };

  const SKILLS = [
    {
      title: "Programming",
      icon: "code",
      color: "#60a5fa",
      items: ["Python", "SQL"],
    },
    {
      title: "AI & ML",
      icon: "brain",
      color: "#a78bfa",
      items: [
        "Scikit-learn", "Pandas", "NumPy", "Matplotlib",
        "Supervised & Unsupervised Algorithms", "Feature Engineering", "Data Visualization",
      ],
    },
    {
      title: "Statistics",
      icon: "chart",
      color: "#34d399",
      items: ["Probability", "Hypothesis Testing", "Regression Analysis", "Statistical Analysis"],
    },
    {
      title: "NLP & Deep Learning",
      icon: "layers",
      color: "#f472b6",
      items: ["NLTK", "ANN", "CNN", "RNN", "LSTM", "GRU", "Encoder-Decoder", "Transformers (Keras / TensorFlow)"],
    },
    {
      title: "Generative AI",
      icon: "sparkles",
      color: "#fbbf24",
      items: ["LangChain", "RAG", "Agentic AI", "Crew AI", "LangGraph", "Hugging Face", "Fine-tuning", "Quantization"],
    },
    {
      title: "Development",
      icon: "bot",
      color: "#38bdf8",
      items: [
        "Django", "Django REST Framework", "Django ORM", "JWT Authentication",
        "Celery", "Django Channels", "Middleware", "React", "Flask", "REST APIs", "Streamlit",
      ],
    },
    {
      title: "Database",
      icon: "database",
      color: "#fb923c",
      items: ["SQL", "MongoDB (PyMongo)", "Redis", "Vector Databases (FAISS, ChromaDB)"],
    },
    {
      title: "Deployment & Version Control",
      icon: "cloud",
      color: "#4ade80",
      items: ["AWS (EC2, ECR, Bedrock, SageMaker)", "Azure", "Docker", "Heroku", "Git", "GitHub"],
    },
    {
      title: "Automation & Scraping",
      icon: "bolt",
      color: "#f87171",
      items: ["n8n", "Selenium", "Playwright", "BeautifulSoup"],
    },
  ];

  const PROJECTS = [
    {
      slug: "real-estate-price-prediction",
      title: "Real Estate Price Prediction & Recommendation System",
      tag: "Regression",
      icon: "home",
      gradient: ["#3b82f6", "#1d4ed8"],
      summary: "End-to-end ML pipeline for property price prediction with a content-based recommendation engine, deployed on AWS.",
      highlights: [
        "Built an end-to-end ML pipeline for property price prediction, performing data preprocessing, EDA, and feature engineering (area extraction, categorical encoding, outlier handling, VIF, SHAP, RFE) on real-world housing datasets",
        "Trained and compared 10+ regression models (XGBoost, Random Forest, Extra Trees, etc.) across multiple encoding strategies (OrdinalEncoder, OneHotEncoder, TargetEncoder, PCA), achieving an R-squared of 0.895 with Optuna-tuned XGBoost",
        "Developed a recommendation system using TF-IDF + cosine similarity and built interactive visualizations (geo maps, scatter plots, etc.) in Streamlit",
        "Deployed application on AWS EC2 for real-time predictions and recommendations",
      ],
      tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "XGBoost", "Optuna", "SHAP", "TF-IDF", "Streamlit", "AWS EC2"],
      result: "R² = 0.895 with Optuna-tuned XGBoost",
      github: "https://github.com/Hassankhan86/real-estate-price-prediction",
      video: "assets/videos/real-estate-price-prediction.mp4",
    },
    {
      slug: "emotion-detection-cnn",
      title: "Emotion Detection using CNN (FER2013 Dataset)",
      tag: "Vision",
      icon: "face",
      gradient: ["#ec4899", "#a21caf"],
      summary: "CNN-based facial emotion recognition system with real-time webcam inference, benchmarked against transfer-learning baselines.",
      highlights: [
        "Developed a CNN-based facial emotion recognition system using the FER2013 dataset (7 emotion classes)",
        "Cleaned and preprocessed image data, removing corrupted files and converting images to 48x48 grayscale format",
        "Implemented and compared multiple models, including custom CNN, VGG16, and ResNet50 with transfer learning, data augmentation, and class weighting",
        "Achieved 67.01% validation accuracy (73.09% training accuracy) using fine-tuned ResNet50 and deployed a real-time webcam-based emotion detection system using OpenCV/Streamlit",
      ],
      tech: ["Python", "TensorFlow", "Keras", "CNN", "VGG16", "ResNet50", "OpenCV", "Streamlit"],
      result: "67.01% validation accuracy (73.09% training accuracy)",
      github: "https://github.com/Hassankhan86/emotion-detection-cnn",
      video: "assets/videos/emotion-detection-cnn.mp4",
    },
    {
      slug: "multi-agent-career-assistant",
      title: "Multi-Agent Career AI Assistant",
      tag: "GenAI",
      icon: "bot",
      gradient: ["#8b5cf6", "#5b21b6"],
      summary: "Multi-agent LLM platform orchestrating specialized agents for resume analysis, job search, and interview prep.",
      highlights: [
        "Built an end-to-end multi-agent AI career platform with specialized agents for resume analysis, job search, market research, cover letter generation, mock interview system, and career advisory using LLM orchestration",
        "Designed a LangGraph-based supervisor routing system and ReAct-style tool using AgentExecutor for intelligent query delegation, reasoning, and tool invocation",
        "Integrated web research and job search manual tools for real-time career insights, along with ATS evaluation, skill-gap analysis, cover letter generation, and a mock interview system using structured LLM outputs (Pydantic)",
      ],
      tech: ["Python", "LangChain", "LangGraph", "AgentExecutor", "ReAct Agents", "Pydantic", "LLM Orchestration"],
      result: "6 specialized agents orchestrated behind one supervisor router",
      github: "https://github.com/Hassankhan86/multi-agent-career-assistant",
      video: "assets/videos/multi-agent-career-assistant.mp4",
    },
    {
      slug: "network-security-prediction",
      title: "Network Security Prediction System",
      tag: "Classification",
      icon: "shield",
      gradient: ["#f97316", "#c2410c"],
      summary: "Production-grade MLOps pipeline for phishing detection with experiment tracking and CI/CD deployment on AWS.",
      highlights: [
        "Built an end-to-end MLOps pipeline (Data Ingestion, Validation, Transformation, Model Training) with MongoDB integration for phishing detection",
        "Implemented modular, production-grade architecture with custom logging, exception handling, and reusable pipeline components using Python and Scikit-learn",
        "Trained and compared multiple classifier models (Random Forest, Gradient Boosting, Logistic Regression, AdaBoost) with hyperparameter tuning (GridSearchCV)",
        "Tracked experiments via MLflow & DagsHub and deployed a FastAPI app using Docker + GitHub Actions CI/CD on AWS (ECR, EC2) for real-time predictions",
      ],
      tech: ["Python", "Scikit-learn", "MongoDB", "MLflow", "DagsHub", "FastAPI", "Docker", "GitHub Actions", "AWS ECR/EC2"],
      result: "Automated CI/CD pipeline deployed to production on AWS",
      github: "https://github.com/Hassankhan86/network-security-prediction",
      video: "assets/videos/network-security-prediction.mp4",
    },
    {
      slug: "bank-loan-default-prediction",
      title: "Bank Loan Default Prediction",
      tag: "Classification",
      icon: "bank",
      gradient: ["#22c55e", "#15803d"],
      summary: "Credit risk model identifying high-risk loan defaults using advanced feature engineering and imbalance handling.",
      highlights: [
        "Built an end-to-end Bank Loan Default Prediction system using Machine Learning, including data cleaning, EDA, and advanced feature engineering (WOE/IV, VIF)",
        "Trained and evaluated multiple models (Logistic Regression, Random Forest, XGBoost) with hyperparameter tuning (Optuna, RandomizedSearchCV), selecting the best model using ROC-AUC, KS Statistic, and Gini Coefficient",
        "Improved performance using SMOTETomek for class imbalance, achieving 94% recall in detecting loan defaults and minimizing high-risk misclassification",
      ],
      tech: ["Python", "Scikit-learn", "XGBoost", "Optuna", "SMOTETomek", "WOE/IV"],
      result: "94% recall in detecting loan defaults",
      github: "https://github.com/Hassankhan86/bank-loan-default-prediction",
      video: "assets/videos/bank-loan-default-prediction.mp4",
    },
    // --- Dummy placeholders below, added only to demo the "Show More"
    // toggle and the Automation filter tab — replace with real projects
    // or delete before publishing.
    {
      slug: "placeholder-project-one",
      title: "Placeholder Project One — Replace Me",
      tag: "Automation",
      icon: "box",
      gradient: ["#71717a", "#3f3f46"],
      summary: "Dummy card for testing the Show More layout — swap in a real project summary here.",
      highlights: [
        "Replace with a real highlight describing what was built",
        "Replace with a real highlight describing the approach or tooling",
        "Replace with a real highlight describing the outcome",
      ],
      tech: ["Placeholder", "Placeholder", "Placeholder"],
      result: "Placeholder result — replace with a real outcome.",
      github: "#",
      video: "assets/videos/placeholder-project-one.mp4",
    },
    {
      slug: "placeholder-project-two",
      title: "Placeholder Project Two — Replace Me",
      tag: "Placeholder",
      icon: "box",
      gradient: ["#6b7280", "#374151"],
      summary: "Dummy card for testing the Show More layout — swap in a real project summary here.",
      highlights: [
        "Replace with a real highlight describing what was built",
        "Replace with a real highlight describing the approach or tooling",
        "Replace with a real highlight describing the outcome",
      ],
      tech: ["Placeholder", "Placeholder", "Placeholder"],
      result: "Placeholder result — replace with a real outcome.",
      github: "#",
      video: "assets/videos/placeholder-project-two.mp4",
    },
    {
      slug: "placeholder-project-three",
      title: "Placeholder Project Three — Replace Me",
      tag: "Placeholder",
      icon: "box",
      gradient: ["#525252", "#262626"],
      summary: "Dummy card for testing the Show More layout — swap in a real project summary here.",
      highlights: [
        "Replace with a real highlight describing what was built",
        "Replace with a real highlight describing the approach or tooling",
        "Replace with a real highlight describing the outcome",
      ],
      tech: ["Placeholder", "Placeholder", "Placeholder"],
      result: "Placeholder result — replace with a real outcome.",
      github: "#",
      video: "assets/videos/placeholder-project-three.mp4",
    },
  ];

  // Real issuer logos (assets/logo/) so cert cards show the actual
  // platform mark. `color` drives the card's hover glow (same --card-accent
  // pattern as the project cards). Falls back to a colored initial for any
  // issuer without a logo file on hand.
  const ISSUER_STYLE = {
    Coursera: { logo: "assets/logo/coursera_logo.jpg", color: "#3b82f6" },
    "DeepLearning.AI": { logo: "assets/logo/deeplearningai_logo.jpg", color: "#fe4960" },
    Udemy: { logo: "assets/logo/udemy_logo.jpg", color: "#a855f7" },
    "YT-CampusX": { logo: "assets/logo/youtube-logo.svg", color: "#ff0000" },
    "YouTube-CampusX": { logo: "assets/logo/youtube-logo.svg", color: "#ff0000" },
  };

  // certFile is a placeholder path — drop the real certificate image/PDF
  // in assets/certificates/ using this exact filename to enable the
  // in-page viewer (same "functional placeholder" pattern as the resume
  // PDF and project demo videos). verifyUrl is the public verification
  // page on the issuing platform — replace the "#" placeholders with the
  // real links when you have them.

  // hideLink: true --> to hide View Certificate text for youtube
  const CERTIFICATIONS = [
    { slug: "what-is-data-science", title: "What is Data Science?", issuer: "Coursera", certFile: "assets/certificates/what-is-data-science.pdf", verifyUrl: "https://www.coursera.org/account/accomplishments/verify/PRKKXXNYLGMD" },
    { slug: "machine-learning-with-python", title: "Machine Learning with Python", issuer: "Coursera", certFile: "assets/certificates/machine-learning-with-python.pdf", verifyUrl: "https://www.coursera.org/account/accomplishments/verify/U0TJPVQQWA79" },
    
    { slug: "supervised-ml-regression-classification", title: "Supervised Machine Learning: Regression and Classification", issuer: "DeepLearning.AI", certFile: "assets/certificates/supervised-ml-regression-classification.pdf", verifyUrl: "https://www.coursera.org/account/accomplishments/verify/MSD85D7V5WKU" },
    { slug: "advanced-learning-algorithms", title: "Advanced Learning Algorithms", issuer: "DeepLearning.AI", certFile: "assets/certificates/advanced-learning-algorithms.pdf", verifyUrl: "https://www.coursera.org/account/accomplishments/verify/WG7FN7H0VT0D" },
    { slug: "unsupervised-learning-recommenders-reinforcement-learning", title: "Unsupervised Learning, Recommenders, Reinforcement Learning", issuer: "DeepLearning.AI", certFile: "assets/certificates/unsupervised-learning-recommenders-reinforcement-learning.pdf", verifyUrl: "https://www.coursera.org/account/accomplishments/verify/PX5BTHYPPCEW" },
    
    { slug: "data-science-ml-bootcamp", title: "Complete Data Science, Machine Learning, DL, NLP Bootcamp", issuer: "Udemy", certFile: "assets/certificates/data-science-ml-bootcamp.pdf", verifyUrl: "https://www.udemy.com/certificate/UC-73277332-f25e-4c81-a652-339d279fe8b2/" },
    { slug: "generative-ai-langchain-huggingface", title: "Complete Generative AI Course With LangChain and Huggingface", issuer: "Udemy", certFile: "assets/certificates/generative-ai-langchain-huggingface.pdf", verifyUrl: "https://www.udemy.com/certificate/UC-51245b17-0f4c-4125-8388-65d9ae24d125/" },
    
    { slug: "campusx-agentic-ai-using-langGraph", title: "Agentic AI using LangGraph", issuer: "YouTube-CampusX", certFile: "assets/certificates/", verifyUrl: "https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL" },
    
    { slug: "campusx-100-days-of-deep-learning", title: "100 Days of Deep Learning", issuer: "YouTube-CampusX", certFile: "assets/certificates/", verifyUrl: "https://www.youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn" },
    { slug: "campusx-nlp", title: "Natural Language Processing(NLP)", issuer: "YouTube-CampusX", certFile: "assets/certificates/", verifyUrl: "https://www.youtube.com/playlist?list=PLKnIA16_RmvZo7fp5kkIth6nRTeQQsjfX" },
    { slug: "campusx-data-science-mentorship", title: "Data Science Mentorship Program", issuer: "YouTube-CampusX", certFile: "assets/certificates/", verifyUrl: "https://www.youtube.com/playlist?list=PLKnIA16_RmvbAlyx4_rdtR66B7EHX5k3z" },
    
  ];

  /* ---------------------------------------------------------
     Helpers
     --------------------------------------------------------- */

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function hexToRgba(hex, alpha) {
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  /* ---------------------------------------------------------
     Render: Skills
     --------------------------------------------------------- */

  function renderSkills() {
    const grid = $("#skillsGrid");
    grid.innerHTML = SKILLS.map((group) => {
      const icon = SKILL_ICON[group.icon];
      const color = group.color;
      return `
      <div class="skill-card reveal" style="--card-accent:${color}; --card-glow:${hexToRgba(color, 0.35)}">
        <svg class="skill-card-deco" viewBox="0 0 24 24" aria-hidden="true" style="color:${color}">${icon}</svg>
        <h3 class="skill-card-title">
          <span class="skill-card-icon" style="background:${hexToRgba(color, 0.16)};color:${color}">
            <svg viewBox="0 0 24 24" aria-hidden="true">${icon}</svg>
          </span>
          ${escapeHTML(group.title)}
        </h3>
        <div class="skill-tags">
          ${group.items.map((item) => `<span class="skill-tag">${escapeHTML(item)}</span>`).join("")}
        </div>
      </div>
    `;
    }).join("");
  }

  /* ---------------------------------------------------------
     Render: Projects
     --------------------------------------------------------- */

  // Featured projects show by default; anything past this index sits
  // behind "Show More" so a growing project list doesn't dominate the
  // page — unless a specific category filter is active, in which case
  // every match for that category shows regardless of this cutoff.
  const INITIAL_VISIBLE_PROJECTS = 6;

  // Fixed tab set (not derived from PROJECTS) so the categories a
  // recruiter sees stay stable regardless of what tags individual
  // projects carry. Each project's `tag` should be one of these.
  const PROJECT_FILTERS = ["All", "GenAI", "Classification", "Regression", "Vision", "Automation"];

  let projectsExpanded = false;
  let activeProjectFilter = "All";

  function renderProjects() {
    const grid = $("#projectsGrid");
    grid.innerHTML = PROJECTS.map((p, i) => `
      <article class="project-card reveal" data-tag="${escapeHTML(p.tag)}" style="transition-delay:${Math.min(i, 4) * 60}ms; --card-accent:${p.gradient[0]}; --card-glow:${hexToRgba(p.gradient[0], 0.35)}">
        <button type="button" class="project-card-hit" data-project="${p.slug}" aria-label="View details for ${escapeHTML(p.title)}"></button>
        <div class="project-thumb" style="background:radial-gradient(circle at 50% 35%, ${hexToRgba(p.gradient[0], 0.4)}, transparent 75%), var(--bg-alt)" aria-hidden="true">
          <svg class="project-thumb-icon" style="color:${p.gradient[0]}" viewBox="0 0 24 24">${PROJECT_ICON[p.icon]}</svg>
        </div>
        <div class="project-body">
          <h3 class="project-title">${escapeHTML(p.title)}</h3>
          <p class="project-category">${escapeHTML(p.tag)}</p>
          <p class="project-summary">${escapeHTML(p.summary)}</p>
          <div class="project-tech-tags">
            ${p.tech.slice(0, 5).map((t) => `<span class="project-tech-tag">${escapeHTML(t)}</span>`).join("")}
          </div>
          <div class="project-view-details">
            <span>View Details</span>
            <svg class="project-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>
          </div>
        </div>
      </article>
    `).join("");
  }

  function renderProjectFilters() {
    const bar = $("#projectFilters");
    bar.innerHTML = PROJECT_FILTERS.map((tag) => `
      <button type="button" class="filter-chip${tag === "All" ? " is-active" : ""}" data-filter="${escapeHTML(tag)}" aria-pressed="${tag === "All"}">
        ${escapeHTML(tag)}
      </button>
    `).join("");
  }

  // Single source of truth for which project cards (and the Show More
  // button) are visible, given the current filter + expand state.
  function updateProjectVisibility() {
    const cards = $$(".project-card", $("#projectsGrid"));
    cards.forEach((card, i) => {
      const hidden = activeProjectFilter === "All"
        ? !projectsExpanded && i >= INITIAL_VISIBLE_PROJECTS
        : card.dataset.tag !== activeProjectFilter;
      card.classList.toggle("is-hidden", hidden);
    });

    const moreWrap = $("#projectsMore");
    const hiddenCount = PROJECTS.length - INITIAL_VISIBLE_PROJECTS;
    const showMoreBtn = activeProjectFilter === "All" && !projectsExpanded && hiddenCount > 0;
    moreWrap.innerHTML = showMoreBtn
      ? `<button type="button" class="btn btn-secondary" id="showMoreProjectsBtn">Show More Projects (+${hiddenCount})</button>`
      : "";
  }

  function initProjectFilters() {
    $("#projectFilters").addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-chip");
      if (!btn) return;

      $$(".filter-chip", $("#projectFilters")).forEach((chip) => {
        chip.classList.remove("is-active");
        chip.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");

      activeProjectFilter = btn.dataset.filter;
      updateProjectVisibility();
    });
  }

  function initProjectsToggle() {
    $("#projectsMore").addEventListener("click", (e) => {
      if (!e.target.closest("#showMoreProjectsBtn")) return;
      projectsExpanded = true;
      updateProjectVisibility();
    });
  }

  /* ---------------------------------------------------------
     Render: Certifications
     --------------------------------------------------------- */

  // Same "Show More" pattern as Projects — first N certs show by
  // default, the rest sit behind a button so a growing cert list
  // doesn't dominate the page.
  const INITIAL_VISIBLE_CERTS = 6;
  let certsExpanded = false;

  function renderCertifications() {
    const grid = $("#certGrid");
    grid.innerHTML = CERTIFICATIONS.map((c) => {
      const style = ISSUER_STYLE[c.issuer];
      const badge = style
        ? `<img class="cert-badge" src="${style.logo}" alt="${escapeHTML(c.issuer)} logo" loading="lazy" />`
        : `<span class="cert-badge cert-badge-fallback" aria-hidden="true">${escapeHTML(c.issuer.charAt(0))}</span>`;
      const accent = style ? style.color : "#94a3b8";
      // "YT-" prefixed issuers are free YouTube courses, not certificate
      // providers — no cert file to preview, so the button reads
      // "View Course" and just opens the course link directly.
      const isCourse = c.issuer.startsWith("YT-") || c.issuer.startsWith("YouTube-");
      const linkLabel = isCourse ? "View Course" : "View Certificate";
      return `
      <div class="cert-card reveal" style="--card-accent:${accent}; --card-glow:${hexToRgba(accent, 0.35)}">
        <div class="cert-top">
          ${badge}
          <div class="cert-body">
            <h3 class="cert-title">${escapeHTML(c.title)}</h3>
            <p class="cert-issuer">${escapeHTML(c.issuer)}</p>
          </div>
        </div>
        ${c.hideLink ? "" : `
        <div class="cert-links">
          ${isCourse
            ? `<a class="cert-link" href="${c.verifyUrl || "#"}" target="_blank" rel="noopener noreferrer">${linkLabel}</a>`
            : `<button type="button" class="cert-link" data-cert="${c.slug}">${linkLabel}</button>`}
        </div>`}
      </div>
    `;
    }).join("");
  }

  function updateCertVisibility() {
    const cards = $$(".cert-card", $("#certGrid"));
    cards.forEach((card, i) => {
      card.classList.toggle("is-hidden", !certsExpanded && i >= INITIAL_VISIBLE_CERTS);
    });

    const moreWrap = $("#certsMore");
    const hiddenCount = CERTIFICATIONS.length - INITIAL_VISIBLE_CERTS;
    const showMoreBtn = !certsExpanded && hiddenCount > 0;
    moreWrap.innerHTML = showMoreBtn
      ? `<button type="button" class="btn btn-secondary" id="showMoreCertsBtn">Show More Certifications (+${hiddenCount})</button>`
      : "";
  }

  function initCertsToggle() {
    $("#certsMore").addEventListener("click", (e) => {
      if (!e.target.closest("#showMoreCertsBtn")) return;
      certsExpanded = true;
      updateCertVisibility();
    });
  }

  /* ---------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------- */

  function initMobileNav() {
    const hamburger = $("#hamburger");
    const navLinks = $("#navLinks");

    function closeMenu() {
      navLinks.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
    }

    hamburger.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    $$("#navLinks .nav-link").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------------------------------------------------------
     Active section highlighting on scroll
     --------------------------------------------------------- */

  function initActiveSectionTracking() {
    const sections = $$("main section[id]");
    const navLinkMap = new Map(
      $$(".nav-link").map((link) => [link.dataset.section, link])
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = navLinkMap.get(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinkMap.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ---------------------------------------------------------
     Scroll-reveal animations
     --------------------------------------------------------- */

  function initScrollReveal() {
    const revealEls = $$(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ---------------------------------------------------------
     Project detail modal
     --------------------------------------------------------- */

  let lastFocusedEl = null;

  function buildModalContent(project) {
    return `
      <span class="modal-tag">${escapeHTML(project.tag)}</span>
      <h2 class="modal-title" id="modalTitle">${escapeHTML(project.title)}</h2>
      <p class="modal-summary">${escapeHTML(project.summary)}</p>

      <div class="modal-result">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20V10M18 20V4M6 20v-6"/></svg>
        <span>${escapeHTML(project.result)}</span>
      </div>

      <h3 class="modal-section-title">Tech Stack</h3>
      <div class="modal-tech">
        ${project.tech.map((t) => `<span>${escapeHTML(t)}</span>`).join("")}
      </div>

      <h3 class="modal-section-title">Highlights</h3>
      <ul class="modal-highlights">
        ${project.highlights.map((h) => `<li>${escapeHTML(h)}</li>`).join("")}
      </ul>

      <div class="modal-actions">
        <a class="btn btn-primary" href="${project.github}" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
        <button type="button" class="btn btn-secondary" id="watchDemoBtn" data-video="${project.video}" data-title="${escapeHTML(project.title)}">
          Watch Demo
        </button>
      </div>

      <div class="modal-video-wrap" id="modalVideoWrap" hidden></div>
    `;
  }

  function openProjectModal(slug) {
    const project = PROJECTS.find((p) => p.slug === slug);
    if (!project) return;

    const overlay = $("#projectModal");
    const body = $("#modalBody");

    lastFocusedEl = document.activeElement;
    body.innerHTML = buildModalContent(project);

    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add("is-open"));
    document.body.style.overflow = "hidden";

    $("#modalClose").focus();

    $("#watchDemoBtn").addEventListener("click", (e) => {
      const btn = e.currentTarget;
      showDemoVideo(btn.dataset.video, btn.dataset.title);
    });
  }

  function showDemoVideo(src, title) {
    const wrap = $("#modalVideoWrap");
    wrap.hidden = false;

    const fallback = () => {
      wrap.innerHTML = `<p class="video-fallback">Demo video coming soon. Add the file at <code>${src}</code> to enable playback.</p>`;
    };

    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    video.setAttribute("aria-label", `Demo video for ${title}`);
    // Direct src (rather than a nested <source>) so the "error" event
    // reliably fires on the video element itself for a missing/404 file.
    video.src = src;

    video.addEventListener("error", fallback);
    wrap.innerHTML = "";
    wrap.appendChild(video);

    video.play().catch(() => {
      /* Autoplay may be blocked, or the source failed — "error" handles the latter. */
    });

    wrap.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function closeProjectModal() {
    const overlay = $("#projectModal");
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";

    const video = $("#modalVideoWrap video");
    if (video) video.pause();

    setTimeout(() => {
      overlay.hidden = true;
      $("#modalBody").innerHTML = "";
    }, 250);

    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function initProjectModal() {
    const overlay = $("#projectModal");

    $("#projectsGrid").addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-project]");
      if (trigger) openProjectModal(trigger.dataset.project);
    });

    $("#modalClose").addEventListener("click", closeProjectModal);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeProjectModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) {
        closeProjectModal();
      }
      if (e.key === "Tab" && overlay.classList.contains("is-open")) {
        trapFocus(e, overlay);
      }
    });
  }

  function trapFocus(e, container) {
    const focusable = $$(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      container
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  /* ---------------------------------------------------------
     Certificate viewer modal
     --------------------------------------------------------- */

  let lastFocusedCertEl = null;

  function openCertModal(cert) {
    const overlay = $("#certModal");
    const body = $("#certModalBody");

    lastFocusedCertEl = document.activeElement;
    body.innerHTML = `
      <h2 class="modal-title" id="certModalTitle">${escapeHTML(cert.title)}</h2>
      <p class="modal-summary">${escapeHTML(cert.issuer)}</p>
      <div class="cert-modal-viewer" id="certModalViewer">
        <p class="video-fallback">Loading certificate…</p>
      </div>
      <div class="modal-actions">
        <a class="btn btn-secondary" href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer">View Online</a>
      </div>
    `;

    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add("is-open"));
    document.body.style.overflow = "hidden";

    $("#certModalClose").focus();

    const viewer = $("#certModalViewer");
    const file = cert.certFile;
    const isPdf = /\.pdf$/i.test(file);

    // PDF "open parameters" (Chrome/Edge/Firefox's built-in viewers honor
    // these) strip the toolbar/zoom/download/print chrome so only the
    // certificate itself shows, not a full editor-like PDF UI.
    const pdfSrc = `${file}#toolbar=0&navpanes=0&scrollbar=0`;

    const renderViewer = () => {
      viewer.innerHTML = isPdf
        ? `<iframe src="${pdfSrc}" title="${escapeHTML(cert.title)} certificate"></iframe>`
        : `<img src="${file}" alt="${escapeHTML(cert.title)} certificate" />`;
    };
    const renderFallback = () => {
      viewer.innerHTML = `<p class="video-fallback">Certificate coming soon. Add the file at <code>${file}</code> to enable this preview.</p>`;
    };

    // HEAD-check first rather than relying on the viewer element's own
    // "error" event — a missing PDF still loads fine inside an <iframe>
    // (the server's 404 page renders *as* the frame's content), so
    // there's no reliable error signal to hook there like there is for
    // <video>/<img>. But fetch() itself is blocked under file:// (opening
    // index.html directly rather than via a local server), so a thrown
    // fetch — as opposed to a real HTTP 404 — doesn't mean the file is
    // missing; render optimistically in that case instead of assuming so.
    fetch(file, { method: "HEAD" })
      .then((res) => (res.ok ? renderViewer() : renderFallback()))
      .catch(renderViewer);
  }

  function closeCertModal() {
    const overlay = $("#certModal");
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";

    setTimeout(() => {
      overlay.hidden = true;
      $("#certModalBody").innerHTML = "";
    }, 250);

    if (lastFocusedCertEl) lastFocusedCertEl.focus();
  }

  function initCertModal() {
    const overlay = $("#certModal");

    $("#certGrid").addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-cert]");
      if (!trigger) return;
      const cert = CERTIFICATIONS.find((c) => c.slug === trigger.dataset.cert);
      if (cert) openCertModal(cert);
    });

    $("#certModalClose").addEventListener("click", closeCertModal);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeCertModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) {
        closeCertModal();
      }
      if (e.key === "Tab" && overlay.classList.contains("is-open")) {
        trapFocus(e, overlay);
      }
    });
  }

  /* ---------------------------------------------------------
     Navbar shadow on scroll + back-to-top
     --------------------------------------------------------- */

  function initNavbarScrollState() {
    const navbar = $("#navbar");
    const onScroll = () => {
      navbar.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initBackToTop() {
    $("#backToTop").addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------------------------------------------------
     About photo
     --------------------------------------------------------- */

  function initAboutPhoto() {
    const img = $("#aboutPhotoImg");
    if (!img) return;
    // The gradient initials fallback is what's visually shown until this
    // fires — an <img> with a 404 src never reveals itself (stays at
    // opacity: 0 per CSS), so a missing assets/images/profile.jpg just
    // silently keeps the fallback instead of showing a broken-image icon.
    const reveal = () => img.classList.add("is-loaded");
    if (img.complete && img.naturalWidth > 0) {
      reveal();
    } else {
      img.addEventListener("load", reveal);
    }
  }

  /* ---------------------------------------------------------
     Typewriter ("A" -> "AI" -> "AI/" -> ... -> full phrase, then
     deletes back out and moves to the next phrase, looping forever)
     --------------------------------------------------------- */

  function startTypewriter(el, phrases, timing = {}) {
    if (!el) return;

    const {
      typeMs = 110,
      deleteMs = 55,
      holdFullMs = 1800,
      holdEmptyMs = 400,
      // Skip the type-in animation for phrases[0] only — it appears fully
      // formed immediately (e.g. a name that shouldn't flicker in on load)
      // — then falls into the normal hold -> delete -> next-phrase cycle.
      instantFirst = false,
    } = timing;

    // Respect reduced-motion users the same way the CSS animations
    // already do elsewhere on the page — just show the first phrase,
    // static, instead of cycling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = phrases[0];
      return;
    }

    let phraseIndex = 0;
    let charCount = 0;
    let deleting = false;

    function tick() {
      const phrase = phrases[phraseIndex];
      charCount += deleting ? -1 : 1;
      el.textContent = phrase.slice(0, charCount);

      if (!deleting && charCount === phrase.length) {
        setTimeout(() => {
          deleting = true;
          tick();
        }, holdFullMs);
        return;
      }

      if (deleting && charCount === 0) {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(() => {
          deleting = false;
          tick();
        }, holdEmptyMs);
        return;
      }

      setTimeout(tick, deleting ? deleteMs : typeMs);
    }

    if (instantFirst) {
      charCount = phrases[0].length;
      el.textContent = phrases[0];
      setTimeout(() => {
        deleting = true;
        tick();
      }, holdFullMs);
    } else {
      tick();
    }
  }

  function initRoleTypewriter() {
    startTypewriter($("#typewriterRole"), ["AI/ML Engineer", "AI Engineer"]);
  }

  function initNavTypewriter() {
    startTypewriter(
      $("#typewriterNav"),
      ["Hassan Jamal Khan", "AI/ML Engineer", "AI Engineer"],
      { instantFirst: true }
    );
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", () => {
    renderSkills();
    renderProjects();
    renderProjectFilters();
    renderCertifications();

    initMobileNav();
    initActiveSectionTracking();
    initScrollReveal();
    initProjectModal();
    initCertModal();
    initProjectFilters();
    initProjectsToggle();
    updateProjectVisibility();
    initCertsToggle();
    updateCertVisibility();
    initNavbarScrollState();
    initBackToTop();
    initAboutPhoto();
    initRoleTypewriter();
    initNavTypewriter();
  });
})();
