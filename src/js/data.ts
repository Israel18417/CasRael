// src/js/data.ts

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Full-Stack Innovation",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    description: "Building scalable web applications and technical solutions that bridge the gap between complex backend logic and intuitive frontend experiences.",
    color: "#3b82f6",
  },
  {
    id: 2,
    title: "Strategic Brand Design",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
    description: "Crafting unique visual identities and brand positioning strategies that help visionary businesses stand out in a crowded digital landscape.",
    color: "#8b5cf6",
  },
  {
    id: 3,
    title: "Digital Storytelling",
    category: "Media",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
    description: "Capturing the essence of events and brand narratives through high-quality media production, digital coverage, and cinematic storytelling.",
    color: "#ec4899",
  },
  {
    id: 4,
    title: "Global Trade Logistics",
    category: "Business",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=600&fit=crop",
    description: "Expert support for international trade, importation, and exportation, leveraging technology to streamline global business operations.",
    color: "#10b981",
  },
  {
    id: 5,
    title: "Interactive 3D UI",
    category: "Design",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    description: "Designing immersive user interfaces with 3D-inspired motion and glassmorphism that engage users and elevate brand perception.",
    color: "#f59e0b",
  },
  {
    id: 6,
    title: "Product Strategy",
    category: "Management",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=600&fit=crop",
    description: "Defining product roadmaps and management frameworks that ensure technological innovations meet real-world business goals.",
    color: "#06b6d4",
  },
];
