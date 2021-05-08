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
  apiVaccineDistrictWeekBaseUrl = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict'
  apiVaccinePinWeekBaseUrl = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin'
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

  getVaccineByPinWeek(pin: string, date: string) {
    return this.http.get(`${this.apiVaccinePinWeekBaseUrl}?pincode=${pin}&date=${date}`).pipe(
      catchError(this.handleError)
    );
  }

  getVaccineByDistrictWeek(districtId: string, date: string) {
    return this.http.get(`${this.apiVaccineDistrictWeekBaseUrl}?district_id=${districtId}&date=${date}`).pipe(
      catchError(this.handleError)
    );
  }

  convertResponsetoFormat(data: any[]) {
    console.log('received data', data);
    let transformedResources: any[] = []
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j< data[i].sessions.length; j++) {
        let object: any = {};
        let fee = '', vaccine = '';
        object.name = data[i].name;
        object.address = data[i].address;
        object.district_name = data[i].district_name;
        object.from = data[i].from;
        object.to = data[i].to;
        object.fee_type = data[i].fee_type;
        object.date = data[i].sessions[j].date;
        object.available_capacity = data[i].sessions[j].available_capacity;
        if (data[i].vaccine_fees) {
          for(let k = 0; k < data[i].vaccine_fees.length; k++ ) {
            if (k != data[i].vaccine_fees.length -1) {
              fee = data[i].vaccine_fees[k].fee;
              vaccine = data[i].vaccine_fees[k].vaccine;
            }
            else {
              fee = data[i].vaccine_fees[k].fee;
              vaccine = data[i].vaccine_fees[k].vaccine;
            }
          }
          object.fee = fee;
          object.vaccine = vaccine;

        }
        else {
          object.vaccine = data[i].sessions[j].vaccine;
          if (data[i].fee_type == "Free") {
            object.fee = '0';
          }
          else {
            object.fee = 'Not Available';
          }
        }
        transformedResources.push(object);
      }
    } 
    console.log(transformedResources);
    return transformedResources;
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
