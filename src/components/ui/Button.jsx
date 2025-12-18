import { motion } from 'framer-motion';

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  ...props
}) {
  const baseClass = `btn btn-${variant} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClass}
        target="_blank"
        rel="noopener noreferrer"
        {...motionProps}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={baseClass}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
}
