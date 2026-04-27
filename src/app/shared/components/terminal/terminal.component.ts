import {
  Component, AfterViewInit, ElementRef, ViewChild,
  Input, HostListener, OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TermEntry {
  type: 'input' | 'output';
  text?: string;
  lines?: string[];
  isError?: boolean;
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss'
})
export class TerminalComponent implements AfterViewInit, OnDestroy {
  @Input() title = '~';
  @Input() prompt = 'ahmad@portfolio:~$';
  @Input() defaultCommand = '';
  @Input() suggestions: string[] = [];
  @Input() processCommand!: (cmd: string) => { lines: string[]; isError?: boolean } | null;

  @ViewChild('termInput') inputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('termBody')  bodyRef!:  ElementRef<HTMLDivElement>;

  history: TermEntry[] = [];
  currentInput = '';
  isTyping = false;
  cmdHistory: string[] = [];
  historyIdx = -1;

  private blurTimer: any;

  ngAfterViewInit() {
    if (this.defaultCommand) {
      setTimeout(() => this.autoType(this.defaultCommand), 300);
    } else {
      setTimeout(() => this.focus(), 100);
    }
  }

  ngOnDestroy() {
    clearTimeout(this.blurTimer);
  }

  focus() {
    this.inputRef?.nativeElement.focus();
  }

  @HostListener('click')
  onHostClick() { this.focus(); }

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
      case 'Tab':
        e.preventDefault();
        this.tabComplete();
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

  onBlur() {
    this.blurTimer = setTimeout(() => {
      if (document.activeElement !== this.inputRef?.nativeElement) {
        // allow blur — don't auto-refocus after leaving terminal
      }
    }, 200);
  }

  autoType(cmd: string) {
    if (this.isTyping) return;
    this.isTyping = true;
    this.currentInput = '';
    let i = 0;
    const tick = () => {
      if (i < cmd.length) {
        this.currentInput += cmd[i++];
        setTimeout(tick, 48);
      } else {
        setTimeout(() => { this.isTyping = false; this.run(cmd); }, 280);
      }
    };
    tick();
  }

  private tabComplete() {
    if (!this.currentInput.trim()) return;
    const match = this.suggestions.find(s => s.startsWith(this.currentInput) && s !== this.currentInput);
    if (match) this.currentInput = match;
  }

  run(cmd: string) {
    const raw = cmd.trim();
    this.currentInput = '';
    this.historyIdx = -1;

    if (!raw) return;

    this.cmdHistory.unshift(raw);
    this.history.push({ type: 'input', text: raw });

    if (raw === 'clear') {
      this.history = [];
      setTimeout(() => this.scrollBottom(), 40);
      return;
    }

    const res = this.processCommand
      ? this.processCommand(raw)
      : { lines: [`${raw.split(/\s+/)[0]}: command not found`], isError: true };

    if (res) this.history.push({ type: 'output', lines: res.lines, isError: res.isError });

    setTimeout(() => this.scrollBottom(), 40);
  }

  private scrollBottom() {
    const el = this.bodyRef?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
