import { Github, Mail, MessageCircle } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a
            href="https://github.com/a7medmo7amady"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="mailto:a7medmo7amady@gmail.com"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://wa.me/+201154abortyourphonenumber"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <MessageCircle size={20} />
          </a>
        </div>
        <p className="footer-text">
          &copy; {currentYear} Ahmad Muhammadi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
