import { AnimatedPage } from '../components/AnimatedPage';
import { ProjectCard } from '../components/ui/ProjectCard';

const projects = [
  {
    title: 'Web Server Using C',
    description:
      'A lightweight HTTP/1.0 web server built from scratch in C. Features include handling GET requests, serving static files, and proper HTTP response formatting.',
    image: '/WebServer Using C.jpg',
    github: 'https://github.com/a7medmo7amady/WebServer-C',
    technologies: ['C', 'HTTP', 'Sockets', 'Linux'],
  },
  {
    title: 'Face Detection',
    description:
      'Real-time face detection application using Python and OpenCV. Implements computer vision algorithms to detect and track faces in video streams.',
    image: '/FaceDetection.jpg',
    github: 'https://github.com/a7medmo7amady/FaceDetection',
    technologies: ['Python', 'OpenCV', 'NumPy', 'Computer Vision'],
  },
];

export function Projects() {
  return (
    <AnimatedPage className="projects-page">
      <section className="section">
        <div className="container">
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">
            Here are some of the projects I've worked on. Each one represents a unique
            challenge and learning experience.
          </p>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                delay={index * 0.15}
              />
            ))}
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}
