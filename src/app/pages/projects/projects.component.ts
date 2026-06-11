import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';

interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
}

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  projects: Project[] = [
    {
      slug: 'reddit',
      title: 'Reddit Clone',
      description: 'Full-stack Reddit-style platform with post voting, nested comments, subreddits, and JWT-based user authentication.',
      tags: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'REST API'],
      github: 'https://github.com/a7medmo7amady/Reddit'
    },
    {
      slug: 'clipsphere',
      title: 'ClipSphere',
      description: 'Video sharing and clip management platform with upload, streaming playback, and social interaction features.',
      tags: ['Next.js', 'TypeScript', 'Cloud', 'Video API'],
      github: 'https://github.com/a7medmo7amady/ClipSphere'
    },
    {
      slug: 'floosflow',
      title: 'FloosFlow',
      description: 'Personal finance tracker for managing expenses, income streams, and budgets with visual analytics dashboards.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Analytics'],
      github: 'https://github.com/AliAshraf69420/FloosFlow'
    },
    {
      slug: 'adas',
      title: 'Advanced Driver Assistance',
      description: 'ADAS system implementing lane detection, object recognition, and real-time collision warning using computer vision pipelines.',
      tags: ['C++', 'Python', 'OpenCV', 'Computer Vision'],
      github: 'https://github.com/a7medmo7amady/Advanced-Driver-Assistance-Systems'
    },
    {
      slug: 'webserver',
      title: 'Web Server in C',
      description: 'HTTP/1.0 web server built from scratch in C using raw POSIX sockets, fork-based concurrency, and Linux system calls.',
      tags: ['C', 'HTTP', 'POSIX', 'Linux'],
      github: 'https://github.com/a7medmo7amady/Web-Server-using-C'
    },
    {
      slug: 'nextgate',
      title: 'NextGate',
      description: 'API gateway with request proxying, rate limiting, and a composable middleware pipeline.',
      tags: ['Go', 'Gin', 'Networking', 'Middleware'],
      github: 'https://github.com/a7medmo7amady/NextGate'
    },
  ];

  ngAfterViewInit() {
    const obs = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    this.revealEls.forEach(el => obs.observe(el.nativeElement));
  }
}
