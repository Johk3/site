/*
 * All the text on the site lives in this file. Edit it, save, refresh the page.
 *
 * Inline formatting inside any text:
 *   [label](https://example.com)   a link
 *   *words*                        italics
 *   \\*                             a literal asterisk
 *
 * Leave a field as "" (or delete it) and it simply does not show.
 */
window.SITE = {
  // Header
  name: "Johannes Leppäkorpi",
  subtitle: "Embedded software and on-device machine learning",
  affiliation: "MSc Computer & Embedded Systems Engineering, TU Delft",

  // Short bio shown under the title. One string per paragraph.
  abstract: [
    "MSc student in Computer & Embedded Systems Engineering at TU Delft (expected July 2028), with a BSc in Data Science and Artificial Intelligence from Leiden University (GPA 8.01/10, Honours). I build real-time, multithreaded and networked software in C++ and Python, and I work on embedded systems and on-device machine learning."
  ],
  keywordsLabel: "Keywords",
  keywords: ["Embedded systems", "C++", "Python", "Rust", "Real-time systems", "Machine learning"],

  // Buttons under the bio. The first one with a URL is drawn as the main button.
  email: "johkmr@gmail.com",       // shows a "Get in touch" button. Set to "" to hide.
  links: [
    { label: "GitHub", url: "https://github.com/Johk3" },
    { label: "LinkedIn", url: "" },   // paste your profile URL
    { label: "CV", url: "" }          // e.g. "assets/cv.pdf" after you add the file
  ],

  // Optional portrait, e.g. "assets/img/portrait.jpg". Leave "" for none.
  portrait: "",
  portraitAlt: "Portrait of Johannes Leppäkorpi",

  // Body sections, in order. Each section may have any of:
  //   entries: [{ title, meta, place, text, bullets: [], url, image, imageAlt, caption }]
  //   table:   [["Label", "Value"], ...]
  //   bullets: ["...", "..."]
  //   text:    ["paragraph", "paragraph"]
  // An entry with a "url" is numbered and listed under References automatically.
  sections: [
    {
      title: "Education",
      entries: [
        {
          title: "MSc Computer & Embedded Systems Engineering, TU Delft",
          meta: "09/2026 to 07/2028 (expected)",
          place: "Delft, Netherlands",
          text: "Focus on control theory, software engineering, hardware engineering and systems engineering.",
          bullets: [
            "Key courses: Real-Time Systems, Processor Design Project, Digital VLSI Systems on Chip, High-Performance and AI Architectures, Reconfigurable Computing Design, Embedded Computer Architecture 2, Hardware Dependability."
          ]
        },
        {
          title: "BSc Data Science and Artificial Intelligence, Leiden University",
          meta: "09/2023 to 07/2026",
          place: "Leiden, Netherlands",
          text: "GPA 8.01/10 (top 10%), Honours student. Focus on algorithm design, machine learning, reinforcement learning and scalable computation.",
          bullets: [
            "Key courses: Algorithms & Data Structures, Software Engineering (agile team project for an external client), Software Development (airline ticketing system with a full test suite and CI/CD lifecycle), Essentials of Computer Systems."
          ]
        },
        {
          title: "Minor in Applied Mathematics (Finance), TU Delft",
          meta: "09/2025 to 01/2026",
          place: "Delft, Netherlands",
          text: "Quantitative finance and mathematical modelling: mathematical finance (stochastics, Itô calculus, Brownian motion), time series, option valuation methods (Monte Carlo with variance reduction, finite difference methods) and risk management."
        }
      ]
    },
    {
      title: "Experience",
      entries: [
        {
          title: "Software Developer and Data Platform Engineer, OpenML",
          meta: "From 02/2026",
          place: "Leiden, Netherlands",
          bullets: [
            "Designed and implemented a high-throughput dataset upload interface in Python, built for 100+ concurrent users uploading datasets of 100 GB or more through chunked transfer, with a multithreaded design for throughput and stability under load.",
            "Built backend data ingestion pipelines and validation logic, with automated quality checks and Croissant metadata for each dataset.",
            "Benchmarked pipeline correctness and system performance across large datasets.",
            "Maintained GitHub Actions CI/CD pipelines with automated test suites and code quality checks, and wrote the system documentation.",
            "Gathered requirements from stakeholders and communicated technical decisions in an agile (Scrum) team."
          ],
          url: "https://github.com/Johk3/OpenML-CDI"
        },
        {
          title: "Lead Developer and Systems Administrator, U.S. Ambassador's Entrepreneurial Challenge",
          meta: "2019 to 2020",
          place: "Helsinki, Finland",
          bullets: [
            "Designed and deployed a MERN stack web application that won first place nationally.",
            "Architected a REST API connecting the frontend to a live ML inference backend.",
            "Deployed on AWS inside a VPC with private subnets and security group containment, and managed all cloud infrastructure end to end."
          ]
        }
      ]
    },
    {
      title: "Projects",
      entries: [
        {
          title: "Stochastic multi-objective EV routing problem (bachelor thesis)",
          meta: "2026, grade 9.0/10 (top 3%), published at ICCL2026",
          text: "A simulation-based, two-stage stochastic multi-objective evolutionary algorithm framework with stochastic traffic, vehicle breakdown and battery depletion. It improves energy efficiency, time-window adherence and operational resilience over a deterministic baseline.",
          url: "https://github.com/Johk3/MOS-EVRPTW-Data"
        },
        {
          title: "High-performance N-body physics simulator",
          meta: "2024, C++, OpenCL",
          text: "A real-time simulator processing 100k+ objects at 60+ FPS, using CPU-to-GPU offloading via OpenCL, multithreading and spatial partitioning."
        },
        {
          title: "XIAO ESP32S3 livestream platform",
          meta: "2026, C++, ESP32-S3",
          text: "Captures livestreamed footage on a XIAO ESP32S3 and saves all of it to the SD card.",
          url: "https://github.com/Johk3/XIAO-ESP32S3-Sense-Livestream-Platform"
        },
        {
          title: "auto-belt, Factorio belt auto-routing",
          meta: "2026",
          text: "Automatic belt routing for Factorio using hierarchical A\\* (HPA\\*).",
          url: "https://github.com/Johk3/auto-belt"
        },
        {
          title: "Flight search engine backend",
          meta: "2023, TypeScript, PostgreSQL",
          text: "A RESTful API with Express.js and TypeScript and database queries optimised through Prisma ORM on PostgreSQL. Containerised microservices with OAuth 2.0 and JWT authentication, and a full automated test suite with CI/CD.",
          url: "https://github.com/Johk3/MadoffAirlines"
        }
      ]
    },
    {
      title: "Skills",
      table: [
        ["Languages", "Python (professional), C++, Rust, C, TypeScript, SQL, Verilog."],
        ["Data and ML", "Pandas, NumPy, scikit-learn, PyTorch, TensorFlow."],
        ["Tools", "Docker, Linux, Git, AWS, GitHub Actions, OpenCL, PostgreSQL."],
        ["Practices", "CI/CD, Scrum, test-driven development, multithreaded and network (TCP/IP) programming, system documentation."],
        ["Quantitative", "Stochastic modelling, Monte Carlo simulation, finite difference methods, time series analysis."]
      ]
    },
    {
      title: "Awards and languages",
      bullets: [
        "Honours student, Leiden University Honours Academy.",
        "First place, U.S. Ambassador's Entrepreneurial Challenge, Helsinki (2019).",
        "Speaker, Oxford University Debate Tournament (2023). Adjudicator, Sciences Po Reims Debate Tournament (2024).",
        "Languages: Finnish (native), English (native)."
      ]
    }
  ],

  // Search and sharing. Used by build.mjs for the <title>, description, canonical URL,
  // social cards and structured data.
  seo: {
    siteUrl: "https://johk3.github.io/",   // change this if you add a custom domain
    title: "Johannes Leppäkorpi | Embedded Software and Machine Learning",   // keep under about 60 characters
    description: "MSc student in Computer & Embedded Systems Engineering at TU Delft. Embedded software, real-time systems and on-device machine learning.",   // keep under about 155
    ogImage: "assets/og.png",               // 1200 x 630 social preview image
    locale: "en",
    googleVerification: "",                 // token from Google Search Console, if you use it
    alternateNames: ["Johannes Leppakorpi"], // spellings people may type without the umlaut
    jobTitle: "MSc student, Computer & Embedded Systems Engineering",
    affiliation: [{ name: "TU Delft", url: "https://www.tudelft.nl" }],
    alumniOf: [{ name: "Leiden University", url: "https://www.universiteitleiden.nl" }]
  },

  // Words used by the page itself
  labels: {
    skip: "Skip to content",
    references: "References",
    getInTouch: "Get in touch",
    sourceCode: "Source code"
  },

  footer: "Johannes Leppäkorpi"
};
