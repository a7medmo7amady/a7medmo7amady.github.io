import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { TerminalComponent } from '../../shared/components/terminal/terminal.component';

interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
}

@Component({
  selector: 'app-projects',
  imports: [TerminalComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  suggestions = ['ls', 'cat adas', 'cat webserver', 'cat reddit', 'cat clipsphere', 'clear'];
  defaultCommand = 'ls';

  private projects: Project[] = [
    {
      slug: 'adas',
      title: 'Advanced Driver Assistance',
      description: 'ADAS system implementing lane detection, object recognition, and real-time collision warning using computer vision pipelines.',
      tags: ['C++', 'Python', 'OpenCV', 'Computer Vision'],
      github: 'https://github.com/a7medmo7amady/Advanced-Driver-Assistance-Systems'
    },
    {
      slug: 'webserver',
      title: 'Web Server using C',
      description: 'HTTP/1.0 web server built from scratch in C using raw POSIX sockets, fork-based concurrency, and Linux system calls.',
      tags: ['C', 'HTTP', 'POSIX Sockets', 'Linux'],
      github: 'https://github.com/a7medmo7amady/Web-Server-using-C'
    },
    {
      slug: 'reddit',
      title: 'Reddit Clone',
      description: 'Full-stack Reddit-style platform with post voting, nested comments, subreddits, and user authentication.',
      tags: ['Full-Stack', 'REST API', 'Auth', 'Database'],
      github: 'https://github.com/a7medmo7amady/Reddit'
    },
    {
      slug: 'clipsphere',
      title: 'ClipSphere',
      description: 'Video sharing and clip management platform with upload, playback, and social interaction features.',
      tags: ['Web', 'Video', 'Cloud', 'API'],
      github: 'https://github.com/a7medmo7amady/ClipSphere'
    },
    {
      slug: 'nextgate',
      title: 'NextGate',
      description: 'API gateway and routing layer with request proxying, rate limiting, and middleware pipeline architecture.',
      tags: ['Gateway', 'Networking', 'Middleware'],
      github: 'https://github.com/a7medmo7amady/NextGate'
    },
    {
      slug: 'floosflow',
      title: 'FloosFlow',
      description: 'Personal finance tracker for managing expenses, income streams, and budgets with visual analytics.',
      tags: ['Finance', 'Analytics', 'Full-Stack'],
      github: 'https://github.com/AliAshraf69420/FloosFlow'
    },
  ];

  ngAfterViewInit() {
    const obs = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    this.revealEls.forEach(el => obs.observe(el.nativeElement));
  }

  processCommand(cmd: string): { lines: string[]; isError?: boolean } | null {
    const [base, ...args] = cmd.trim().split(/\s+/);

    switch (base) {
      case 'help':
        return { lines: [
          '',
          '  ls              list all projects',
          '  cat <slug>      view project details',
          '  open <slug>     print GitHub URL',
          '  clear           clear terminal',
          '',
          '  Slugs: adas · webserver · reddit · clipsphere · nextgate · floosflow',
          '',
        ]};

      case 'ls':
        return { lines: [
          '',
          ...this.projects.map((p, i) => {
            const num = String(i + 1).padStart(2, '0');
            const slug = p.slug.padEnd(12);
            return `  ${num}  ${slug}  ${p.title}`;
          }),
          '',
          `  ${this.projects.length} projects total — type 'cat <slug>' to read more`,
          '',
        ]};

      case 'cat': {
        const slug = args[0];
        if (!slug) return { lines: ['  cat: missing slug — try \'ls\' first'], isError: true };
        const p = this.projects.find(x => x.slug === slug);
        if (!p) return { lines: [`  cat: '${slug}' not found — try 'ls'`], isError: true };
        return { lines: [
          '',
          `  # ${p.title}`,
          '',
          `  ${p.description}`,
          '',
          `  Tags    ${p.tags.join(' · ')}`,
          `  GitHub  ${p.github}`,
          '',
        ]};
      }

      case 'open': {
        const slug = args[0];
        if (!slug) return { lines: ['  open: missing slug'], isError: true };
        const p = this.projects.find(x => x.slug === slug);
        if (!p) return { lines: [`  open: '${slug}' not found`], isError: true };
        window.open(p.github, '_blank', 'noopener');
        return { lines: ['', `  Opening ${p.github} ...`, ''] };
      }

      case 'clear':
        return null;

      default:
        return { lines: [`  ${base}: command not found — try 'help'`], isError: true };
    }
  }
}
