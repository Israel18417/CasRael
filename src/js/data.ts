// src/js/data.ts

interface ProjectDetails {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  fullDescription?: string;
  projectRole?: string;
  highlights: string[];
  techStack?: string[];
  color: string;
}

export type Project = ProjectDetails & { liveUrl: string };

export const projects: Project[] = [
  {
    id: 1,
    title: "All Rechargeable Plus",
    category: "E-commerce",
    image: "https://s.wordpress.com/mshots/v1/https://all-rechargeable.web.app?w=800",
    description: "An online shop for rechargeable products, with category browsing and WhatsApp enquiries.",
    fullDescription: "The store presents rechargeable products for homes, offices, and businesses in Nigeria. Visitors can browse categories, view selected products, and contact the team through WhatsApp.",
    highlights: ["Product categories", "Featured products powered by Firebase", "WhatsApp enquiries"],
    techStack: ["Next.js", "React", "TypeScript", "Firebase", "Tailwind CSS"],
    color: "#3b82f6",
    liveUrl: "https://all-rechargeable.web.app/",
  },
  {
    id: 2,
    title: "CasRael Portfolio",
    category: "Portfolio",
    image: "https://s.wordpress.com/mshots/v1/https://casrael.vercel.app?w=800",
    description: "CasRael’s studio site, bringing selected work, services, and contact details together.",
    fullDescription: "The site introduces CasRael and its work across technology, brand strategy, and media. It includes project details, service information, and a contact form.",
    highlights: ["Selected projects and case details", "Studio services", "Contact form"],
    techStack: ["React", "TypeScript", "Vite", "Framer Motion"],
    color: "#8b5cf6",
    liveUrl: "https://casrael.vercel.app",
  },
  {
    id: 3,
    title: "PostyBridges",
    category: "Automotive Technology",
    image: "https://s.wordpress.com/mshots/v1/https://postybridges.com?w=800",
    description: "A web platform for automotive technology, including GPS trackers, dash cameras, and infotainment.",
    fullDescription: "PostyBridges presents connected vehicle products, from GPS tracking and dash cameras to infotainment systems and keyless push-starts.",
    projectRole: "Product & Web Development Lead",
    highlights: ["Automotive technology", "GPS tracking and dash cameras", "Infotainment and keyless push-starts"],
    techStack: ["HTML", "CSS", "JavaScript"],
    color: "#ec4899",
    liveUrl: "https://postybridges.com",
  },
  {
    id: 4,
    title: "CSC426 Project Portal",
    category: "Education",
    image: "https://s.wordpress.com/mshots/v1/https://csc426.vercel.app?w=800",
    description: "A portal for CSC426 practical work, including calculator and user-authentication projects.",
    fullDescription: "The portal gathers practical coursework and assignments for CSC426, including a premium calculator and a user-authentication project.",
    highlights: ["Coursework and practical assignments", "Calculator project", "User-authentication project"],
    techStack: ["HTML", "CSS", "JavaScript"],
    color: "#10b981",
    liveUrl: "https://csc426.vercel.app",
  },
  {
    id: 5,
    title: "CasRael Automobiles",
    category: "Automotive",
    image: "https://s.wordpress.com/mshots/v1/https://casrael-auto.vercel.app?w=800",
    description: "A digital showroom for curated luxury, performance, and electric vehicles.",
    fullDescription: "Visitors can search represented marques, browse available vehicles, review specifications, and send a sourcing enquiry.",
    highlights: ["Searchable marque directory", "Vehicle inventory and specifications", "Sourcing enquiry form"],
    techStack: ["HTML", "CSS", "JavaScript"],
    color: "#f59e0b",
    liveUrl: "https://casrael-auto.vercel.app",
  },
  {
    id: 6,
    title: "Bold Life Ladies Initiative",
    category: "Nonprofit",
    image: "https://s.wordpress.com/mshots/v1/https://blli.vercel.app?w=800",
    description: "A website for an initiative supporting women and girls through education, leadership, and mentorship.",
    fullDescription: "The site introduces the Bold Life Ladies Initiative and its work in education scholarships, leadership, and entrepreneurial mentorship.",
    highlights: ["Organisation and programme information", "Education and scholarships", "Leadership and entrepreneurship"],
    techStack: ["HTML", "CSS", "JavaScript"],
    color: "#06b6d4",
    liveUrl: "https://blli.vercel.app",
  },
  {
    id: 7,
    title: "My SIWES Project",
    category: "Education",
    image: "https://s.wordpress.com/mshots/v1/https://my-siwesproject.vercel.app?w=800",
    description: "A student portfolio for practical work completed during SIWES.",
    fullDescription: "A public portfolio collecting student projects and practical work from the SIWES programme.",
    highlights: ["Student project showcase", "Practical work from SIWES", "Hosted on Vercel"],
    color: "#f97316",
    liveUrl: "https://my-siwesproject.vercel.app",
  },
];

