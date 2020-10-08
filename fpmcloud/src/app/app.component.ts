import { Component, OnInit } from '@angular/core';

import { MsalService, BroadcastService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';
import { Subscription } from 'rxjs';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedIn = false;
  connectionSuccess = false;
  private subscription: Subscription;
  public isIframe: boolean;
  constructor(private authService: MsalService, private broadcastService: BroadcastService, public signalr: SignalRService) {
  }

  ngOnInit() {

  }

}

