import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
    {
        title: "Our Apartment",
        image: "/images/ourrapartment.png",
        description: "Feature-rich community management platform for modern apartment complexes.",
        tags: ["React", "Node.js", "Express", "MongoDB"],
        live: "https://community-management-lake.vercel.app/",
        github: "https://github.com/Parthasrikar/community-management"
    },
    {
        title: "Quick Chat",
        image: "/images/quick-chat.png",
        description: "Instant messaging application with real-time communication capabilities.",
        tags: ["React", "Socket.io", "Node.js", "Framer Motion"],
        live: "https://quick-chat-frontend-lkb2.onrender.com/",
        github: "https://github.com/Parthasrikar/quick-chat"
    },
    {
        title: "Whiteboard",
        image: "/images/whiteboard.png",
        description: "Real-time collaborative whiteboard for seamless team brainstorming.",
        tags: ["React", "Socket.io", "Canvas API", "Tailwind CSS"],
        live: "https://whiteboard-frontend-2e8f.onrender.com/",
        github: "https://github.com/Parthasrikar/whiteboard"
    },
    {
        title: "Premier Agency",
        image: "/images/primier.png",
        description: "Modern digital agency portfolio website with sleek animations.",
        tags: ["GSAP", "HTML", "CSS", "JS"],
        live: "https://parthasrikar.github.io/web_projects/p1",
        github: "https://github.com/Parthasrikar/web_projects"
    },
    {
        title: "Galactic Explorer",
        image: "/images/galectic.png",
        description: "Interactive space exploration website with stunning 3D visuals.",
        tags: ["Next.js", "Framer Motion", "Three.js"],
        live: "https://parthasrikar.github.io/galectic_canvas/",
        github: "https://github.com/Parthasrikar/galectic_canvas?tab=readme-ov-file"
    },
    {
        title: "Obys Agency Clone",
        image: "/images/obys-clone.png",
        description: "Award-winning design implementation and animation for a high-end agency.",
        tags: ["HTML", "CSS", "GSAP", "JS"],
        live: "https://parthasrikar.github.io/obysweb-clone/",
        github: "https://github.com/Parthasrikar/obysweb-clone"
    }
]

const Projects = () => {
    return (
        <section id="projects" className="min-h-screen w-full py-20 px-6 md:px-20 relative z-10 pointer-events-none">
            <div className="pointer-events-auto">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-right"
                >
                    Selected <span className="text-secondary">Works</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative h-[400px] rounded-2xl overflow-hidden border border-white/10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 z-10" />
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-300 mb-4">{project.description}</p>

                                <div className="flex gap-2 mb-6">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs backdrop-blur-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors pointer-events-auto"
                                    >
                                        <ExternalLink size={20} />
                                    </a>
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-black/50 text-white border border-white/20 rounded-full hover:bg-black/80 transition-colors pointer-events-auto"
                                    >
                                        <Github size={20} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
