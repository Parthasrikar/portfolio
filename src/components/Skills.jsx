import { motion } from 'framer-motion'
import { Code, Server, Database, Cloud, Brain, Terminal } from 'lucide-react'

const skills = [
    {
        category: "FRONTEND",
        icon: <Code className="w-8 h-8 text-sky-400" />,
        items: "Next.js, React.js, TailwindCSS, ShadCN",
        color: "border-sky-500/50"
    },
    {
        category: "BACKEND",
        icon: <Server className="w-8 h-8 text-green-500" />,
        items: "Node.js, Express.js, Socket.io, WebRTC",
        color: "border-green-500/50"
    },
    {
        category: "DATABASE & ORM",
        icon: <Database className="w-8 h-8 text-emerald-500" />,
        items: "MongoDB, Prisma ORM, PostgreSQL",
        color: "border-emerald-500/50"
    },
    {
        category: "CLOUD & DEVOPS",
        icon: <Cloud className="w-8 h-8 text-orange-500" />,
        items: "AWS (EC2, S3, Lambda, SQS), Docker, Kafka",
        color: "border-orange-500/50"
    },
    {
        category: "AI & ML",
        icon: <Brain className="w-8 h-8 text-blue-500" />,
        items: "LangChain, LangGraph, LLM Integration",
        color: "border-blue-500/50"
    },
    {
        category: "TOOLS",
        icon: <Terminal className="w-8 h-8 text-white" />,
        items: "Git, Vercel, Render, Postman",
        color: "border-white/50"
    }
]

const Skills = () => {
    return (
        <section className="min-h-screen w-full py-20 px-6 md:px-20 relative z-10 pointer-events-none">
            <div className="pointer-events-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    Technical <span className="text-primary">Skills</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`backdrop-blur-md bg-white/5 p-8 rounded-2xl border ${skill.color} hover:bg-white/10 transition-all hover:scale-105`}
                        >
                            <div className="mb-4">{skill.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{skill.category}</h3>
                            <p className="text-gray-300">{skill.items}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Skills
