import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  active: number | null = null;

  toggle(i: number) {
    this.active = this.active === i ? null : i;
  }

  posts = [
    {
      cmd: 'cat building-http-server-in-c.md',
      date: '2025-03-14',
      title: 'Building an HTTP Server from Scratch in C',
      lines: [
        'Most programmers never touch raw sockets. They reach for Express,',
        'Flask, or FastAPI and move on. I wanted to understand what actually',
        'happens when a browser sends a GET request.',
        '',
        'So I built one — a full HTTP/1.0 server in C using POSIX sockets,',
        'fork() for concurrency, and zero external dependencies.',
        '',
        'Key things I learned:',
        '  → bind() + listen() + accept() is the whole server loop',
        '  → HTTP is just text over a socket — parse it yourself',
        '  → fork() per request is naive but teaches process isolation',
        '  → file descriptors are everything in Unix',
      ]
    },
    {
      cmd: 'cat adas-lane-detection-deep-dive.md',
      date: '2025-05-02',
      title: 'Lane Detection in ADAS: Canny Edges to Hough Lines',
      lines: [
        'For my ADAS project I had to implement lane detection without',
        'using a pre-trained neural net — just classical CV.',
        '',
        'The pipeline:',
        '  1. Grayscale → Gaussian blur (reduce noise)',
        '  2. Canny edge detection (find gradients)',
        '  3. Region of interest masking (ignore sky)',
        '  4. Hough transform (detect lines from edges)',
        '  5. Average + extrapolate to draw final lanes',
        '',
        'Surprising insight: most of the tuning work is in Canny thresholds.',
        'Too low = noise everywhere. Too high = you miss lane markings.',
        'There is no universal value — it depends on lighting conditions.',
      ]
    },
    {
      cmd: 'cat why-i-contribute-to-oss.md',
      date: '2025-07-20',
      title: 'Why I Started Contributing to Open Source',
      lines: [
        'Reading code is underrated. For a year I just cloned repos and',
        'read them — Go stdlib, Redis, SQLite. No PRs. Just reading.',
        '',
        'Then I found a bug in a small CLI tool I was using. The fix was',
        'three lines. I submitted a PR. It merged in two days.',
        '',
        'That was it. Three lines and suddenly I understood what open',
        'source actually means — it\'s not about heroic contributions,',
        'it\'s about a thousand tiny ones from people who actually use',
        'the software.',
        '',
        'Start small. Read more than you write. Show up consistently.',
      ]
    },
    {
      cmd: 'cat go-vs-c-systems-programming.md',
      date: '2025-11-08',
      title: 'Go vs C for Systems Work: An Honest Take',
      lines: [
        'After writing both a web server in C and several tools in Go,',
        'here is what I actually think:',
        '',
        'C gives you:',
        '  → Total control over memory layout',
        '  → Predictable performance (no GC pauses)',
        '  → Deep understanding of what the machine does',
        '',
        'Go gives you:',
        '  → Goroutines (M:N scheduling is genuinely great)',
        '  → Fast compile times and a good stdlib',
        '  → Easy concurrency without the footguns',
        '',
        'For learning: write C. For shipping: reach for Go.',
        'They are not competing — they teach different things.',
      ]
    },
  ];
}
