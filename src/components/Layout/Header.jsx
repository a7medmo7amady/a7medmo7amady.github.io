import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ahmad Muhammadi
          </motion.h1>
        </Link>
      </div>
    </header>
  );
}
