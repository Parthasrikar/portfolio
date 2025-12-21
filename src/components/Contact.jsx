import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, Twitter } from 'lucide-react'

const Contact = () => {
    return (
        <section className="min-h-screen w-full py-20 px-6 md:px-20 relative z-10 pb-40 pointer-events-none flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto pointer-events-auto"
            >
                {/* Holographic Card Container */}
                <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-cyan-500/30 via-transparent to-purple-500/30 overflow-hidden">
                    {/* Background glow effects */}
                    <div className="absolute top-0 left-1/4 w-full h-1/2 bg-cyan-500/10 blur-[100px]" />
                    <div className="absolute bottom-0 right-1/4 w-full h-1/2 bg-purple-500/10 blur-[100px]" />

                    <div className="bg-[#050505]/80 backdrop-blur-2xl p-10 md:p-16 rounded-3xl relative z-10">

                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                            Establish <span className="text-white">Connection</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                            Ready to launch your next project? Initialize communication channels below.
                        </p>

                        <form action="mailto:parthasrikar853@gmail.com" method="post" encType="text/plain" className="max-w-md mx-auto space-y-6 text-left">
                            <div className="group">
                                <label className="block text-xs font-mono text-cyan-400 mb-2 uppercase tracking-widest">Operator Name</label>
                                <input type="text" name="name" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-cyan-900/10 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300" placeholder="Enter identification" required />
                            </div>
                            <div className="group">
                                <label className="block text-xs font-mono text-purple-400 mb-2 uppercase tracking-widest">Signal Frequency (Email)</label>
                                <input type="email" name="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-purple-400 focus:bg-purple-900/10 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300" placeholder="name@domain.com" required />
                            </div>
                            <div className="group">
                                <label className="block text-xs font-mono text-cyan-400 mb-2 uppercase tracking-widest">Encryption Message</label>
                                <textarea name="message" rows="4" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-cyan-900/10 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300" placeholder="Transmitting data..." required></textarea>
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Initialize Transmission <Mail size={20} />
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </form>

                        <div className="flex justify-center gap-8 mt-16 border-t border-white/5 pt-10">
                            {[Linkedin, Github, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="p-4 bg-white/5 rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 hover:scale-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 border border-white/5">
                                    <Icon size={24} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Contact
