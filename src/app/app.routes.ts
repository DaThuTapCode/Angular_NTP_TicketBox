
import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { MovieManagerComponent } from './component-admin/movie-manager/movie-manager.component';
import { ScreensComponent } from './component/screens/screens.component';
import { TheaterComponent } from './component/theater/theater.component';
import { TicketingComponent } from './component/ticketing/ticketing.component';
import { PaymentComponent } from './component/payment/payment.component';
import { TransactionHistoryComponent } from './component/transaction-history/transaction-history.component';
import { ShowtimeManagerComponent } from './component-admin/showtime-manager/showtime-manager.component';
import { BookingManagerComponent } from './component-admin/booking-manager/booking-manager.component';
import { EventManagerComponent } from './component-admin/event-manager/event-manager.component';
import { PromotionManagerComponent } from './component-admin/promotion-manager/promotion-manager.component';
import { ScreenManagerComponent } from './component-admin/screen-manager/screen-manager.component';
import { TheaterManagerComponent } from './component-admin/theater-manager/theater-manager.component';
import { UserManagerComponent } from './component-admin/user-manager/user-manager.component';
import { AboutComponent } from './component/about/about.component';
import { authGuard } from './security-guard/auth-guard';
import { DashboarComponent } from './component-admin/dashboar/dashboar.component';
import { LayoutAdminComponent } from './component-admin/layout-admin/layout-admin.component';
import { LayoutUserComponent } from './component/layout-user/layout-user.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileUserComponent } from './component/profile-user/profile-user.component';


export const routes: Routes = [
    {
       path: '',
        component: LayoutUserComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'movie-schedule', component: HomeComponent },
            { path: 'home', component: HomeComponent },
            { path: 'profile', component: ProfileUserComponent, canActivate: [authGuard] },
            { path: 'theater', component: TheaterComponent },
            { path: 'login-or-register', component: LoginComponent },
            { path: 'screen/:movieid/:screenid/:showtimeid', component: ScreensComponent, canActivate: [authGuard] },
            { path: 'booking/:movieid', component: TicketingComponent, canActivate: [authGuard] },
            {path: 'payment-result/:bookingId', component: PaymentComponent, canActivate: [authGuard]},
            { path: 'transaction-history', component: TransactionHistoryComponent , canActivate: [authGuard]},
            { path: 'about', component: AboutComponent },
        ]
    },
    {
        path: 'admin',
        component: LayoutAdminComponent,
        canActivate: [authGuard],
        data: { role: ['ADMIN', 'MODERATOR'] },
        children: [
            { path: 'dashboard', component: DashboarComponent, canActivate: [authGuard] },
            { path: 'show-time-manager', component: ShowtimeManagerComponent, canActivate: [authGuard] },
            { path: 'movie-manager', component: MovieManagerComponent, canActivate: [authGuard]},
            { path: 'booking-manager', component: BookingManagerComponent, canActivate: [authGuard] },
            { path: 'event-manager', component: EventManagerComponent, canActivate: [authGuard] },
            { path: 'promotion-manager', component: PromotionManagerComponent, canActivate: [authGuard] },
            { path: 'screen-manager/:theaterid', component: ScreenManagerComponent, canActivate: [authGuard] },
            { path: 'theater-manager', component: TheaterManagerComponent, canActivate: [authGuard] },
            { path: 'screen-user', component: UserManagerComponent, canActivate: [authGuard] },
        // { path: '**', component: NotfoundComponent }
        ]
    },

    { path: '**', component: NotfoundComponent }

];