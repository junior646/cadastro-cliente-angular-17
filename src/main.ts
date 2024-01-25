import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { SidebarComponent } from './app/componentes/sidebar/sidebar.component';
import { NavbarComponent } from './app/componentes/navbar/navbar.component';
import { NgxSpinnerModule } from 'ngx-spinner';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  // bootstrapApplication(SidebarComponent, appConfig)
  // .catch((err) => console.error(err));

  // bootstrapApplication(NavbarComponent, appConfig)
  // .catch((err) => console.error(err));