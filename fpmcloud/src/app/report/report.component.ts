import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../services/validation.service';
import { AppConfig } from '../config/app-config';
import { SignalRService } from '../services/signal-r.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  IsWait: boolean;
  isExpanded: boolean;
  constructor(public signalRService: SignalRService, public validationService: ValidationService, private appconfig: AppConfig) { }
  data: string;
  reportContent: string;
  blobNames: string[] = ["43ac181f-2555-49f5-86cd-0f6d537e1159"];
  private spread: GC.Spread.Sheets.Workbook;
  ngOnInit(): void {
    this.signalRService.getBlobName
      .subscribe((blobName: string) => {
        console.log("blobName recieved");
        this.blobNames.push(blobName);
        this.getReport(blobName);
      });
      GC.Spread.Sheets.LicenseKey = "Clausion Oy,442762682627814#B0vJMSYJzUlVHOEZXbEdjNQp4RtVEN786crl5U0djdhFUS8E4ZoFlR8dkSThHTkhUcYB7Y0ZGaVJGVuBHSq3SU8kWZ8Z6RkFXT4djNF3kVJRWSrwkZmFmZHlkUQpFeudWSv24YyUENTZXMyEnQ7ITO54kWYpVNjR6K8IFNnpWd6MFUsJkZ9k7UVRkUaFWeyUWOM5kQHR6Y7Q6avF5ThplcmhGS8JEUFdETsJXYj3GbtVVU8FjSBlUQohnR8NHTwc4dDtWYsJ7QMNGckZkavNFMj3COrBFeQlnUSVXeo9WMjJiOiMlIsIyN6MTRENzNiojIIJCL4UTN4EjM4ETO0IicfJye35XX3JSSGljQiojIDJCLiITMuYHITpEIkFWZyB7UiojIOJyebpjIkJHUiwiI5IDNyIDMgMDMyETOxAjMiojI4J7QiwiI93EIu3WazVXYsNkI0ISYONkIsICNxgzNyYjM8YjM6cjM4QjI0ICZJJCL3V6csFmZ0IiczRmI1pjIs9WQisnOiQkIsISP3EkQwtSSUR5ZJJDbzoUMKhVbzpkMDJlNzY5SpR7L6sSUwRXezkXNENEeyYTTvMEc744RzFFa5IXZpRmUxA5YyE4LwVUQYBVNCJ4RrpEcSt4T7kDZp3UMEV5NkJVSzYUcyE4d82WRGJXRCFlc0ZFUjdEWZx4UfM4U";
      this.spread = new GC.Spread.Sheets.Workbook(document.getElementById("reportSheet"));

  }

  Validate(dim: string, year: string, datatype: string) {
    this.IsWait = true;
    this.isExpanded=false;
    this.validationService.validateData(this.appconfig.apiUrl, dim, year, datatype).subscribe((res: msg) => {
      this.data = res.message;
    }, err => {
      this.IsWait = false;
    }, () => {
      this.IsWait = false;
    })
  }

  getReport(blobName: string) {
    this.validationService.getReport(this.appconfig.apiUrl, blobName).subscribe((data: msg) => {
      this.isExpanded = true;
      var jsonObj = JSON.parse(data.message)
      if (jsonObj.spread.sheets.DummySheet)
        this.reportContent = jsonObj.spread.sheets.DummySheet.data.dataTable[0][0].value;
      const spreadJson = JSON.parse(data.message);
      if (this.spread !== undefined) {
        this.spread.options.useTouchLayout = true;
        this.spread.fromJSON(spreadJson.spread);
        this.spread.options.grayAreaBackColor = '#f1f1f1';
        var sheet = this.spread.getActiveSheet();
        if (this.spread.sheets.length == 1)
        sheet.setColumnWidth(0, 290.0, GC.Spread.Sheets.SheetArea.viewport);
        sheet.setColumnWidth(4, 170.0, GC.Spread.Sheets.SheetArea.viewport);
        sheet.setColumnWidth(5, 150.0, GC.Spread.Sheets.SheetArea.viewport);
      }
    })
    return false;
  }
}

export interface msg {
  message: string
}
