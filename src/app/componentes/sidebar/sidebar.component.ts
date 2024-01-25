import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private router: Router, public menuService: MenuService) {

  }

  selectMenu(menu: number) {
    switch (menu) {
      case 1:
        this.router.navigate(['/cliente']);
        break;

      default:
        break;
    }
    this.menuService.menuSelecionado = menu;
  }
}