import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TerminalComponent } from '../../shared/components/terminal/terminal.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TerminalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  suggestions = ['neofetch', 'whoami', 'skills', 'links', 'clear'];
  defaultCommand = 'neofetch';

  ngAfterViewInit() {
    const obs = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    );
    this.revealEls.forEach(el => obs.observe(el.nativeElement));
  }

  processCommand(cmd: string): { lines: string[]; isError?: boolean } | null {
    const [base, ...args] = cmd.trim().split(/\s+/);
    switch (base) {
      case 'help':
        return { lines: [
          '',
          '  neofetch   system info',
          '  whoami     about me',
          '  skills     tech stack',
          '  links      social & contact',
          '  clear      clear terminal',
          '',
        ]};

      case 'neofetch':
        return { lines: [
          '',
          "        .-.",
          "       (o o)      ahmad@portfolio",
          "       | O |      ──────────────────────",
          "        `-'       OS:      macOS-inspired dark",
          "       _|||_      Host:    Angular 19",
          "      (_/ \\_)     Shell:   bash 5.2",
          '                  Theme:   Terminal Green',
          '                  Stack:   C · Go · TS · Java',
          '                  Focus:   Systems + Web',
          '                  Status:  Open to work',
          '',
        ]};

      case 'whoami':
        return { lines: [
          '',
          '  Ahmad Muhammadi',
          '  Software Engineer & CS Student',
          '',
          '  I build things close to the metal and for the web.',
          '  Systems programming, networking, and full-stack dev.',
          '',
        ]};

      case 'skills':
        return { lines: [
          '',
          '  Languages   C · Go · Java · TypeScript · Python',
          '  Systems     POSIX · Sockets · Fork · Memory mgmt',
          '  Web         Angular · Node.js · REST · PostgreSQL',
          '  Tools       Git · Linux · Docker · Vim',
          '',
        ]};

      case 'links':
        return { lines: [
          '',
          '  GitHub    →  github.com/a7medmo7amady',
          '  Email     →  ahmedmohamady2005@gmail.com',
          '  Projects  →  /projects',
          '  Blog      →  /blog',
          '',
        ]};

      case 'clear':
        return null;

      default:
        return { lines: [`  ${base}: command not found — try 'help'`], isError: true };
    }
  }
}
