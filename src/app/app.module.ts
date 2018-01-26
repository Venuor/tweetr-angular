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
import { SignupPageComponent } from './pages/signup/signup-page.component';
import { ValidatorService } from './services/validator.service';
import { SignupService } from './services/signup.service';
import { GlobalTimelineComponent } from './pages/global-timeline/global-timeline.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TweetService } from './services/tweet.service';
import { MomentModule } from 'angular2-moment';
import { UserComponent } from './pages/user/user.component';
import { UserService } from './services/user.service';
import { UsercardComponent } from './components/usercard/usercard.component';
import { UserTimelineComponent } from './pages/user-timeline/user-timeline.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { StatisticsService } from './services/statistics.service';
import { SignupComponent } from './components/signup/signup.component';
import { UserOverviewComponent } from './pages/user-overview/user-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BackgroundComponent,
    CenterComponent,
    LoginComponent,
    NavigationComponent,
    SignupPageComponent,
    GlobalTimelineComponent,
    TimelineComponent,
    UserComponent,
    UsercardComponent,
    UserTimelineComponent,
    SettingsComponent,
    AdminComponent,
    SignupComponent,
    UserOverviewComponent
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
    UserService,
    StatisticsService,
    UnauthenticatedGuard,
    AuthenticatedGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
