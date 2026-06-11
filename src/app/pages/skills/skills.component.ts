import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';

const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

@Component({
  selector: 'app-skills',
  imports: [],
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
        { name: 'Go',         logo: `${D}/go/go-original-wordmark.svg` },
        { name: 'C',          logo: `${D}/c/c-original.svg` },
        { name: 'Java',       logo: `${D}/java/java-original.svg` },
        { name: 'Rust',       logo: `${D}/rust/rust-original.svg` },
        { name: 'TypeScript', logo: `${D}/typescript/typescript-original.svg` },
        { name: 'JavaScript', logo: `${D}/javascript/javascript-original.svg` },
        { name: 'C++',        logo: `${D}/cplusplus/cplusplus-original.svg` },
        { name: 'Python',     logo: `${D}/python/python-original.svg` },
        { name: 'SQL',        logo: `${D}/mysql/mysql-original.svg` },
      ]
    },
    {
      title: 'Frameworks & Libraries',
      skills: [
        { name: 'Spring Boot', logo: `${D}/spring/spring-original.svg` },
        { name: 'Gin',         logo: `${D}/go/go-original-wordmark.svg` },
        { name: 'Next.js',     logo: `${D}/nextjs/nextjs-original.svg` },
        { name: 'React',       logo: `${D}/react/react-original.svg` },
        { name: 'Node.js',     logo: `${D}/nodejs/nodejs-original.svg` },
        { name: 'Angular',     logo: `${D}/angular/angular-original.svg` },
      ]
    },
    {
      title: 'Tools & Platforms',
      skills: [
        { name: 'Docker',   logo: `${D}/docker/docker-original.svg` },
        { name: 'Git',      logo: `${D}/git/git-original.svg` },
        { name: 'Linux',    logo: `${D}/linux/linux-original.svg` },
        { name: 'PostgreSQL', logo: `${D}/postgresql/postgresql-original.svg` },
        { name: 'GitHub',   logo: `${D}/github/github-original.svg` },
        { name: 'VS Code',  logo: `${D}/vscode/vscode-original.svg` },
      ]
    }
  ];
}
