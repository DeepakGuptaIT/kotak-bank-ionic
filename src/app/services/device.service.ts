import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';


export interface Device {
  id: string;
  productName: string;
  image: string;
  video: string;
  cpu: string;
  ram: string;
  storage: string;
  screen: string;
  price: string;
  description: string;

}
@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  baseUrl = 'https://mocki.io/v1/d46dc365-f752-46ee-b0cd-c136aec38e00';

  constructor(public http: HttpClient) {

  }

  getDeviceList(): Observable<Device[]> {
    try {
      let url = this.baseUrl;

      if (this.getIsOnline()) {
        return this.http.get<Device[]>(url);
      } else {
        return this.getInternetFailedError();
      }
    } catch (ex) {
      return this.getUnknownError();
    }
  }
  // Utility Services
  getIsOnline(): boolean {
    return navigator.onLine;
  }

  getInternetFailedError(): Observable<never> {
    const error = {
      status: 1234,
      error: 1234
    };
    const customError = new HttpErrorResponse(error);
    return throwError(customError);
  }

  getUnknownError(): Observable<never> {
    const error = {
      status: 12345,
      error: "UNKNOWN_ERROR"
    };
    const customError = new HttpErrorResponse(error);
    return throwError(customError);
  }
}
