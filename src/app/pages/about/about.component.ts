import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    );
    this.revealEls.forEach(el => observer.observe(el.nativeElement));
  }

  cards = [
    { title: 'Education', text: 'Studying Computer Science, exploring everything from low-level systems to high-level applications.' },
    { title: 'Experience', text: 'Built projects in C, Go, Python, and JavaScript — always learning something new.' },
    { title: 'Interests', text: 'Systems programming, networking, open-source projects, and clean code.' },
    { title: 'Goals', text: 'Grow into a versatile engineer and contribute to impactful software.' },
  ];
}
