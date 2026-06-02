// src/js/data.ts

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  fullDescription?: string;
  techStack?: string[];
  color: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Full-Stack Innovation",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    description: "Building scalable web applications and technical solutions that bridge the gap between complex backend logic and intuitive frontend experiences.",
    fullDescription: "A comprehensive exploration of full-stack architectures, focusing on performance, scalability, and user-centric design. This project involved implementing robust APIs, real-time data synchronization, and a highly responsive frontend using modern frameworks.",
    techStack: ["React", "Node.js", "PostgreSQL", "Socket.io", "Redis"],
    color: "#3b82f6",
  },
  {
    id: 2,
    title: "Strategic Brand Design",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
    description: "Crafting unique visual identities and brand positioning strategies that help visionary businesses stand out in a crowded digital landscape.",
    fullDescription: "Strategic branding goes beyond logos. It's about creating a narrative that resonates. This project focuses on market research, visual language development, and cohesive brand messaging across all digital touchpoints.",
    techStack: ["Illustrator", "Figma", "Photoshop", "Brand Strategy", "Typography"],
    color: "#8b5cf6",
  },
  {
    id: 3,
    title: "Digital Storytelling",
    category: "Media",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
    description: "Capturing the essence of events and brand narratives through high-quality media production, digital coverage, and cinematic storytelling.",
    fullDescription: "Using the power of video and photography to tell compelling stories. This project highlights event coverage techniques, post-production workflows, and the integration of digital media into marketing campaigns.",
    techStack: ["Premiere Pro", "After Effects", "Cinematography", "Storyboarding"],
    color: "#ec4899",
  },
  {
    id: 4,
    title: "Global Trade Logistics",
    category: "Business",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=600&fit=crop",
    description: "Expert support for international trade, importation, and exportation, leveraging technology to streamline global business operations.",
    fullDescription: "Optimizing the flow of goods across borders. This project details the digital transformation of logistics, including tracking systems, automated documentation, and global supply chain management.",
    techStack: ["Supply Chain", "ERP Systems", "Digital Logistics", "Global Trade Compliance"],
    color: "#10b981",
  },
  {
    id: 5,
    title: "Interactive 3D UI",
    category: "Design",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    description: "Designing immersive user interfaces with 3D-inspired motion and glassmorphism that engage users and elevate brand perception.",
    fullDescription: "Exploring the boundaries of web UI. This project showcases the use of Three.js, Framer Motion, and CSS 3D transforms to create depth and interactivity that traditional flat designs can't match.",
    techStack: ["Three.js", "Framer Motion", "CSS 3D", "WebGL", "React Spring"],
    color: "#f59e0b",
  },
  {
    id: 6,
    title: "Product Strategy",
    category: "Management",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=600&fit=crop",
    description: "Defining product roadmaps and management frameworks that ensure technological innovations meet real-world business goals.",
    fullDescription: "Bridging the gap between engineering and business. This project outlines the product lifecycle from ideation to launch, focusing on MVP definition, user feedback loops, and iterative development.",
    techStack: ["Product Roadmap", "Agile", "User Research", "KPI Tracking", "Stakeholder Management"],
    color: "#06b6d4",
  },
];

export interface FeaturedWork {
  id: number;
  title: string;
  description: string;
  link: string;
  tag: string;
}

export const featuredWorks: FeaturedWork[] = [
  {
    id: 1,
    title: "Postybridges",
    description: "An interactive launch experience highlighting marketing strategy, custom visuals, and conversion-focused content.",
    link: "https://postybridges.com",
    tag: "Live Site",
  },
  {
    id: 2,
    title: "My SIWES Project",
    description: "A student showcase using a Vercel-hosted portfolio project to demonstrate product development and deployment skills.",
    link: "https://my-siwesproject.vercel.app",
    tag: "Live Site",
  },
  {
    id: 3,
    title: "CasRael Showcase",
    description: "A modern portfolio example of technology, branding, and media innovation built for digital-first clients.",
    link: "https://casrael.vercel.app",
    tag: "Portfolio",
  },
];

export interface Profile {
  name: string;
  owner: string;
  role: string;
  location: string;
  description: string;
  brandStory: string;
  coreExpertise: Expertise[];
  brandValues: string[];
  serviceExamples: Service[];
  contactEmail: string;
  phone: string;
  website: string;
  skills: string[];
}

export interface Expertise {
  title: string;
  items: string[];
}

export interface Service {
  title: string;
  description: string;
  icon?: string; 
}

export const profile: Profile = {
  name: "CasRael",
  owner: "Israel Ogunnaike",
  role: "Technology, Brand & Media Innovation",
  location: "Based in Lagos and Ondo state, Nigeria",
  description:
    "Empowering ambitious brands with cutting-edge technology, strategic product management, and high-impact digital storytelling.",
  brandStory:
    "CasRael is the specialized creative engine led by Israel Ogunnaike. We bridge the gap between complex web technology and meaningful brand communication, delivering high-end products and global business strategies for a digital-first world.",

  coreExpertise: [
    {
      title: "Technology & Innovation",
      items: [
        "Frontend & full-stack development",
        "Creative web design",
        "Tech innovation",
      ],
    },
    {
      title: "Management & Strategy",
      items: [
        "Product management",
        "Brand management",
        "Business management / entrepreneurship",
      ],
    },
    {
      title: "Media & Events",
      items: [
        "Event coverage",
        "Digital storytelling",
        "Media production",
      ],
    },
    {
      title: "Global Business",
      items: [
        "Importation",
        "Exportation",
        "International trade support",
      ],
    },
  ],
  brandValues: [
    "Creative digital storytelling",
    "3D-inspired interface motion",
    "Polished web experiences for visionary clients",
  ],
  serviceExamples: [
    {
      title: "Web & App Development",
      description:
        "Building responsive web apps, landing pages, and full-stack products with modern frontend and backend tools.",
    },
    {
      title: "Brand & Product Strategy",
      description:
        "Defining positioning, visual identity, and product direction that make CasRael clients stand out.",
    },
    {
      title: "Media, Events & Coverage",
      description:
        "Documenting events, crafting digital stories, and producing media assets for campaigns and launches.",
    },
    {
      title: "Trade & Global Business",
      description:
        "Supporting import/export workflows and international market entry for ambitious businesses.",
    },
  ],
  contactEmail: "mycasrael@gmail.com",
  phone: "+234 904 698 8683",
  website: "https://casrael.vercel.app",
  skills: ["React", "TypeScript", "3D UI", "Motion Design", "Responsive Layout"],
};

