import { motion } from 'framer-motion';

export function Card({ children, className = '', delay = 0, hover = true }) {
  return (
    <motion.div
      className={`card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, boxShadow: 'var(--shadow-lg)' } : {}}
    >
      {children}
    </motion.div>
  );
}
