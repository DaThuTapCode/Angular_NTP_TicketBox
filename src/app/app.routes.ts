
import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { MovieManagerComponent } from './component-admin/movie-manager/movie-manager.component';
import { ScreensComponent } from './component/screens/screens.component';
import { TheaterComponent } from './component/theater/theater.component';
import { TicketingComponent } from './component/ticketing/ticketing.component';
import { PaymentComponent } from './component/payment/payment.component';
import { TransactionHistoryComponent } from './component/transaction-history/transaction-history.component';


export const routes: Routes = [
    {path: '', component: LoginComponent}, 
    {path: 'home', component: HomeComponent},
    {path: 'theater', component: TheaterComponent},
    {path: 'login-or-register', component: LoginComponent},
    {path: 'movie-manager', component: MovieManagerComponent},
    {path: 'screen/:movieid/:screenid/:showtimeid', component: ScreensComponent},
    {path: 'booking/:movieid', component: TicketingComponent},
    {path: 'payment', component: PaymentComponent},
    {path: 'transaction-history', component: TransactionHistoryComponent},
    {path: '**', redirectTo: 'home'}

];