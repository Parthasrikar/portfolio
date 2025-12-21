import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
    {
        title: "Educational Platform",
        image: "/images/edu.png",
        description: "A comprehensive educational platform for online learning.",
        tags: ["React", "Node.js", "MongoDB"]
    },
    {
        title: "Obys Agency Clone",
        image: "/images/obys-clone.png",
        description: "Award-winning design implementation and animation.",
        tags: ["HTML", "CSS", "GSAP"]
    },
    {
        title: "Apple Vision Pro",
        image: "/images/apple-clone.png",
        description: "Pixel-perfect clone of the Apple Vision Pro landing page.",
        tags: ["React", "Three.js", "GSAP"]
    },
    {
        title: "Galactic Explorer",
        image: "/images/galectic.png",
        description: "Interactive space exploration website.",
        tags: ["Next.js", "Framer Motion"]
    },
    {
        title: "Premier Agency",
        image: "/images/primier.png",
        description: "Modern digital agency portfolio website.",
        tags: ["Vue.js", "Tailwind"]
    },
    {
        title: "VidCraft",
        image: "/images/vid-craft.png",
        description: "Video content creation and analysis tool.",
        tags: ["React", "Python", "AI"]
    }
]

const Projects = () => {
    return (
        <section className="min-h-screen w-full py-20 px-6 md:px-20 relative z-10 pointer-events-none">
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
                                    <button className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
                                        <ExternalLink size={20} />
                                    </button>
                                    <button className="p-3 bg-black/50 text-white border border-white/20 rounded-full hover:bg-black/80 transition-colors">
                                        <Github size={20} />
                                    </button>
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
