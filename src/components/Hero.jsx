import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'

const Hero = () => {
    return (
        <section className="h-screen w-full flex flex-col justify-center px-6 md:px-20 z-10 pointer-events-none max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl pointer-events-auto"
            >
                <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
                    Hi, I'm <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-cyan-400 inline-block hover:scale-110 transition-transform cursor-pointer"
                    >
                        Partha
                    </motion.span>
                </h1>

                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-4xl md:text-6xl font-semibold mb-6"
                >
                    I'm a Full-Stack <span className="text-cyan-400">Developer</span>
                </motion.h2>

                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
                    MERN, Next.js, and LangChain developer passionate about building scalable applications and cloud-native solutions.
                </p>

                <div className="flex gap-4">
                    <button className="px-8 py-4 bg-cyan-400 text-black font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 flex items-center gap-2">
                        View Work <ArrowDown size={20} />
                    </button>
                    <button className="px-8 py-4 bg-transparent border border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2">
                        Resume <Download size={20} />
                    </button>
                </div>
            </motion.div>
        </section>
    )
}

export default Hero
