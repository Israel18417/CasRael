// src/js/data.ts

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  fullDescription?: string;
  techStack?: string[];
  color: string;
  sourceUrl: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "All Rechargeable",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    description: "An online storefront for rechargeable essentials, with product discovery, category browsing, and WhatsApp ordering.",
    fullDescription: "A Next.js storefront for rechargeable products serving homes, offices, and businesses in Nigeria. It features category navigation, featured products backed by Firebase, and direct WhatsApp ordering.",
    techStack: ["Next.js", "React", "TypeScript", "Firebase", "Tailwind CSS"],
    color: "#3b82f6",
    sourceUrl: "https://github.com/Israel18417/all-rechargeable",
  },
  {
    id: 2,
    title: "CasRael Portfolio",
    category: "Portfolio",
    image: "https://s.wordpress.com/mshots/v1/https://casrael.vercel.app?w=800",
    description: "A responsive portfolio showcasing CasRael's work in technology, brand strategy, and digital storytelling.",
    fullDescription: "CasRael's creative portfolio brings together selected projects and services in a responsive, animated web experience.",
    techStack: ["React", "TypeScript", "Vite", "Framer Motion"],
    color: "#8b5cf6",
    sourceUrl: "https://github.com/Israel18417/CasRael",
    liveUrl: "https://casrael.vercel.app",
  },
  {
    id: 3,
    title: "PostyBridges",
    category: "Automotive Technology",
    image: "https://s.wordpress.com/mshots/v1/https://postybridges.com?w=800",
    description: "A showcase for GPS tracking, dash cameras, modern infotainment systems, and smart push-start upgrades.",
    fullDescription: "An automotive technology project focused on connected vehicle accessories, from real-time GPS tracking and dash cameras to infotainment and keyless push-start systems.",
    techStack: ["HTML", "CSS", "JavaScript"],
    color: "#ec4899",
    sourceUrl: "https://github.com/Israel18417/PostyBridges",
    liveUrl: "https://postybridges.com",
  },
  {
    id: 4,
    title: "CSC426 Project Portal",
    category: "Education",
    image: "https://s.wordpress.com/mshots/v1/https://csc426.vercel.app?w=800",
    description: "A student portal for practical coursework, including a premium calculator and an authentication project.",
    fullDescription: "A collection of practical assignments and projects developed for CSC426, presented through a student project portal.",
    techStack: ["HTML", "CSS", "JavaScript"],
    color: "#10b981",
    sourceUrl: "https://github.com/Israel18417/CSC426",
    liveUrl: "https://csc426.vercel.app",
  },
  {
    id: 5,
    title: "CasRael Automobiles",
    category: "Automotive",
    image: "https://s.wordpress.com/mshots/v1/https://casrael-auto.vercel.app?w=800",
    description: "A luxury vehicle registry and inventory experience for sourcing performance, luxury, and electric cars.",
    fullDescription: "A curated automobile portfolio with searchable marques, vehicle inventory, detailed specifications, and sourcing inquiry flows.",
    techStack: ["HTML", "CSS", "JavaScript"],
    color: "#f59e0b",
    sourceUrl: "https://github.com/Israel18417/CasRael-Auto",
    liveUrl: "https://casrael-auto.vercel.app",
  },
  {
    id: 6,
    title: "Bold Life Ladies Initiative",
    category: "Nonprofit",
    image: "https://s.wordpress.com/mshots/v1/https://blli.vercel.app?w=800",
    description: "An NGO website supporting the empowerment of women and girls through education, leadership, and mentorship.",
    fullDescription: "A digital presence for the Bold Life Ladies Initiative, highlighting its work in leadership, education scholarships, and entrepreneurial mentorship.",
    techStack: ["HTML", "CSS", "JavaScript"],
    color: "#06b6d4",
    sourceUrl: "https://github.com/Israel18417/boldlifeladiesini",
    liveUrl: "https://blli.vercel.app",
  },
];

export interface FeaturedWork {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
  tag: string;
}

export const featuredWorks: FeaturedWork[] = [
  {
    id: 1,
    title: "Postybridges",
    description: "An interactive launch experience highlighting marketing strategy, custom visuals, and conversion-focused content.",
    link: "https://postybridges.com",
    image: "https://s.wordpress.com/mshots/v1/https://postybridges.com?w=700",
    tag: "Live Site",
  },
  {
    id: 2,
    title: "My SIWES Project",
    description: "A student showcase using a Vercel-hosted portfolio project to demonstrate product development and deployment skills.",
    link: "https://my-siwesproject.vercel.app",
    image: "https://s.wordpress.com/mshots/v1/https://my-siwesproject.vercel.app?w=700",
    tag: "Live Site",
  },
  {
    id: 3,
    title: "CasRael Showcase",
    description: "A modern portfolio example of technology, branding, and media innovation built for digital-first clients.",
    link: "https://casrael.vercel.app",
    image: "https://s.wordpress.com/mshots/v1/https://casrael.vercel.app?w=700",
    tag: "Portfolio",
  },
  {
    id: 4,
    title: "Bold Life Ladies Initiative",
    description: "A non-governmental organization empowering women and girls through leadership, education scholarships, and entrepreneurial mentorship.",
    link: "https://blli.vercel.app",
    image: "https://s.wordpress.com/mshots/v1/https://blli.vercel.app?w=700",
    tag: "Live Site",
  },
  {
    id: 5,
    title: "CSC426 Project Portal",
    description: "A student portal showcasing practical assignments, including a premium calculator GUI and a secure user authentication portal.",
    link: "https://csc426.vercel.app",
    image: "https://s.wordpress.com/mshots/v1/https://csc426.vercel.app?w=700",
    tag: "Portal Site",
  },
];

export interface Profile {
  name: string;
  owner: string;
  location: string;
  description: string;
  brandStory: string;
  coreExpertise: Expertise[];
  brandValues: string[];
  serviceExamples: Service[];
  contactEmail: string;
  phone: string;
  whatsapp?: string;
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
}

export const profile: Profile = {
  name: "CasRael",
  owner: "Israel Ogunnaike",
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
  whatsapp: "https://wa.me/2349046988683",
  website: "https://casrael.vercel.app",
  skills: ["React", "TypeScript", "3D UI", "Motion Design", "Responsive Layout"],
};

