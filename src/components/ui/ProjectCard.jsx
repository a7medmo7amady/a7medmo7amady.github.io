import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

export function ProjectCard({ title, description, image, github, demo, technologies, delay = 0 }) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="project-image-container">
        <img src={image} alt={title} className="project-image" />
        <div className="project-overlay">
          <div className="project-links">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                aria-label="View on GitHub"
              >
                <Github size={20} />
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                aria-label="View live demo"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        {technologies && (
          <div className="project-tech">
            {technologies.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
