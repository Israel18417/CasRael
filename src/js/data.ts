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
    title: "Creative Web Developer",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=800&h=600&fit=crop",
    description: "Crafting beautiful and responsive web experiences",
    color: "#FF6B6B",
  },
  {
    id: 2,
    title: "3D Design Enthusiast",
    category: "3D Design",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    description: "Exploring the third dimension in digital art",
    color: "#4ECDC4",
  },
  {
    id: 3,
    title: "Frontend Engineer",
    category: "Engineering",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
    description: "Building interactive and dynamic interfaces",
    color: "#45B7D1",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    category: "Design",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    description: "Creating intuitive and beautiful user experiences",
    color: "#F7B731",
  },
  {
    id: 5,
    title: "Tech Innovator",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    description: "Pushing the boundaries of technology",
    color: "#5F27CD",
  },
  {
    id: 6,
    title: "Full Stack Developer",
    category: "Development",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    description: "From backend to frontend, mastering the full stack",
    color: "#00D2D3",
  },
];
