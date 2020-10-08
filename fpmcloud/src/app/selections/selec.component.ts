import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { ValidationService } from '../services/validation.service';
import { AppConfig } from '../config/app-config';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-selec',
  templateUrl: './selec.component.html',
  styleUrls: ['./selec.component.scss']
})
export class SelecComponent implements OnInit {
  loggedIn = false;
  connectionSuccess = false;
  token: string;
  public isIframe: boolean;
  constructor(private router: Router,private authService: MsalService, public signalRService: SignalRService, public validationService: ValidationService, private appconfig: AppConfig) { }
  data: string;
  reportContent: string;
  blobNames: string[] = [];
  buildConnectionBtn: boolean;

  ngOnInit(): void {
    
    this.isIframe = window !== window.parent && !window.opener;

    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }

      console.log('Redirect Success: ', response);
    });

    this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
      console.log('MSAL Logging: ', message);
    }, {
      correlationId: CryptoUtils.createNewGuid(),
      piiLoggingEnabled: false
    }));

  }


  login() {
    if (this.isIframe) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup()
        .then(response => {
          this.loggedIn = true;
          this.connectionSuccess = this.signalRService.getAccessToken();
        })
        .catch(err => {
          console.log(err);
          this.loggedIn = false;
        });
    }
  }
  broadcast() {
    this.signalRService.broadcastData();
  }
  logout() {
    this.authService.logout();
  }
 
  reportRedirect() {
    this.router.navigate(['/report']);
  }
}

export interface msg {
  message: string
}
