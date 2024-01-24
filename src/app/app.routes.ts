import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'admin',component:AdminComponent},
    {path:'**',component:PageNotFoundComponent},
];
