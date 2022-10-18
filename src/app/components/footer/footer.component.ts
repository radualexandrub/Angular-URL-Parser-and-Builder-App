import { Component, OnInit } from '@angular/core';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faMoon = faMoon;

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light")
    } else if (localStorage.getItem("theme") === "dark") {
      document.documentElement.setAttribute("data-theme", "dark")
    }
  }

  onToggleDarkTheme(): void {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }
}
