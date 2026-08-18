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
  };

  const SKILLS = [
    {
      title: "Programming",
      icon: "code",
      items: ["Python", "SQL"],
    },
    {
      title: "ML & AI",
      icon: "chart",
      items: [
        "Scikit-learn", "Pandas", "NumPy", "Matplotlib",
        "Supervised & Unsupervised Algorithms", "Feature Engineering", "Data Visualization",
      ],
    },
    {
      title: "Statistics",
      icon: "layers",
      items: ["Probability", "Hypothesis Testing", "Regression Analysis", "Statistical Analysis"],
    },
    {
      title: "NLP & Deep Learning",
      icon: "brain",
      items: ["NLTK", "ANN", "CNN", "RNN", "LSTM", "GRU", "Encoder-Decoder", "Transformers (Keras / TensorFlow)"],
    },
    {
      title: "Generative AI",
      icon: "sparkles",
      items: ["LangChain", "RAG", "Agentic AI", "Crew AI", "LangGraph", "Hugging Face", "Fine-tuning", "Quantization"],
    },
    {
      title: "Development",
      icon: "bot",
      items: [
        "Django", "Django REST Framework", "Django ORM", "JWT Authentication",
        "Celery", "Django Channels", "Middleware", "React", "Flask", "REST APIs", "Streamlit",
      ],
    },
    {
      title: "Database",
      icon: "database",
      items: ["SQL", "MongoDB (PyMongo)", "Redis", "Vector Databases (FAISS, ChromaDB)"],
    },
    {
      title: "Deployment & Version Control",
      icon: "cloud",
      items: ["AWS (EC2, ECR, Bedrock, SageMaker)", "Azure", "Docker", "Heroku", "Git", "GitHub"],
    },
    {
      title: "Automation & Scraping",
      icon: "code",
      items: ["n8n", "Selenium", "Playwright", "BeautifulSoup"],
    },
  ];

  const PROJECTS = [
    {
      slug: "real-estate-price-prediction",
      title: "Real Estate Price Prediction & Recommendation System",
      tag: "Regression",
      icon: "🏠",
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
      tag: "Image Classification",
      icon: "🙂",
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
      tag: "Agentic AI",
      icon: "🤖",
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
      icon: "🛡️",
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
      icon: "🏦",
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
  ];

  const CERTIFICATIONS = [
    { title: "Machine Learning with Python", issuer: "Coursera" },
    { title: "Supervised Machine Learning: Regression and Classification", issuer: "DeepLearning.AI" },
    { title: "Advanced Learning Algorithms", issuer: "DeepLearning.AI" },
    { title: "Complete Data Science, Machine Learning, DL, NLP Bootcamp", issuer: "Udemy" },
    { title: "Complete Generative AI Course With LangChain and Huggingface", issuer: "Udemy" },
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

  /* ---------------------------------------------------------
     Render: Skills
     --------------------------------------------------------- */

  function renderSkills() {
    const grid = $("#skillsGrid");
    grid.innerHTML = SKILLS.map((group) => `
      <div class="skill-card reveal">
        <h3 class="skill-card-title">
          <span class="skill-card-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">${SKILL_ICON[group.icon]}</svg>
          </span>
          ${escapeHTML(group.title)}
        </h3>
        <div class="skill-tags">
          ${group.items.map((item) => `<span class="skill-tag">${escapeHTML(item)}</span>`).join("")}
        </div>
      </div>
    `).join("");
  }

  /* ---------------------------------------------------------
     Render: Projects
     --------------------------------------------------------- */

  function renderProjects() {
    const grid = $("#projectsGrid");
    grid.innerHTML = PROJECTS.map((p, i) => `
      <article class="project-card reveal" style="transition-delay:${Math.min(i, 4) * 60}ms">
        <div class="project-thumb" style="background:${thumbGradient(i)}" aria-hidden="true">${p.icon}</div>
        <div class="project-body">
          <span class="project-tag">${escapeHTML(p.tag)}</span>
          <h3 class="project-title">${escapeHTML(p.title)}</h3>
          <p class="project-summary">${escapeHTML(p.summary)}</p>
          <ul class="project-highlights">
            ${p.highlights.slice(0, 3).map((h) => `<li>${escapeHTML(h)}</li>`).join("")}
          </ul>
          <div class="project-actions">
            <button type="button" class="btn project-btn-details" data-project="${p.slug}">
              View Details
            </button>
            <a class="btn project-btn-github" href="${p.github}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHTML(p.title)} on GitHub (opens in new tab)">
              GitHub
            </a>
          </div>
        </div>
      </article>
    `).join("");
  }

  function thumbGradient(index) {
    const gradients = [
      "linear-gradient(135deg, #0891b2, #22d3ee)",
      "linear-gradient(135deg, #7c3aed, #a78bfa)",
      "linear-gradient(135deg, #0ea5e9, #6366f1)",
      "linear-gradient(135deg, #059669, #22d3ee)",
      "linear-gradient(135deg, #db2777, #a78bfa)",
    ];
    return gradients[index % gradients.length];
  }

  /* ---------------------------------------------------------
     Render: Certifications
     --------------------------------------------------------- */

  function renderCertifications() {
    const grid = $("#certGrid");
    grid.innerHTML = CERTIFICATIONS.map((c) => `
      <div class="cert-card reveal">
        <span class="cert-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="m12 15 8.5-8.5M8 8l-5 5 4 4 5-5M14.5 2.5 21.5 9.5"/><circle cx="7" cy="17" r="4"/></svg>
        </span>
        <div>
          <h3 class="cert-title">${escapeHTML(c.title)}</h3>
          <p class="cert-issuer">${escapeHTML(c.issuer)}</p>
        </div>
      </div>
    `).join("");
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
     Navbar shadow on scroll + back-to-top
     --------------------------------------------------------- */

  function initNavbarScrollState() {
    const navbar = $("#navbar");
    const onScroll = () => {
      navbar.style.boxShadow = window.scrollY > 8 ? "var(--shadow-md)" : "none";
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
     Init
     --------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", () => {
    renderSkills();
    renderProjects();
    renderCertifications();

    initMobileNav();
    initActiveSectionTracking();
    initScrollReveal();
    initProjectModal();
    initNavbarScrollState();
    initBackToTop();
  });
})();
