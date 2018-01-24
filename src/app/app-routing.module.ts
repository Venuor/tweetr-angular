import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { GlobalTimelineComponent } from './pages/global-timeline/global-timeline.component';
import { UserComponent } from './pages/user/user.component';
import { UserTimelineComponent } from './pages/user-timeline/user-timeline.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {
      title: 'Tweetr'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Tweetr - Login'
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
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
    data: {
      title: 'Tweetr'
    }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: {
      title: 'Tweetr - SettingType'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
