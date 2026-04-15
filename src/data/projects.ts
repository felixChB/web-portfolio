export interface Project {
    id: string;
    title: string;
    description: string;
    year: number;
    tags: string[];
    tools: string[];
    thumbnail: string;
    imgs?: string[]; // Optional
    videos?: string[]; // Optional
    url: string; // Optional
}

export interface ProjectCardProps {
    id: string;
    title: string;
    year: number;
    tags: string[];
    thumbnail: string;
    url: string;
}

export const projectData: Project[] = [
    {
        id: "vr-pong",
        title: "VR-Pong",
        description: "A multiplayer VR pong game built with webXR.",
        year: 2025,
        tags: ["webXR", "VR", "co-located", "multiplayer"],
        tools: ["webXR", "node.js", "babylon.js", "socket.io", "TypeScript"],
        thumbnail: "/assets/images/portfolio.jpg",
        imgs: ["/assets/images/portfolio-1.jpg", "/assets/images/portfolio-2.jpg"],
        videos: ["/assets/videos/portfolio.mp4"],
        url: ""
    },
    {
        id: "rising-weather",
        title: "Rising Weather",
        description: "An interactive data-driven media installation.",
        year: 2022,
        tags: ["installation", "interactive", "visualisation", "data-driven"],
        tools: ["Touchdesigner", "Kinect", "GLSL"],
        thumbnail: "",
        imgs: [],
        videos: [],
        url: ""
    },
    {
        id: "constructor",
        title: "Constructor",
        description: "A hand-painted 3D model inspired by Borderlands 3.",
        year: 2023,
        tags: ["game-asset", "3D-modelling", "texture-painting"],
        tools: ["Blender", "Gimp"],
        thumbnail: "",
        imgs: [],
        videos: [],
        url: ""
    },
    {
        id: "ui-verse",
        title: "UI-verse",
        description: "An interactive timeline about the origin of the universe.",
        year: 2020,
        tags: ["web-design", "interactive", "timeline"],
        tools: ["javascript", "Adobe XD"],
        thumbnail: "",
        imgs: [],
        videos: [],
        url: ""
    }
];