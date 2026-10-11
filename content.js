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
    { label: "LinkedIn", url: "https://www.linkedin.com/in/johannes-lepp%C3%A4korpi/" },
    { label: "CV", url: "" }          // e.g. "assets/cv.pdf" after you add the file
  ],

  // Optional portrait, e.g. "assets/img/portrait.jpg". Leave "" for none.
  portrait: "assets/img/portrait.jpg",
  portraitAlt: "Portrait of Johannes Leppäkorpi",

  // Body sections, in order. Each section may have any of:
  //   entries: [{ title, meta, place, text, bullets: [], url, refLabel, links: [{label, url}], logo, image, imageSize: [w, h], imageAlt, diagram, caption }]
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
          logo: { src: "assets/img/tu-delft.png", srcDark: "assets/img/tu-delft-dark.png", alt: "TU Delft", width: 271, height: 106, url: "https://www.tudelft.nl" },   // srcDark is used in dark mode
          meta: "09/2026 to 07/2028 (expected)",
          place: "Delft, Netherlands",
          text: "Focus on software engineering, hardware engineering and systems engineering.",
          bullets: [
            "Key courses: Real-Time Systems, Processor Design Project, Computer Arithmetic, High-Performance and AI Architectures, Reconfigurable Computing Design, Hardware Dependability."
          ]
        },
        {
          title: "BSc Data Science and Artificial Intelligence, Leiden University",
          logo: { src: "assets/img/leiden.png", srcDark: "assets/img/leiden-dark.png", alt: "Leiden University", width: 277, height: 118, displayHeight: 40, url: "https://www.universiteitleiden.nl" },
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
          url: "https://github.com/Johk3/OpenML-CDI",
          diagram: "assets/img/openml-architecture.svg",
          caption: "How a dataset upload moves through the platform. The dashed box is an external service."
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
          title: "Multi-Objective Stochastic Electric Vehicle Routing with Time Windows (bachelor thesis)",
          meta: "2026, Python, grade 9.0/10 (top 3%)",
          text: "A simheuristic for routing electric delivery vehicles when traffic congestion, breakdowns and battery depletion can disrupt a plan, written with Yingjie Fan. Routes are evolved with NSGA-II and each candidate is scored by Monte Carlo simulation over sampled disruptions, using a physics-based energy model. On the rc101_21 benchmark instance, the knee point of the Pareto front used 26 to 73% less energy and 18 to 53% less recourse cost than a deterministic VRPy baseline as the instance grew from 10 to 100 customers. Time-window violations rose instead, by an amount that depends on customer geometry and disruption risk. Published in the ICCL 2026 proceedings ([Springer, Lecture Notes in Computer Science](https://link.springer.com/book/9783032407313)).",
          url: "https://github.com/Johk3/MOS-EVRPTW-Data",
          refLabel: "Source data",                 // word before the link in References
          links: [{ label: "Paper (Springer)", url: "https://link.springer.com/book/9783032407313" }],
          image: "assets/img/thesis-pareto.png",
          imageSize: [720, 745],
          imageAlt: "3D scatter plot of energy, time-window penalty and resilience cost. The stochastic Pareto front lies below the deterministic baseline, marked with a cross.",
          caption: "Pareto front for 100 customers (rc101_21) against the deterministic baseline, marked with a cross. p_breakdown = 0.05 is the chance that a vehicle breaks down on any one leg of its route; sigma = 0.15 is the spread of the log-normal traffic slowdown applied to each leg's travel time; customers is the number of delivery stops; MC = 500 is the number of Monte Carlo disruption scenarios averaged to score each candidate plan.",
          // Marked up as a ScholarlyArticle in the structured data
          publication: { publisher: "Springer", event: "ICCL 2026, 17th International Conference on Computational Logistics", date: "2026", coAuthors: ["Yingjie Fan"] }
        },
        {
          title: "High-performance N-body physics simulator",
          meta: "2024, C++, OpenGL, OpenCL",
          text: "A real-time simulator processing 100k+ objects at 60+ FPS, using CPU-to-GPU offloading via OpenCL, a thread pool and a spatial grid for collision checks. Rendered with OpenGL and GLFW, with an ImGui control panel.",
          url: "https://github.com/Johk3/physik",
          image: "assets/img/physik.png",
          imageSize: [536, 384],
          imageAlt: "Hundreds of coloured bodies with motion trails orbiting and colliding with a large central mass",
          caption: "Bodies falling into orbit around a massive object."
        },
        {
          title: "XIAO ESP32S3 Sense dashcam and live streamer",
          meta: "2026, C++, FreeRTOS, Python",
          text: "Firmware that turns the XIAO ESP32S3 Sense into an always-on dashcam, extending Seeed's camera web server example. The board serves a 1600 x 1200 live stream while a FreeRTOS task pinned to core 0, away from the web server, writes every frame to the SD card in NTP-timestamped hourly folders. Frame buffer count and JPEG quality are tuned so full-resolution capture fits in PSRAM without allocation failures. A Python companion recognises the card when it is plugged in, remembers which frames it has already processed and stitches each hour into an MP4 with FFmpeg.",
          url: "https://github.com/Johk3/XIAO-ESP32S3-Sense-Livestream-Platform"
        },
        {
          title: "auto-belt, Factorio belt auto-routing",
          meta: "2026, Lua",
          text: "A Factorio 2.0 mod that routes a conveyor belt between two points with hierarchical A\\* (HPA\\*). It prefers fewer turns, crosses obstacles with underground belts and spreads the search and construction over game ticks under a fixed work budget, so long routes never stall the game.",
          url: "https://github.com/Johk3/auto-belt",
          image: "assets/img/auto-belt.jpg",
          imageSize: [1126, 411],
          imageAlt: "Two Factorio screenshots of a lake. Left: a thin preview line runs around the top and right of the lake. Right: the same route placed as belt ghosts, crossing the inlet at the top underground.",
          caption: "Left: route preview around a lake. Right: the placed belt, crossing the inlet at the top underground."
        },
        {
          title: "Flight search engine backend",
          meta: "2023, TypeScript, PostgreSQL",
          text: "The backend of a flight booking site. An Express and TypeScript REST API searches live offers through the Amadeus API, re-prices the chosen offer and stores bookings and passengers in PostgreSQL through Prisma. Users sign in with JWT access and refresh tokens over bcrypt-hashed passwords, and every request is validated with Joi and rate limited. The API and database run as Docker containers, with Jest unit and integration tests and CI/CD.",
          url: "https://github.com/Johk3/MadoffAirlines",
          diagram: "assets/img/madoff-architecture.svg",
          caption: "How a request moves through the system. The dashed box is an external service."
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
    siteUrl: "https://johannesl.com/",
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
    references: "Links",
    getInTouch: "Get in touch",
    sourceCode: "Source code"
  },

  footer: "Johannes Leppäkorpi"
};
