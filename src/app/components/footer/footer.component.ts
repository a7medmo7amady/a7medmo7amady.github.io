import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <p>© {{ year }} Ahmad Muhammadi · Built with Angular</p>
    </footer>
  `,
  styles: [`
    footer {
      text-align: center;
      padding: 1.5rem;
      border-top: 1px solid var(--border);
      color: var(--muted);
      font-size: 0.62rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
