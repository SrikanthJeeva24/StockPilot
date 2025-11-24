import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideHome, lucidePackage, lucideShoppingCart } from '@ng-icons/lucide';

@Component({
  selector: 'Master-Layout',
  imports: [RouterOutlet, CommonModule, NgIconComponent, RouterModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
  providers: [
    provideIcons({
      lucideHome,
      lucidePackage,
      lucideShoppingCart,
    }),
  ],
})
export class MainLayout {
  open = false;
  isMobile = false;

  constructor() {
    this.checkScreen();
  }

  toggleSidebar() {
    this.open = !this.open;
  }

  @HostListener('window:resize')
  checkScreen() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) this.open = true;
  }
}
