import { motion } from 'framer-motion';
import { AnimatedPage } from '../components/AnimatedPage';
import { Card } from '../components/ui/Card';
import { SkillBadge } from '../components/ui/SkillBadge';

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: ['C', 'Go', 'C++', 'Java', 'Python', 'JavaScript', 'HTML/CSS', 'SQL', 'C#', 'Rust'],
  },
  {
    title: 'Tools & Technologies',
    skills: ['Docker', 'Git', 'GitHub', 'AWS', 'Azure', 'Linux', 'VS Code', 'Postman'],
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['Gin', 'Angular', 'Node.js', 'Express.js', 'React', 'ASP.NET', 'Spring Boot'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function Skills() {
  return (
    <AnimatedPage className="skills-page">
      <section className="section">
        <div className="container">
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">
            Technologies and tools I've worked with throughout my journey as a developer.
          </p>

          <motion.div
            className="skills-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {skillCategories.map((category, categoryIndex) => (
              <motion.div key={category.title} variants={cardVariants}>
                <Card className="skill-card" hover={false}>
                  <h3 className="skill-category-title">{category.title}</h3>
                  <div className="skill-badges">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBadge
                        key={skill}
                        name={skill}
                        delay={categoryIndex * 0.1 + skillIndex * 0.05}
                      />
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  );
}
