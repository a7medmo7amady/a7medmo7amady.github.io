import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Entry {
  type: 'input' | 'output';
  text?: string;
  lines?: string[];
  isError?: boolean;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;
  @ViewChild('termInput') inputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('termBody')  bodyRef!:  ElementRef<HTMLDivElement>;

  history: Entry[] = [];
  currentInput = '';
  isTyping = false;
  cmdHistory: string[] = [];
  historyIdx = -1;

  suggestions = ['whoami', 'skills', 'links', 'neofetch', 'clear'];

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    );
    this.revealEls.forEach(el => observer.observe(el.nativeElement));

    this.pushOutput(["Type a command or click a suggestion above. Try 'neofetch'."]);
    setTimeout(() => this.focus(), 120);
  }

  focus() { this.inputRef?.nativeElement.focus(); }

  onKeydown(e: KeyboardEvent) {
    if (this.isTyping) { e.preventDefault(); return; }
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        this.run(this.currentInput);
        break;
      case 'Backspace':
        e.preventDefault();
        this.currentInput = this.currentInput.slice(0, -1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (this.historyIdx < this.cmdHistory.length - 1)
          this.currentInput = this.cmdHistory[++this.historyIdx];
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (this.historyIdx > 0) this.currentInput = this.cmdHistory[--this.historyIdx];
        else { this.historyIdx = -1; this.currentInput = ''; }
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey)
          this.currentInput += e.key;
    }
  }

  autoType(cmd: string) {
    if (this.isTyping) return;
    this.isTyping = true;
    this.currentInput = '';
    let i = 0;
    const tick = () => {
      if (i < cmd.length) {
        this.currentInput += cmd[i++];
        setTimeout(tick, 55);
      } else {
        setTimeout(() => { this.isTyping = false; this.run(cmd); }, 320);
      }
    };
    tick();
  }

  private run(cmd: string) {
    const raw = cmd.trim();
    this.history.push({ type: 'input', text: raw });
    this.currentInput = '';
    this.historyIdx = -1;
    if (raw) {
      this.cmdHistory.unshift(raw);
      const res = this.process(raw);
      if (res) this.pushOutput(res.lines, res.isError);
    }
    setTimeout(() => this.scrollBottom(), 40);
  }

  private process(cmd: string): { lines: string[]; isError?: boolean } | null {
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
        this.history = [];
        return null;
      default:
        return { lines: [`  ${base}: command not found. Try 'help'`], isError: true };
    }
  }

  private pushOutput(lines: string[], isError = false) {
    this.history.push({ type: 'output', lines, isError });
  }

  private scrollBottom() {
    const el = this.bodyRef?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
