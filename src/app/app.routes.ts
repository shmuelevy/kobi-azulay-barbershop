import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'admin',component:AdminComponent}
];
