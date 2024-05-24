
import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';


export const routes: Routes = [
    {path: '', component: LoginComponent}, 
    {path: 'home', component: HomeComponent},
    {path: 'footer', component: FooterComponent},
    {path: 'header', component: HeaderComponent},
    {path: 'login-or-register', component: LoginComponent},
    {path: '**', redirectTo: 'home'}

];