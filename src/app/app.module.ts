import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { NavigationHeaderComponent } from './navigations/navigation-header.component';
import { NavigationListComponent } from './navigations/navigation-list.component';
import { AuthenticationService } from './authentication/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './authentication/auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MessagesComponent } from './messages/messages.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    NavigationHeaderComponent,
    NavigationListComponent,
    DashboardComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'chat-api'),
    AngularFirestoreModule,
  ],
  providers: [AuthenticationService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
