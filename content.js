/*
 * All the text on the site lives in this file. Edit it, save, refresh the page.
 *
 * Inline formatting inside any text:
 *   [label](https://example.com)   a link
 *   *words*                        italics
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
    "MSc student in Computer & Embedded Systems Engineering at TU Delft, with a BSc in Data Science & Artificial Intelligence from Leiden University. I work on embedded software and on-device machine learning, and I can deploy models, not just train them."
  ],
  keywordsLabel: "Keywords",
  keywords: ["Embedded systems", "C", "C++", "Rust", "Python", "ESP32", "Machine learning"],

  // Buttons under the bio. The first one with a URL is drawn as the main button.
  email: "",                       // e.g. "you@example.com". Shows a "Get in touch" button.
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
          meta: "2026 to 2028 (expected)",
          place: "Delft, Netherlands",
          text: "Software specialisation. Coursework: computer architecture, real-time systems, hardware/software interfacing."
        },
        {
          title: "BSc Data Science & Artificial Intelligence, Leiden University",
          meta: "2023 to 2026",
          place: "Leiden, Netherlands",
          text: "Honours Academy. Minor in applied mathematics (quantitative finance) at TU Delft.",
          bullets: [
            "Thesis, graded 9.0/10: *Multi-objective stochastic electric vehicle routing problem*"
          ]
        }
      ]
    },
    {
      title: "Experience",
      entries: [
        {
          title: "Software Engineer Intern, OpenML",
          meta: "",                 // add dates, e.g. "Summer 2025"
          place: "Leiden, Netherlands",
          text: "Open-source machine-learning platform.",
          bullets: [
            "Initiated and shipped a dataset upload platform, deployed on Leiden University servers with AWS S3 storage integration.",
            "Built a pipeline-style upload flow: malware scanning, automated quality checks, and a collaborative contributor and expert review process producing Croissant metadata for each dataset.",
            "Designed the platform to serve 100+ concurrent users."
          ],
          url: "https://github.com/Johk3/OpenML-CDI"
        }
      ]
    },
    {
      title: "Projects",
      entries: [
        {
          title: "ESP32 wireless news display",
          meta: "C/C++, ESP32",
          text: "A microcontroller-driven screen showing high-impact headlines, streamed over Wi-Fi from open-source news channels to an ESP32.",
          image: "",                // e.g. "assets/img/news-display.jpg"
          imageAlt: "",
          caption: ""
        },
        {
          title: "physik, a physics engine",
          meta: "C++",
          text: "A physics engine written from scratch in C++.",
          url: "https://github.com/Johk3/physik"
        },
        {
          title: "MadoffAirlines, a flight ticketing platform",
          meta: "Web",
          text: "An online platform for booking and managing flight tickets.",
          url: "https://github.com/Johk3/MadoffAirlines"
        }
      ]
    },
    {
      title: "Skills",
      table: [
        ["Programming", "C, C++, Rust (working proficiency). Python (extensive experience). SQL."],
        ["Embedded and ML", "ESP32 microcontrollers and Wi-Fi peripherals. ML model training and evaluation from the Data Science & AI BSc."]
      ]
    },
    {
      title: "Awards and languages",
      bullets: [
        "Winner, US Ambassador Entrepreneurial Challenge, Helsinki (2020).",
        "Speaker, Oxford University debate tournament (2023). Adjudicator, Sciences Po Reims tournament (2024).",
        "Languages: Finnish (native), English (fluent)."
      ]
    }
  ],

  // Words used by the page itself
  labels: {
    skip: "Skip to content",
    references: "References",
    getInTouch: "Get in touch",
    sourceCode: "Source code"
  },

  footer: "Johannes Leppäkorpi"
};
