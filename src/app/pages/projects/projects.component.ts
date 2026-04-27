import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';

import { TerminalComponent } from '../../shared/components/terminal/terminal.component';

@Component({
  selector: 'app-projects',
  imports: [TerminalComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    this.revealEls.forEach((el: ElementRef) => observer.observe(el.nativeElement));
  }

  projects = [
    {
      num: '01',
      title: 'Advanced Driver Assistance',
      description: 'ADAS system implementing lane detection, object recognition, and real-time collision warning using computer vision pipelines.',
      tags: ['C++', 'Python', 'OpenCV', 'Computer Vision', 'ADAS'],
      github: 'https://github.com/a7medmo7amady/Advanced-Driver-Assistance-Systems'
    },
    {
      num: '02',
      title: 'Web Server using C',
      description: 'An HTTP/1.0 web server built from scratch in C using raw POSIX sockets, fork-based concurrency, and Linux system calls.',
      tags: ['C', 'HTTP', 'POSIX Sockets', 'Linux', 'Systems'],
      github: 'https://github.com/a7medmo7amady/Web-Server-using-C'
    },
    {
      num: '03',
      title: 'Reddit Clone',
      description: 'Full-stack Reddit-style platform with post voting, nested comments, subreddits, and user authentication.',
      tags: ['Full-Stack', 'REST API', 'Auth', 'Database'],
      github: 'https://github.com/a7medmo7amady/Reddit'
    },
    {
      num: '04',
      title: 'ClipSphere',
      description: 'Video sharing and clip management platform with upload, playback, and social interaction features.',
      tags: ['Web', 'Video', 'Cloud', 'API'],
      github: 'https://github.com/a7medmo7amady/ClipSphere'
    },
    {
      num: '05',
      title: 'NextGate',
      description: 'API gateway and routing layer with request proxying, rate limiting, and middleware pipeline architecture.',
      tags: ['Gateway', 'Networking', 'Middleware', 'API'],
      github: 'https://github.com/a7medmo7amady/NextGate'
    },
    {
      num: '06',
      title: 'FloosFlow',
      description: 'Personal finance tracker for managing expenses, income streams, and budgets with visual analytics.',
      tags: ['Finance', 'Analytics', 'Dashboard', 'Full-Stack'],
      github: 'https://github.com/AliAshraf69420/FloosFlow'
    }
  ];
}