export interface ProfileExperience {
  title: string;
  organization: string;
  period: string;
}

export interface ProfileEducation {
  school: string;
  qualification: string;
  period: string;
}

export interface PersonalProfile {
  name: string;
  title: string;
  summary: string;
  experience: ProfileExperience[];
  education: ProfileEducation[];
  skills: string[];
  languages: string[];
}

export const personalProfile: PersonalProfile = {
  name: "Israel Ogunnaike",
  title: "CEO, CasRael · Product & Web Development Lead",
  summary:
    "I’m Israel Ogunnaike, CEO of CasRael and a Computer Science student at Adekunle Ajasin University. My experience and skills span web development, product management, and digital strategy.",
  experience: [
    {
      title: "Product & Web Development Lead",
      organization: "PostyBridges",
      period: "2026–Present",
    },
    {
      title: "Intern",
      organization: "CITS, University of Lagos",
      period: "2025",
    },
    {
      title: "Junior Staff",
      organization: "Eman Print",
      period: "2022–2024",
    },
    {
      title: "Shop Assistant",
      organization: "Cyber Cafe",
      period: "2021",
    },
    {
      title: "Secretary",
      organization: "Tutelage Educational Services",
      period: "2018–2019",
    },
  ],
  education: [
    {
      school: "Adekunle Ajasin University",
      qualification: "B.Sc. Computer Science",
      period: "2023–2026",
    },
    {
      school: "National College",
      qualification: "SSCE",
      period: "2018–2021",
    },
    {
      school: "C.M.S Grammar School",
      qualification: "BECE",
      period: "2014–2017",
    },
  ],
  skills: [
    "Product management and strategy",
    "Web development",
    "Business and digital strategy",
    "Leadership and team management",
    "Critical thinking and problem-solving",
    "Project management",
    "Stakeholder communication",
    "Creativity and innovation",
  ],
  languages: ["English", "Yoruba"],
};

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
  scope?: "core" | "additional";
}

export const profile: Profile = {
  name: "CasRael",
  owner: "Israel Ogunnaike",
  location: "Based in Lagos and Ondo state, Nigeria",
  description:
    "Empowering ambitious brands with cutting-edge technology, strategic product management, and high-impact digital storytelling.",
  brandStory:
    "CasRael is a brand and technology studio led by Israel Ogunnaike. The work ranges from websites and digital products to brand direction and media. This portfolio brings together selected projects and the services behind them.",

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
  ],
  brandValues: [
    "Clear thinking before the build",
    "Useful digital work made for real people",
    "A close working relationship from brief to launch",
  ],
  serviceExamples: [
    {
      title: "Web & App Development",
      description:
        "Designing and building responsive websites, client portals, and web apps from the first brief through launch.",
    },
    {
      title: "Brand & Product Strategy",
      description:
        "Helping teams shape their positioning, identity, and product direction so people understand what they offer.",
    },
    {
      title: "Media, Events & Coverage",
      description:
        "Covering events and creating digital content that gives the people, work, and moment a clear story.",
    },
    {
      title: "Trade & Global Business Support",
      description:
        "Additional support with import and export workflows and international market entry, available by request.",
      scope: "additional",
    },
  ],
  contactEmail: "mycasrael@gmail.com",
  phone: "+234 904 698 8683",
  whatsapp: "https://wa.me/2349046988683",
  website: "https://casrael.vercel.app",
  skills: ["React", "TypeScript", "3D UI", "Motion Design", "Responsive Layout"],
};

