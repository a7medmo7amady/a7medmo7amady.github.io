import { motion } from 'framer-motion';

export function SkillBadge({ name, delay = 0 }) {
  return (
    <motion.span
      className="skill-badge"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.05, backgroundColor: 'var(--accent)' }}
    >
      {name}
    </motion.span>
  );
}
