import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    this.revealEls.forEach(el => observer.observe(el.nativeElement));
  }

  projects = [
    {
      title: 'Web Server Using C',
      description: 'An HTTP/1.0 web server built from scratch in C using raw sockets and Linux system calls.',
      image: '/WebServer Using C.jpg',
      tags: ['C', 'HTTP', 'Sockets', 'Linux'],
      github: 'https://github.com/a7medmo7amady'
    },
    {
      title: 'Face Detection',
      description: 'Real-time face detection using OpenCV and Python with live webcam feed processing.',
      image: '/FaceDetection.jpg',
      tags: ['Python', 'OpenCV', 'NumPy', 'Computer Vision'],
      github: 'https://github.com/a7medmo7amady'
    }
  ];
}
