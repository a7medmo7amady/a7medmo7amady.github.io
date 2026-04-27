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

  cards = [
    { title: 'Background', text: 'Computer Science student with a passion for building things from scratch.' },
    { title: 'Interests', text: 'Systems programming, web development, networking, and open-source.' },
    { title: 'Goals', text: 'Becoming a versatile engineer who understands every layer of the stack.' },
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    );
    this.revealEls.forEach(el => observer.observe(el.nativeElement));
  }

  processCommand(cmd: string): { lines: string[]; isError?: boolean } | null {
    const base = cmd.trim().split(/\s+/)[0];
    switch (base) {
      case 'help':
        return { lines: [
          '',
          '  whoami     who I am',
          '  skills     tech stack',
          '  links      social & contact',
          '  neofetch   system info',
          '  clear      clear terminal',
          '',
        ]};
      case 'whoami':
        return { lines: [
          '',
          '  Ahmad Muhammadi',
          '  Software Engineer · CS Student',
          '',
          '  I build things close to the metal and for the web —',
          '  systems programming, networking, and full-stack.',
          '',
        ]};
      case 'skills':
        return { lines: [
          '',
          '  Languages    C · Go · Java · TypeScript · Python',
          '  Systems      POSIX · sockets · fork · mmap',
          '  Web          Angular · Node · REST · SQL',
          '  Tools        Git · Linux · Docker · Vim',
          '',
        ]};
      case 'links':
        return { lines: [
          '',
          '  GitHub    github.com/a7medmo7amady',
          '  Email     ahmedmohamady2005@gmail.com',
          '  Projects  /projects',
          '  Blog      /blog',
          '',
        ]};
      case 'neofetch':
        return { lines: [
          '',
          '       .\'.',
          '      / \\ \\      ahmad@portfolio',
          '     /   \\ \\     ───────────────',
          '    / /\\  \\ \\    OS: macOS-inspired dark',
          '   / / /\\  \\ \\   Host: Angular 19',
          '  /_/ /  \\  \\_\\  Shell: bash 5.2',
          '  \\_\\/    \\/_/   Theme: Terminal Green',
          '                 Stack: C · Go · TS · Java',
          '                 Focus: Systems + Web',
          '',
        ]};
      case 'clear':
        return null;
      default:
        return { lines: [`  ${base}: command not found. Try 'help'`], isError: true };
    }
  }
}
