import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private http: HttpClient) { }

  validateData(url,dim,year,datatype) {
    return this
      .http
      .get(url+`/validate/GetValidData/${dim}/${year}/${datatype}`);
  }

  getReport(url, blobName) {
    return this
      .http
      .get(url+`/validate/GetReport/${blobName}`);
  }
}
