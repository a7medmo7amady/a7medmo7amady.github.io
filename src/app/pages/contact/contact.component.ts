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

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    );
    this.revealEls.forEach(el => observer.observe(el.nativeElement));
  }

  contacts = [
    { label: 'GitHub',   value: 'a7medmo7amady',              href: 'https://github.com/a7medmo7amady', color: '#6e7681', logo: 'https://cdn.simpleicons.org/github/ffffff' },
    { label: 'Email',    value: 'ahmedmohamady2005@gmail.com', href: 'mailto:ahmedmohamady2005@gmail.com', color: '#EA4335', logo: 'https://cdn.simpleicons.org/gmail/EA4335' },
    { label: 'WhatsApp', value: '+20 103 066 4169',            href: 'https://wa.me/201030664169',        color: '#25D366', logo: 'https://cdn.simpleicons.org/whatsapp/25D366' },
  ];
}
