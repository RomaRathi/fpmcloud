import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends AppConfig {

  constructor(private http: HttpClient) {
    super();
  }

  loadConfig() {
    return this.http
      .get<AppConfig>('./assets/config.json')
      .toPromise()
      .then(config => {
        this.apiUrl = config.apiUrl;
      })
      .catch((err) => {
        console.log('Could not load configuration  ' + err);
      })
      ;
  }
}
