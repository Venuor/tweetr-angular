import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { AppRoutingModule } from './app-routing.module';
import { BackgroundComponent } from './components/background/background.component';
import { CenterComponent } from './components/center/center.component';
import { LoginComponent } from './pages/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from './services/local-storage.service';
import { SignupComponent } from './pages/signup/signup.component';
import { ValidatorService } from './services/validator.service';
import { SignupService } from './services/signup.service';
import { GlobalTimelineComponent } from './pages/global-timeline/global-timeline.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TweetService } from './services/tweet.service';
import { MomentModule } from 'angular2-moment';
import { UserComponent } from './pages/user/user.component';
import { UserService } from './services/user.service';
import { UsercardComponent } from './components/usercard/usercard.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BackgroundComponent,
    CenterComponent,
    LoginComponent,
    NavigationComponent,
    SignupComponent,
    GlobalTimelineComponent,
    TimelineComponent,
    UserComponent,
    UsercardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MomentModule
  ],
  providers: [
    LocalStorageService,
    ValidatorService,
    SignupService,
    TweetService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
