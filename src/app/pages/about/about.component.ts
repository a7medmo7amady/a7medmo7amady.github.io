import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { TerminalComponent } from '../../shared/components/terminal/terminal.component';

@Component({
  selector: 'app-about',
  imports: [TerminalComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  suggestions = ['bio', 'stack', 'interests', 'education', 'clear'];
  defaultCommand = 'bio';

  ngAfterViewInit() {
    const obs = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    );
    this.revealEls.forEach(el => obs.observe(el.nativeElement));
  }

  processCommand(cmd: string): { lines: string[]; isError?: boolean } | null {
    const base = cmd.trim().split(/\s+/)[0];
    switch (base) {
      case 'help':
        return { lines: [
          '',
          '  bio          who I am',
          '  education    academic background',
          '  stack        languages & tools',
          '  interests    what I care about',
          '  clear        clear terminal',
          '',
        ]};

      case 'bio':
        return { lines: [
          '',
          "  Hi, I'm Ahmad Muhammadi — a Computer Science student",
          '  who builds things for fun and learning.',
          '',
          "  I'm interested in systems programming, compilers,",
          '  competitive programming, and open-source contribution.',
          '',
          '  I write C and Go because they make me think hard.',
          '  I ship full-stack projects to learn everything else.',
          '',
        ]};

      case 'education':
        return { lines: [
          '',
          '  Degree    B.Sc. Computer Science',
          '  Status    Undergraduate — in progress',
          '  Focus     Systems · Algorithms · Networks',
          '',
        ]};

      case 'stack':
        return { lines: [
          '',
          '  Primary     C · Go',
          '  Secondary   Java · TypeScript · Python',
          '  Web         Angular · Node.js · REST · SQL',
          '  Systems     POSIX · Sockets · Fork · Linux',
          '  Tools       Git · Docker · Vim · GDB',
          '',
        ]};

      case 'interests':
        return { lines: [
          '',
          '  → Systems programming & low-level computing',
          '  → Compilers and language design',
          '  → Competitive programming (CP)',
          '  → Open-source contribution',
          '  → Networking and distributed systems',
          '',
        ]};

      case 'clear':
        return null;

      default:
        return { lines: [`  ${base}: command not found — try 'help'`], isError: true };
    }
  }
}
