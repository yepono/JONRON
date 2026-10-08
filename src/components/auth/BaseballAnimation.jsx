// src/components/auth/BaseballAnimation.jsx
import { motion } from 'framer-motion';

export default function BaseballAnimation() {
    return (
        <div className="flex flex-col items-center justify-center my-1 relative h-36 w-full overflow-visible select-none pointer-events-none">

            {/* Pelota con ciclo completo de rebote y amortiguación de impacto */}
            <motion.div
                animate={{
                    y: [-24, 18, -24],
                    scaleY: [1, 0.88, 1],
                    scaleX: [1, 1.12, 1],
                }}
                transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="relative z-10 flex items-center justify-center"
            >
                <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    viewBox="0 0 100 100"
                    className="w-16 h-16 drop-shadow-lg"
                >
                    {/* Sombreado de textura esférica */}
                    <defs>
                        <radialGradient id="ballShine" cx="35%" cy="30%" r="65%">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="75%" stopColor="#F8FAFC" />
                            <stop offset="100%" stopColor="#CBD5E1" />
                        </radialGradient>
                    </defs>

                    {/* Esfera */}
                    <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="url(#ballShine)"
                        stroke="#94A3B8"
                        strokeWidth="1.5"
                    />

                    {/* Costura izquierda */}
                    <path
                        d="M 27 10 A 44 44 0 0 1 27 90"
                        fill="none"
                        stroke="#DC2626"
                        strokeWidth="3.5"
                        strokeDasharray="4 3"
                    />

                    {/* Costura derecha */}
                    <path
                        d="M 73 10 A 44 44 0 0 0 73 90"
                        fill="none"
                        stroke="#DC2626"
                        strokeWidth="3.5"
                        strokeDasharray="4 3"
                    />
                </motion.svg>
            </motion.div>

            {/* Sombra proyectada coordinada */}
            <motion.div
                animate={{
                    scale: [0.65, 1.25, 0.65],
                    opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="w-14 h-2.5 bg-slate-400 rounded-full blur-[3px] absolute bottom-3"
            />
        </div>
    );
}