import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    );
    this.revealEls.forEach(el => observer.observe(el.nativeElement));
  }

  cards = [
    { title: 'Background', text: 'Computer Science student with a passion for building things from scratch.' },
    { title: 'Interests', text: 'Systems programming, web development, networking, and open-source.' },
    { title: 'Goals', text: 'Becoming a versatile engineer who understands every layer of the stack.' },
  ];
}
