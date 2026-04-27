import { Component, AfterViewInit, ElementRef, ViewChild, Input, HostListener } from '@angular/core';

export interface TermEntry {
  type: 'input' | 'output';
  text?: string;
  lines?: string[];
  isError?: boolean;
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss'
})
export class TerminalComponent implements AfterViewInit {
  @Input() title: string = '~';
  @Input() defaultPrompt: string = 'ahmad@portfolio:~$';
  @Input() defaultCommand: string = '';
  @Input() processCommand!: (cmd: string) => { lines: string[]; isError?: boolean } | null;

  @ViewChild('termInput') inputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('termBody')  bodyRef!:  ElementRef<HTMLDivElement>;

  history: TermEntry[] = [];
  currentInput = '';
  isTyping = false;
  cmdHistory: string[] = [];
  historyIdx = -1;
  hasRunDefault = false;

  ngAfterViewInit() {
    if (this.defaultCommand) {
      setTimeout(() => this.autoType(this.defaultCommand), 150);
    } else {
      setTimeout(() => this.focus(), 120);
    }
  }

  focus() {
    this.inputRef?.nativeElement.focus();
  }

  @HostListener('click')
  onHostClick() {
    this.focus();
  }

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
        setTimeout(tick, 50);
      } else {
        setTimeout(() => { 
          this.isTyping = false; 
          this.run(cmd, true); 
        }, 300);
      }
    };
    tick();
  }

  private run(cmd: string, isDefault = false) {
    const raw = cmd.trim();
    this.currentInput = '';
    this.historyIdx = -1;
    
    let res: { lines: string[]; isError?: boolean } | null = null;
    if (raw && this.processCommand) {
      this.cmdHistory.unshift(raw);
      res = this.processCommand(raw);
    } else if (raw) {
       this.cmdHistory.unshift(raw);
       res = { lines: [`${raw.split(/\s+/)[0]}: command not found`], isError: true };
    }

    if (raw === 'clear' || (res === null && raw)) {
       this.history = [];
       if (isDefault) this.hasRunDefault = true;
       return;
    }

    // Unshift the output first, then the input, so that the input is above the output.
    if (res) {
       this.history.unshift({ type: 'output', lines: res.lines, isError: res.isError });
    }
    this.history.unshift({ type: 'input', text: raw });

    if (isDefault) {
      this.hasRunDefault = true;
    }
  }
}
