import { motion } from 'framer-motion';
import { Github, Mail, MessageCircle, MapPin, Send } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { Card } from '../components/ui/Card';

const contactMethods = [
  {
    icon: Github,
    label: 'GitHub',
    value: 'a7medmo7amady',
    href: 'https://github.com/a7medmo7amady',
    color: '#6e7681',
  },
  {
    icon: Mail,
    label: 'Email',
    // value: 'Email Me'
    href: 'mailto:ahmedmohamady2005@gmail.com',
    color: '#EA4335',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Send a message',
    href: 'https://wa.me/+201030664169',
    color: '#25D366',
  },
];

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

export function Contact() {
  return (
    <AnimatedPage className="contact-page">
      <section className="section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            I'm always open to new opportunities and collaborations.
            Feel free to reach out through any of the channels below.
          </p>

          <motion.div
            className="contact-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {contactMethods.map((method) => (
              <motion.div key={method.label} variants={itemVariants}>
                <a
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <Card className="contact-card">
                    <div
                      className="contact-icon"
                      style={{ '--icon-color': method.color }}
                    >
                      <method.icon size={28} />
                    </div>
                    <h3 className="contact-label">{method.label}</h3>
                    <p className="contact-value">{method.value}</p>
                  </Card>
                </a>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="contact-cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Card className="cta-card">
              <Send size={32} className="cta-icon" />
              <h3>Let's Work Together</h3>
              <p>
                Have a project in mind or just want to chat? I'd love to hear from you.
                Drop me a message and I'll get back to you as soon as possible.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  );
}
