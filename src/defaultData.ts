import { PortfolioData } from "./types";

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  hero: {
    logoName: "Alex.Rivers",
    headline: "Ethos & Code.",
    description: "A curated study on structural minimalism, responsive frontend architecture, and robust web engineering. Crafting digital products with ultimate typographic precision and functional warmth.",
    buttonText1: "View Work",
    buttonText2: "Download Resume"
  },
  about: {
    title: "The Approach.",
    paragraph1: "I am a creative developer specializing in building high-performance, aesthetically refined digital products. My process is rooted in a deep appreciation for typography, space, and fluid interactions, underpinned by modern web architecture.",
    paragraph2: "I strive for pixel perfection while ensuring the underlying codebase remains clean, maintainable, and robust. True user-centric design happens when we view technology as a tool for storytelling.",
    skills: [
      {
        name: "React",
        proficiency: 95,
        description: "Built scalable enterprise SPAs, complex hook architectures, and component libraries.",
        badge: "Expert",
        category: "frontend"
      },
      {
        name: "TypeScript",
        proficiency: 92,
        description: "Strict typing systems, generics, custom utility types, and complete API contract modeling.",
        badge: "Advanced",
        category: "frontend"
      },
      {
        name: "Tailwind CSS",
        proficiency: 98,
        description: "Master of semantic themes, custom layouts, utility class optimization, and fluid designs.",
        badge: "Expert",
        category: "frontend"
      },
      {
        name: "Framer Motion",
        proficiency: 88,
        description: "Crafting fluid layouts, high-performance page transitions, and elegant micro-interactions.",
        badge: "Advanced",
        category: "frontend"
      },
      {
        name: "Node.js",
        proficiency: 90,
        description: "Developing robust RESTful & GraphQL APIs, real-time WebSockets, and heavy task queues.",
        badge: "Advanced",
        category: "backend"
      },
      {
        name: "PostgreSQL",
        proficiency: 85,
        description: "Relational database schema modeling, indexing, query optimization, and transaction handling.",
        badge: "Intermediate",
        category: "backend"
      },
      {
        name: "Redis",
        proficiency: 80,
        description: "Distributed caching layer, session state management, and lightweight pub-sub brokers.",
        badge: "Intermediate",
        category: "backend"
      },
      {
        name: "Docker",
        proficiency: 82,
        description: "Multi-stage container builds, local orchestration development environment, and deployment images.",
        badge: "Advanced",
        category: "backend"
      },
      {
        name: "Git",
        proficiency: 95,
        description: "Monorepo branching strategies, interactive rebasing, merge conflict resolution, and hooks.",
        badge: "Expert",
        category: "tools"
      },
      {
        name: "Figma",
        proficiency: 85,
        description: "High-fidelity mockups, design systems alignment, vector assets creation, and hand-off flow.",
        badge: "Advanced",
        category: "tools"
      },
      {
        name: "Vercel",
        proficiency: 95,
        description: "Serverless functions, zero-config pipelines, ISR optimization, and preview environments.",
        badge: "Expert",
        category: "tools"
      },
      {
        name: "AWS",
        proficiency: 80,
        description: "Configuring S3 storage buckets, CloudFront CDN edge distributions, and Lambda servers.",
        badge: "Intermediate",
        category: "tools"
      }
    ]
  },
  projects: {
    title: "Selected Works.",
    items: [
      {
        id: "aura-dashboard",
        title: "Aura Dashboard",
        subtitle: "A comprehensive analytics platform built with React and D3.js, focusing on data clarity and minimalist aesthetics.",
        description: "Aura Dashboard is a modern data analytics tool constructed specifically for enterprise teams who value visual minimalism and supreme execution speeds. It aggregates complex telemetry streams and charts them with zero latency.",
        year: "2024",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdMrB3y6CwgMnKuVTzhpm_IRTXu5Ek_eyZ5EU2Vm5UWz--DKE_x70O1S_AfTwsWLqq6dlmGHoEIWC3DQDNSfunthGcd9i3dWxldXV797O6dpnjJc14hecgfWNsIhrH3XQWM-ZbBCBsPgYAiyGHTQ06yMuTtIv2DCXzftxzZ0NjfONAAmbwnGIrYxgP4YOQ-cp2BbV3OAzAa_7RRVYkp3cK9u2pamJVPUkKdVMJ20AH27HwAvB4t1Zj",
        tech: ["React", "TypeScript", "D3.js", "Tailwind CSS", "Vite"],
        liveUrl: "https://aura-dashboard-preview.vercel.app",
        githubUrl: "https://github.com/alexrivers/aura-dashboard",
        highlights: [
          "Aggregates 100k+ multi-variant telemetry data points in real-time.",
          "Achieved 40% faster render cycles by implementing requestAnimationFrame debouncers.",
          "Includes a gorgeous bespoke theme palette engine (Warm-monochrome & Dark slate).",
          "Full offline-persistence cache utilizing dynamic localIndexedDB structures."
        ],
        challenges: "The key challenge was managing rapid state synchronization across nested, canvas-based visualization streams. Resolved by structuring custom React context bounds paired with low-level micro-memoization hooks."
      },
      {
        id: "webgl-experiments",
        title: "WebGL Experiments",
        subtitle: "Shader art and interactive 3D scenes.",
        description: "An interactive research playground dedicated to testing custom GPU shaders, glass refraction rendering, and reactive 3D mathematics in standard browser canvasses.",
        year: "2023",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHvmhgx9Y1W3xA3IbMAZ0W9UkQVDzalIcQKnUUZjOoQCS8RosMWbvI69AhHbiy2iRSsl_RuKKN2GtkCwiZW8zCpilDYfCMoYz5C86hnnHcaqoikaU5jG_9QEh4Jivs1hPlbtCb3E8IPNmWjuj0gkZFUWglkjaIvIPkpuOMWjTUAChXwDEtIxrSXffHU5s6SEG3H7vgb3_bZjSakoXHp98ZPHprwSiPr-7qHD5CpF6EiI5GWl5lPBYu",
        tech: ["WebGL", "Three.js", "GLSL Shaders", "TypeScript", "Framer Motion"],
        liveUrl: "https://webgl-shading-experiments.vercel.app",
        githubUrl: "https://github.com/alexrivers/webgl-experiments",
        highlights: [
          "Custom vertex & fragment shaders simulating fluid translucent glass.",
          "Achieved consistent, uninterrupted 60 FPS under heavy math-particle calculations.",
          "Dynamic browser camera viewport binding based on mouse cursor vectors.",
          "Responsive physics engine supporting drag constraints on 3D elements."
        ],
        challenges: "Simulating light refraction inside 3D meshes without sacrificing frame budget on low-spec mobile viewports. Overcome by implementing a custom, low-complexity glass shader math approximation."
      },
      {
        id: "lumina-commerce",
        title: "Lumina Commerce",
        subtitle: "Headless storefront architecture.",
        description: "Lumina is a luxury fashion e-commerce storefront utilizing serverless headless pipelines for fast page delivery and gallery-like aesthetics.",
        year: "2023",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXyiSvDyl3dUePZDzJ2ndlqQm0htuNWIAyPgFItjQ_6KyAJoNdLI75i_Bu3uFY808BO7YiPEUA6K9FVDQ99LZkiQ_O4Ey5H5HAHWPMlKNKN4Cogsy9f0zGcg_68iMGujuBLhGcjJguuKOpZt_IfjUuePjjnCtoQ4_eBRJao4ygyy6Y-mfIwa_njUn_57h2brJC4lJN5IgZz7F3_fE7APgq84SuHwtsZN7Yyw_o7cLwC_Xg34l6h0t-",
        tech: ["Next.js", "Tailwind CSS", "GraphQL", "Stripe API", "Vercel ISR"],
        liveUrl: "https://lumina-luxury-commerce.vercel.app",
        githubUrl: "https://github.com/alexrivers/lumina-commerce",
        highlights: [
          "Incremental Static Regeneration (ISR) delivering sub-1.2s load speeds.",
          "Integrated secure headless Stripe cart flows with instant checkout feedback.",
          "Rich filtering system with fluid spring layout transitions.",
          "Full SEO structural markup contributing to 98+ scores in Lighthouse."
        ],
        challenges: "Ensuring highly dynamic client data, such as immediate stock counts, synced with statically pre-rendered collection listings. Resolved by loading incremental updates via SWR hooks."
      }
    ]
  },
  timeline: {
    title: "Experience & Education.",
    items: [
      {
        id: "sr-frontend",
        period: "2022 - Present",
        title: "Senior Frontend Engineer",
        subtitle: "TechFlow Inc.",
        description: "Leading the development of enterprise web applications using React and TypeScript. Improved core performance metrics by 40% through architectural optimization.",
        achievements: [
          "Led a 5-engineer frontend squad building highly responsive administration platforms.",
          "Established a comprehensive, typed component design system integrating Vite & Tailwind CSS.",
          "Implemented intelligent route chunking and image pipeline optimization, decreasing first-load byte weight by 35%."
        ]
      },
      {
        id: "creative-dev",
        period: "2019 - 2022",
        title: "Creative Developer",
        subtitle: "Studio Minimal.",
        description: "Crafted award-winning digital experiences, focusing on WebGL, Three.js shaders, and highly responsive interactive animations for high-profile client campaigns.",
        achievements: [
          "Built bespoke canvas-rendering particle layouts running fluidly at 60fps on mobile viewports.",
          "Delivered interactive portfolio showcases for global fashion and engineering agencies.",
          "Co-developed internal tooling for quick SVG asset animation rendering."
        ]
      },
      {
        id: "bsc-cs",
        period: "2015 - 2019",
        title: "BSc Computer Science",
        subtitle: "University of Technology",
        description: "Specialized in Human-Computer Interaction (HCI), Advanced Computer Graphics, and scalable web technology architectures.",
        achievements: [
          "Graduated with Academic Excellence Honors (GPA 3.9/4.0).",
          "Completed senior capstone on low-latency WebGL canvas renderers.",
          "Tutored lower-division students in discrete mathematics and object-oriented architectures."
        ]
      }
    ]
  },
  resume: {
    name: "Alex Rivers",
    title: "Creative Developer",
    email: "darkpanther439@gmail.com",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA (Open to Remote)",
    profile: "Highly accomplished Creative Frontend Developer specializing in building high-performance, aesthetically refined digital products. Deep appreciation for typography, space, and fluid interactions underpinned by robust web architecture and technical precision.",
    experience: [
      {
        id: "exp-1",
        title: "Senior Frontend Engineer",
        company: "TechFlow Inc.",
        period: "2022 - Present",
        bullets: [
          "Lead development of enterprise web applications using React, TypeScript, and Vite.",
          "Improved application performance and core web vitals metrics by 40%.",
          "Established a reusable design system with Tailwind CSS and Framer Motion.",
          "Mentored junior engineers and designed scalable state management architectures."
        ]
      },
      {
        id: "exp-2",
        title: "Creative Developer",
        company: "Studio Minimal",
        period: "2019 - 2022",
        bullets: [
          "Crafted award-winning interactive digital marketing experiences for global clients.",
          "Built immersive 3D shaders and canvas animations using WebGL, Three.js, and D3.js.",
          "Developed fast, accessible, SEO-optimized custom headless storefront designs."
        ]
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: "BSc in Computer Science",
        school: "University of Technology",
        period: "2015 - 2019",
        details: "Specialized in Human-Computer Interaction, Advanced Computer Graphics, and Web Technologies. Graduated with Honors. Recipient of Academic Excellence Award."
      }
    ],
    skills: {
      frontend: "React, TypeScript, Tailwind CSS, Next.js, Framer Motion, HTML5, CSS3/SASS, ES6+",
      backend: "Node.js, Express, PostgreSQL, Redis, Docker, RESTful APIs, GraphQL",
      tools: "Git/GitHub, Figma, Vercel, AWS (S3, CloudFront), Netlify, CI/CD, Vite"
    }
  },
  photography: {
    title: "Photography & Moments",
    description: "Beyond the code, I have a deep passion for capturing moments through a lens. Here are some of my favorite clicks directly from my Instagram.",
    instagramUrl: "https://instagram.com/",
    photos: [
      {
        id: "photo-1",
        url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
        linkUrl: "https://instagram.com/",
        caption: "Vintage camera shot"
      },
      {
        id: "photo-2",
        url: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=800",
        linkUrl: "https://instagram.com/",
        caption: "Street photography"
      },
      {
        id: "photo-3",
        url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800",
        linkUrl: "https://instagram.com/",
        caption: "Nature landscapes"
      },
      {
        id: "photo-4",
        url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800",
        linkUrl: "https://instagram.com/",
        caption: "Urban exploration"
      },
      {
        id: "photo-5",
        url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
        linkUrl: "https://instagram.com/",
        caption: "Portrait study"
      },
      {
        id: "photo-6",
        url: "https://images.unsplash.com/photo-1478641300939-0ec5188d3802?auto=format&fit=crop&q=80&w=800",
        linkUrl: "https://instagram.com/",
        caption: "Minimalist architecture"
      }
    ]
  }
};
