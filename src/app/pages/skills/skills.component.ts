import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';

const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

import { TerminalComponent } from '../../shared/components/terminal/terminal.component';

@Component({
  selector: 'app-skills',
  imports: [TerminalComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements AfterViewInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    this.revealEls.forEach(el => observer.observe(el.nativeElement));
  }

  categories = [
    {
      title: 'Languages',
      skills: [
        { name: 'C',          logo: `${D}/c/c-original.svg` },
        { name: 'Go',         logo: `${D}/go/go-original-wordmark.svg` },
        { name: 'C++',        logo: `${D}/cplusplus/cplusplus-original.svg` },
        { name: 'Java',       logo: `${D}/java/java-original.svg` },
        { name: 'Python',     logo: `${D}/python/python-original.svg` },
        { name: 'JavaScript', logo: `${D}/javascript/javascript-original.svg` },
        { name: 'TypeScript', logo: `${D}/typescript/typescript-original.svg` },
        { name: 'HTML',       logo: `${D}/html5/html5-original.svg` },
        { name: 'CSS',        logo: `${D}/css3/css3-original.svg` },
        { name: 'SQL',        logo: `${D}/mysql/mysql-original.svg` },
        { name: 'Rust',       logo: `${D}/rust/rust-original.svg` },
      ]
    },
    {
      title: 'Tools & Platforms',
      skills: [
        { name: 'Docker',   logo: `${D}/docker/docker-original.svg` },
        { name: 'Git',      logo: `${D}/git/git-original.svg` },
        { name: 'GitHub',   logo: `${D}/github/github-original.svg` },
        { name: 'AWS',      logo: `${D}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
        { name: 'Azure',    logo: `${D}/azure/azure-original.svg` },
        { name: 'Linux',    logo: `${D}/linux/linux-original.svg` },
        { name: 'VS Code',  logo: `${D}/vscode/vscode-original.svg` },
        { name: 'Postman',  logo: `${D}/postman/postman-original.svg` },
      ]
    },
    {
      title: 'Frameworks',
      skills: [
        { name: 'Angular',      logo: `${D}/angular/angular-original.svg` },
        { name: 'React',        logo: `${D}/react/react-original.svg` },
        { name: 'Node.js',      logo: `${D}/nodejs/nodejs-original.svg` },
        { name: 'Express.js',   logo: `${D}/express/express-original.svg` },
        { name: 'Spring Boot',  logo: `${D}/spring/spring-original.svg` },
        { name: 'ASP.NET',      logo: `${D}/dotnetcore/dotnetcore-original.svg` },
        { name: 'Gin',          logo: `${D}/go/go-original-wordmark.svg` },
      ]
    }
  ];
}
