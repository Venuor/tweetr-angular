import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

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
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
