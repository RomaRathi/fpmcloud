import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import {  MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './config/config.service';
import { SelecComponent } from './selections/selec.component';
import { AppConfig } from './config/app-config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MsalModule,
  MsalInterceptor,
  MSAL_CONFIG,
  MSAL_CONFIG_ANGULAR,
  MsalService,
  MsalAngularConfiguration
} from '@azure/msal-angular';
import { Configuration } from 'msal';
import { ReportComponent } from './report/report.component';
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function initializerFn(configservice: ConfigService) {
  return () => {
    return configservice.loadConfig();
  }
}
function MSALConfigFactory(): Configuration {
  return {
    auth: {
      clientId: '03c8ea0b-8c57-4199-be9b-325e8fc9c418',
      authority: "https://login.microsoftonline.com/b8f01a97-60c1-471f-b65a-d0bf1951db8c",
      validateAuthority: true,
      redirectUri: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
  };
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return {
    popUp: !isIE,
    consentScopes: [
      "user.read",
      "openid",
      "profile",
      "api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user"
    ],
    unprotectedResources: ["https://www.microsoft.com/en-us/"],
    protectedResourceMap: [
          ['https://cloudstudy.clausion.net/api/validate', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
          ['https://cloudstudy.clausion.net/api/*', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
          ['https://cloudstudy.clausion.net/validate/*', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
          ['https://cloudstudy.clausion.net/validate/GetValidData/1003/2007/ACT', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
          ['https://cloudstudy.clausion.net/validate/GetReport/*', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
          ['http://localhost:5000/api/*', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
          ['http://localhost:5000/validate/*', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
          ['http://localhost:5000/validate/GetValidData/1003/2007/ACT', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
          ['https://graph.microsoft.com/1.0/me', ['user.read']],
          ['http://localhost:5000/validate/GetReport/*', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
    ],
    extraQueryParameters: {}
  };
}

@NgModule({
  declarations: [
    AppComponent,
    SelecComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MsalModule,
    CommonModule,
    MatExpansionModule, MatInputModule, MatProgressBarModule,
    //MsalModule.forRoot({
    //  auth: {
    //    clientId: '03c8ea0b-8c57-4199-be9b-325e8fc9c418',//'219ecce9-f17f-47ad-8e70-5493e7df7973',// This is your client ID present in azure AD
    //    authority: 'https://login.microsoftonline.com/b8f01a97-60c1-471f-b65a-d0bf1951db8c',//'https://login.microsoftonline.com/b8f01a97-60c1-471f-b65a-d0bf1951db8c',// This is your tenant ID
    //    redirectUri: window.location.origin,
    //    validateAuthority: true,
    //    postLogoutRedirectUri: window.location.origin,
    //    navigateToLoginRequestUrl: true// This is your redirect URI
    //},
    //  cache: {
    //  cacheLocation: 'localStorage'//,
    //  //storeAuthStateInCookie: isIE, // set to true for IE 11
    //},
    //},
    //  {
    //    popUp: true,//!isIE,
    //    consentScopes: [
    //      'user.read',
    //      'openid',
    //      'profile',
    //    ],
    //    unprotectedResources: [],
    //    protectedResourceMap: [
    //      ['https://cloudstudy.clausion.net/api/validate', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
    //      ['https://cloudstudy.clausion.net/api/*', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
    //      ['https://cloudstudy.clausion.net/validate/*', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
    //      ['https://cloudstudy.clausion.net/validate/GetValidData/1003/2007/ACT', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
    //      ['https://cloudstudy.clausion.net/validate/GetReport/*', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
    //      ['http://localhost:5000/api/*', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
    //      ['http://localhost:5000/validate/*', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
    //      ['http://localhost:5000/validate/GetValidData/1003/2007/ACT', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
    //      ['https://graph.microsoft.com/1.0/me', ['user.read']],
    //      ['http://localhost:5000/validate/GetReport/*', ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user']],
    //],
    //extraQueryParameters: {}
    //  }),
    BrowserAnimationsModule
  ], 

  providers: [
    {
      provide: AppConfig,
      deps: [HttpClient],
      useExisting: ConfigService
    },
    {
      provide: APP_INITIALIZER,
      deps: [ConfigService],
      useFactory: initializerFn,
      multi: true
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
    },
    {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory
    },
    {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
