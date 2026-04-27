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

  @ViewChild('ghostInput') ghostRef!: ElementRef<HTMLInputElement>;
  @ViewChild('termBody')   bodyRef!:  ElementRef<HTMLDivElement>;

  history: TermEntry[] = [];
  currentInput = '';
  isTyping = false;
  cmdHistory: string[] = [];
  historyIdx = -1;

  private autoTypeTimer: any;

  ngAfterViewInit() {
    if (this.defaultCommand) {
      setTimeout(() => this.autoType(this.defaultCommand), 250);
    } else {
      setTimeout(() => this.focus(), 100);
    }
  }

  ngOnDestroy() {
    clearTimeout(this.autoTypeTimer);
  }

  // Focus the hidden input — called on any click inside the terminal
  focus() {
    this.ghostRef?.nativeElement.focus();
  }

  @HostListener('click')
  onHostClick() { this.focus(); }

  // ── All CHARACTER input (typing, paste, backspace, IME) ──
  // Let the browser handle the native input event — it's always correct
  onNativeInput(e: Event) {
    const ghost = e.target as HTMLInputElement;
    if (this.isTyping) {
      // Block user input while autoTyping
      ghost.value = '';
      return;
    }
    this.currentInput = ghost.value;
  }

  // ── Special keys only (Enter, arrows, Tab) ──
  onKeydown(e: KeyboardEvent) {
    const ghost = this.ghostRef?.nativeElement;

    if (this.isTyping) {
      if (e.key !== 'Escape') e.preventDefault();
      return;
    }

    switch (e.key) {
      case 'Enter': {
        e.preventDefault();
        const toRun = this.currentInput;
        this.currentInput = '';
        if (ghost) ghost.value = '';
        this.run(toRun);
        break;
      }
      case 'Tab': {
        e.preventDefault();
        this.tabComplete();
        if (ghost) ghost.value = this.currentInput;
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        if (this.historyIdx < this.cmdHistory.length - 1)
          this.currentInput = this.cmdHistory[++this.historyIdx];
        if (ghost) ghost.value = this.currentInput;
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        if (this.historyIdx > 0) {
          this.currentInput = this.cmdHistory[--this.historyIdx];
        } else {
          this.historyIdx = -1;
          this.currentInput = '';
        }
        if (ghost) ghost.value = this.currentInput;
        break;
      }
      case 'l': {
        if (e.ctrlKey) { e.preventDefault(); this.history = []; }
        break;
      }
      // All other keys (including Backspace, Delete) fall through to
      // the native input, then onNativeInput updates currentInput
    }
  }

  // Called by pill buttons — activates and auto-types
  autoType(cmd: string) {
    if (this.isTyping) return;
    this.isTyping = true;
    this.currentInput = '';
    const ghost = this.ghostRef?.nativeElement;
    if (ghost) ghost.value = '';

    let i = 0;
    const tick = () => {
      if (i < cmd.length) {
        this.currentInput += cmd[i++];
        this.autoTypeTimer = setTimeout(tick, 32);
      } else {
        this.autoTypeTimer = setTimeout(() => {
          this.isTyping = false;
          const g = this.ghostRef?.nativeElement;
          if (g) { g.value = ''; g.focus(); }
          this.run(cmd);
        }, 160);
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
    const partial = this.currentInput.trim().toLowerCase();
    if (!partial) return;
    const match = this.suggestions.find(
      s => s.toLowerCase().startsWith(partial) && s.toLowerCase() !== partial
    );
    if (match) this.currentInput = match;
  }

  private scrollBottom() {
    const el = this.bodyRef?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
