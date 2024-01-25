import { Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cliente'
    },
    {
        path: 'cliente', component: ClienteComponent
    }
];
