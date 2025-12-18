import { motion } from 'framer-motion';
import { AnimatedPage } from '../components/AnimatedPage';
import { Card } from '../components/ui/Card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function About() {
  return (
    <AnimatedPage className="about-page">
      <section className="section">
        <div className="container">
          <h2 className="section-title">About Me</h2>

          <motion.div
            className="about-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card className="about-card main-bio">
                <h3>Who I Am</h3>
                <p>
                  I'm Ahmad Muhammadi, a dedicated Computer Science student with a deep passion
                  for software development. My journey in programming started with curiosity
                  about how things work, and has evolved into a commitment to crafting clean,
                  efficient, and impactful code.
                </p>
              </Card>
            </motion.div>

            <div className="about-grid">
              <motion.div variants={itemVariants}>
                <Card className="about-card">
                  <h3>Background</h3>
                  <p>
                    Currently pursuing my degree in Computer Science, I've developed a strong
                    foundation in algorithms, data structures, and software engineering principles.
                    I believe in continuous learning and staying updated with the latest
                    technologies and best practices.
                  </p>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="about-card">
                  <h3>Education</h3>
                  <p>
                    My academic journey has equipped me with both theoretical knowledge and
                    practical skills. From low-level systems programming to high-level
                    application development, I've explored various domains of computer science.
                  </p>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="about-card">
                  <h3>Interests</h3>
                  <p>
                    Beyond coding, I'm fascinated by systems programming, network protocols,
                    and building tools that solve real problems. I enjoy contributing to
                    open-source projects and collaborating with fellow developers.
                  </p>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="about-card">
                  <h3>Goals</h3>
                  <p>
                    My goal is to become a versatile software engineer capable of tackling
                    complex challenges. I aspire to work on projects that have a meaningful
                    impact and to never stop growing as a developer.
                  </p>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  );
}
