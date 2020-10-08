import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import {MsalService } from '@azure/msal-angular';
import { AppConfig } from '../config/app-config';
//import { AuthResponse } from 'msal'
//import { AuthHelperService, AccessTokenInfo } from './auth-helper.service';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public info: string;
  public bradcastedData: any;
  token: string;
  private hubConnection: signalR.HubConnection
  private sendBlobName = new Subject<string>();
  subscription: any;
  getBlobName = this.sendBlobName.asObservable();
  constructor(private authService: MsalService, private http: HttpClient, private appconfig: AppConfig) {
  }


  public  getAccessToken() {
    this.authService.acquireTokenSilent({ scopes: ['api://ccb5af15-a150-4566-a004-7ada7454f9e2/access_as_user', 'user.read', 'openid', 'profile'] }).then((res) => {
      console.log("acquireTokenPopup");
      this.token = res.accessToken;
      console.log(this.token);
      localStorage.setItem("accessToken", this.token);
    })
      .catch((e) => {
        console.log("acquireTokenPopup catch");
        console.log(e);
      });
    if (localStorage.getItem("accessToken") != null) {
      this.startConnection(this.appconfig.apiUrl);
      this.addTransferDataListener();
      this.addBroadcastDataListener();
      this.startHttpRequest(this.appconfig.apiUrl);
      return true;
    }
    else {
      return false;
    }
  }

  //Establish a connection
  public startConnection = (url) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url + `/message`, { accessTokenFactory: () => localStorage.getItem("accessToken") })
      .build();

    this.hubConnection
      .start()
      .then(() => (document.getElementById("message").innerHTML = 'Connection started'))
      .catch(err => {
        console.log('Error while starting connection: ' + err);
        document.getElementById("message").innerHTML = "Error while starting a connection.";
      })

  }

  //listen to transferdata event in MessageController and prints the random nuber returned from controller 
  public addTransferDataListener = () => {
    this.hubConnection.on('transferdata', (data) => {
      this.info = data;
      console.log(data);
      document.getElementById("message").innerHTML = data;
    });
  }
  public startHttpRequest = (url) => {
    this.http.get(url + `/api/message`)
      .subscribe(res => {
        console.log(res);
      })
  }

  public broadcastData = () => {
    console.log(this.info);
    this.hubConnection.invoke('broadcastdata', this.info)
      .catch(err => console.error(err));
  }

  public addBroadcastDataListener = () => {
    this.hubConnection.on('broadcastdata', (message, storageName) => {
      this.bradcastedData = message;
      if (storageName) {
        this.sendBlobName.next(storageName);
      document.getElementById("info").innerHTML = this.bradcastedData;
      }
    })
  }
}
