import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';

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
    component: IndexComponent,
    data: {
      title: 'Tweetr - Login'
    }
  },
  {
    path: 'signup',
    component: IndexComponent,
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
