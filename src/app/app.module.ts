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
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from './services/local-storage.service';
import { SignupComponent } from './pages/signup/signup.component';
import { ValidatorService } from './services/validator.service';
import { SignupService } from './services/signup.service';
import { GlobalTimelineComponent } from './pages/global-timeline/global-timeline.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TweetService } from './services/tweet.service';
import { MomentModule } from 'angular2-moment';

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
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MomentModule
  ],
  providers: [
    LoginService,
    LocalStorageService,
    ValidatorService,
    SignupService,
    TweetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
