import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedPage } from '../components/AnimatedPage';
import { Button } from '../components/ui/Button';

export function Home() {
  return (
    <AnimatedPage className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <motion.div
              className="hero-image-wrapper"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img src="/Me.jpeg" alt="Ahmad Muhammadi" className="hero-image" />
              <div className="hero-image-glow"></div>
            </motion.div>

            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="hero-greeting">Hi, I'm</span>
              <h1 className="hero-title">Ahmad Muhammadi</h1>
              <p className="hero-subtitle">
                A passionate <span className="text-gradient">Software Developer</span> focused on building
                exceptional digital experiences with clean code and modern technologies.
              </p>

              <div className="hero-actions">
                <Link to="/projects">
                  <Button variant="primary">
                    View My Work
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="secondary">
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section intro-section">
        <div className="container">
          <motion.div
            className="intro-grid"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="intro-card">
              <h3>Background</h3>
              <p>
                Computer Science student with a passion for software development
                and a strong foundation in multiple programming languages.
              </p>
            </div>
            <div className="intro-card">
              <h3>Interests</h3>
              <p>
                Systems programming, web development, and exploring new technologies.
                I enjoy solving complex problems with elegant solutions.
              </p>
            </div>
            <div className="intro-card">
              <h3>Goals</h3>
              <p>
                To become a skilled software engineer and contribute to impactful
                projects that make a difference in people's lives.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  );
}
