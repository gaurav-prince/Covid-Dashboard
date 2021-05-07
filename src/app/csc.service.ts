import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CscService {
  apiStateBaseUrl = 'https://cdn-api.co-vin.in/api/v2/admin/location/states';
  apiCitiesBaseUrl = 'https://cdn-api.co-vin.in/api/v2/admin/location/districts'
  apiVaccineDistrictBaseUrl = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict'
  apiVaccinePinBaseUrl = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin'
  constructor(private http: HttpClient) { }

  getStates() {
    return this.http.get(`${this.apiStateBaseUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  getCities(state_id: number) {
    return this.http.get(`${this.apiCitiesBaseUrl}/${state_id}`).pipe(
      catchError(this.handleError)
    );
  }

  getVaccineByPin(pin: string, date: string) {
    return this.http.get(`${this.apiVaccinePinBaseUrl}?pincode=${pin}&date=${date}`).pipe(
      catchError(this.handleError)
    );
  }

  getVaccineByDistrict(districtId: string, date: string) {
    return this.http.get(`${this.apiVaccineDistrictBaseUrl}?district_id=${districtId}&date=${date}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } 
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
