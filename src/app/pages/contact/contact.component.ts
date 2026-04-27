import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { TerminalComponent } from '../../shared/components/terminal/terminal.component';

@Component({
  selector: 'app-contact',
  imports: [TerminalComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  suggestions = ['contact', 'email', 'github', 'whatsapp', 'clear'];
  defaultCommand = 'contact';

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
          '  contact     show all contact info',
          '  email       email address',
          '  github      GitHub profile',
          '  whatsapp    WhatsApp number',
          '  clear       clear terminal',
          '',
        ]};

      case 'contact':
        return { lines: [
          '',
          '  ┌─────────────────────────────────────────────┐',
          '  │  Ahmad Muhammadi — Let\'s work together       │',
          '  ├─────────────────────────────────────────────┤',
          '  │  GitHub     →  github.com/a7medmo7amady     │',
          '  │  Email      →  ahmedmohamady2005@gmail.com  │',
          '  │  WhatsApp   →  +20 103 066 4169             │',
          '  └─────────────────────────────────────────────┘',
          '',
          "  I'm open to freelance work, internships,",
          '  and interesting projects. Don\'t hesitate to reach out.',
          '',
        ]};

      case 'email':
        return { lines: [
          '',
          '  ahmedmohamady2005@gmail.com',
          '',
          '  mailto:ahmedmohamady2005@gmail.com',
          '',
        ]};

      case 'github':
        return { lines: [
          '',
          '  github.com/a7medmo7amady',
          '',
        ]};

      case 'whatsapp':
        return { lines: [
          '',
          '  +20 103 066 4169',
          '  wa.me/201030664169',
          '',
        ]};

      case 'clear':
        return null;

      default:
        return { lines: [`  ${base}: command not found — try 'help'`], isError: true };
    }
  }
}
