import {
  Component, AfterViewInit, ElementRef, ViewChild,
  Input, HostListener, OnDestroy, NgZone
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

  @ViewChild('termBody') bodyRef!: ElementRef<HTMLDivElement>;

  history: TermEntry[] = [];
  currentInput = '';
  isTyping = false;
  isActive = false;
  cmdHistory: string[] = [];
  historyIdx = -1;

  private autoTypeTimer: any;

  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    // Activate and start default command after a short delay
    setTimeout(() => {
      this.isActive = true;
      if (this.defaultCommand) {
        this.autoType(this.defaultCommand);
      }
    }, 200);
  }

  ngOnDestroy() {
    clearTimeout(this.autoTypeTimer);
  }

  // ── Activate this terminal when clicked ──
  @HostListener('click', ['$event'])
  onTerminalClick(e: MouseEvent) {
    this.isActive = true;
    e.stopPropagation();
  }

  // ── Deactivate when anything outside is clicked ──
  @HostListener('document:click')
  onDocumentClick() {
    this.isActive = false;
  }

  // ── All keyboard input goes through document ──
  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(e: KeyboardEvent) {
    if (!this.isActive) return;
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
        this.historyIdx > 0
          ? (this.currentInput = this.cmdHistory[--this.historyIdx])
          : (this.historyIdx = -1, this.currentInput = '');
        break;

      case 'l':
        if (e.ctrlKey) { e.preventDefault(); this.history = []; }
        break;

      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey)
          this.currentInput += e.key;
    }
  }

  // Called by pill buttons — activates this terminal then types
  autoType(cmd: string) {
    this.isActive = true;
    if (this.isTyping) return;
    this.isTyping = true;
    this.currentInput = '';
    let i = 0;

    const tick = () => {
      if (i < cmd.length) {
        this.currentInput += cmd[i++];
        this.autoTypeTimer = setTimeout(tick, 30);
      } else {
        this.autoTypeTimer = setTimeout(() => {
          this.isTyping = false;
          this.run(cmd);
        }, 180);
      }
    };

    tick();
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
      return;
    }

    const res = this.processCommand
      ? this.processCommand(raw)
      : { lines: [`  ${raw.split(/\s+/)[0]}: command not found`], isError: true };

    if (res) this.history.push({ type: 'output', lines: res.lines, isError: res.isError });

    setTimeout(() => this.scrollBottom(), 20);
  }

  private tabComplete() {
    const partial = this.currentInput.trim();
    if (!partial) return;
    const match = this.suggestions.find(
      s => s.toLowerCase().startsWith(partial.toLowerCase()) && s !== partial
    );
    if (match) this.currentInput = match;
  }

  private scrollBottom() {
    const el = this.bodyRef?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
