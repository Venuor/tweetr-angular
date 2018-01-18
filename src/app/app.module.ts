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

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BackgroundComponent,
    CenterComponent,
    LoginComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    LoginService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
