import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Calendar } from 'lucide-react'

const experiences = [
    {
        type: "work",
        title: "Software Development Intern",
        organization: "Inncircles",
        period: "4 Months (Current)",
        description: "Led team implementing new features and optimizing performance. Implemented AWS SQS and Kafka for message queuing."
    },
    {
        type: "work",
        title: "ACM Web Dev Lead",
        organization: "ACM Student Chapter",
        period: "2023 - 2024",
        description: "Led 15+ students, organized workshops with 90% satisfaction rate."
    },
    {
        type: "education",
        title: "B.Tech Computer Science",
        organization: "Vignan's Institute",
        period: "Expected May 2026",
        description: "CGPA: 9.10"
    },
    {
        type: "education",
        title: "Intermediate (12th)",
        organization: "Sri Chaitanya",
        period: "Completed",
        description: "84.2%"
    },
    {
        type: "education",
        title: "SSC (10th)",
        organization: "Sri Chaitanya",
        period: "Completed",
        description: "91%"
    }
]

const Experience = () => {
    return (
        <section className="min-h-screen w-full py-20 px-6 md:px-20 relative z-10 pointer-events-none">
            <div className="pointer-events-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold mb-20 text-center"
                >
                    Journey & <span className="text-secondary">Education</span>
                </motion.h2>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Line - Space Gradient */}
                    <div className="absolute left-0 md:left-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />

                    {experiences.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`relative flex items-center justify-between mb-12 md:mb-24 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Empty Space for Grid alignment */}
                            <div className="hidden md:block w-5/12" />

                            {/* Dot - Glowing Planet Node */}
                            <div className="absolute left-[-8px] md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#000] border-4 border-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee] z-10" />

                            {/* Content Card - Space Glass */}
                            <div className="w-full md:w-5/12 pl-10 md:pl-0">
                                <div className="relative group p-[1px] rounded-2xl bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-cyan-500/50 hover:bg-gradient-to-r hover:from-cyan-400 hover:via-purple-400 hover:to-cyan-400 transition-all duration-500">
                                    <div className="bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl h-full relative overflow-hidden">
                                        {/* Subtle Grid Background */}
                                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-2 text-cyan-400">
                                                {item.type === 'work' ? <Briefcase size={20} /> : <GraduationCap size={20} />}
                                                <span className="text-sm font-semibold tracking-wider uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">{item.type}</span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-1 text-white group-hover:text-cyan-200 transition-colors">{item.title}</h3>
                                            <h4 className="text-lg text-purple-400 mb-4">{item.organization}</h4>
                                            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                                                <Calendar size={16} />
                                                <span>{item.period}</span>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed font-light">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Experience
