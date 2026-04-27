import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { TerminalComponent } from '../../shared/components/terminal/terminal.component';

@Component({
  selector: 'app-blog',
  imports: [TerminalComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements AfterViewInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;
  @ViewChild(TerminalComponent) term!: TerminalComponent;

  suggestions = ['help', 'ls', 'whoami', 'cat adas.md', 'cat webserver.md', 'cat oss.md', 'cat go-vs-c.md', 'clear'];

  autoType(s: string) {
    if (this.term) this.term.autoType(s);
  }

  private posts: Record<string, { title: string; date: string; lines: string[] }> = {
    'adas.md': {
      title: 'Lane Detection in ADAS: Canny Edges to Hough Lines',
      date: '2025-05-02',
      lines: [
        'Implemented lane detection without any pre-trained model — classical CV only.',
        '',
        'Pipeline:',
        '  1. Grayscale → Gaussian blur    (reduce noise)',
        '  2. Canny edge detection         (find gradients)',
        '  3. Region-of-interest masking   (ignore sky)',
        '  4. Hough transform              (detect lines from edges)',
        '  5. Average + extrapolate        (draw final lanes)',
        '',
        'Key insight: most tuning work is in Canny thresholds.',
        'Too low = noise everywhere. Too high = missed lane markings.',
      ]
    },
    'webserver.md': {
      title: 'Building an HTTP Server from Scratch in C',
      date: '2025-03-14',
      lines: [
        'Most programmers never touch raw sockets. I wanted to understand',
        'what actually happens when a browser sends a GET request.',
        '',
        '  → bind() + listen() + accept()  is the whole server loop',
        '  → HTTP is just text over a TCP socket — parse it yourself',
        '  → fork() per request teaches process isolation cleanly',
        '  → file descriptors are everything in Unix',
      ]
    },
    'oss.md': {
      title: 'Why I Started Contributing to Open Source',
      date: '2025-07-20',
      lines: [
        'For a year I just cloned repos and read them.',
        'Go stdlib, Redis, SQLite. No PRs. Just reading.',
        '',
        'Then I found a bug. The fix was three lines.',
        'It merged in two days. That was it.',
        '',
        'Start small. Read more than you write. Show up consistently.',
      ]
    },
    'go-vs-c.md': {
      title: 'Go vs C for Systems Work: An Honest Take',
      date: '2025-11-08',
      lines: [
        'C gives you:',
        '  → Total memory control + predictable performance (no GC)',
        '  → Deep understanding of what the machine actually does',
        '',
        'Go gives you:',
        '  → Goroutines — M:N scheduling is genuinely excellent',
        '  → Fast compile + rich stdlib + safe concurrency',
        '',
        'For learning: write C. For shipping: reach for Go.',
        'They teach different things — not competing.',
      ]
    }
  };

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    );
    this.revealEls.forEach((el: ElementRef) => observer.observe(el.nativeElement));
  }

  processCommand(cmd: string): { lines: string[]; isError?: boolean } | null {
    const [base, ...args] = cmd.trim().split(/\s+/);
    switch (base) {
      case 'help':
        return { lines: [
          '',
          '  ls              list blog posts',
          '  cat <file>      read a post',
          '  whoami          about me',
          '  date            current date/time',
          '  clear           clear terminal',
          '',
        ]};
      case 'ls':
        return { lines: ['', ...Object.keys(this.posts).map(f => `  ${f}`), ''] };
      case 'whoami':
        return { lines: [
          '',
          '  Ahmad Muhammadi',
          '  CS student · systems programmer · OSS contributor',
          '  github.com/a7medmo7amady',
          '',
        ]};
      case 'date':
        return { lines: ['', '  ' + new Date().toUTCString(), ''] };
      case 'clear':
        return null;
      case 'cat': {
        const file = args[0];
        if (!file) return { lines: ['cat: missing operand'], isError: true };
        const post = this.posts[file];
        if (!post) return { lines: [`cat: ${file}: No such file or directory`], isError: true };
        return { lines: ['', `  # ${post.title}`, `  # ${post.date}`, '', ...post.lines.map(l => l ? '  ' + l : ''), ''] };
      }
      default:
        return { lines: [`  ${base}: command not found`], isError: true };
    }
  }
}
