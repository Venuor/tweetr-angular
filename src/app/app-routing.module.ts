import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupPageComponent } from './pages/signup/signup-page.component';
import { GlobalTimelineComponent } from './pages/global-timeline/global-timeline.component';
import { UserComponent } from './pages/user/user.component';
import { UserTimelineComponent } from './pages/user-timeline/user-timeline.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { UserOverviewComponent } from './pages/user-overview/user-overview.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [UnauthenticatedGuard],
    data: {
      title: 'Tweetr'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthenticatedGuard],
    data: {
      title: 'Tweetr - Login'
    }
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    canActivate: [UnauthenticatedGuard],
    data: {
      title: 'Tweetr - Signup'
    }
  },
  {
    path: 'global',
    component: GlobalTimelineComponent,
    data: {
      title: 'Tweetr - Global Timeline'
    }
  },
  {
    path: 'user/:username',
    component: UserComponent,
    data: {
      title: 'Tweetr'
    }
  },
  {
    path: 'timeline',
    component: UserTimelineComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      title: 'Tweetr'
    }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      title: 'Tweetr - Settings'
    }
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthenticatedGuard, AdminGuard],
    data: {
      title: 'Tweetr - Administration'
    }
  },
  {
    path: 'users',
    component: UserOverviewComponent,
    data: {
      title: 'Tweetr - Users'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
