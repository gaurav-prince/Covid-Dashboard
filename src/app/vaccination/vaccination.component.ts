import { Component, OnInit } from '@angular/core';
import { CscService } from '../csc.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.scss']
})
export class VaccinationComponent implements OnInit {

  constructor(private cscService: CscService, public datepipe: DatePipe) { }
  // dataSource;
  displayedColumns = [];
  states: any = { states: []};
  cities: any = { districts : []};
  vaccineSessions: any = {
    sessions: []};
  dateString: string = '';
  pincode;
  cityId = '';
  loaded: boolean = false;
  ngOnInit(): void {
    this.cscService.getStates().subscribe(
      data => this.states = data
    );
  }

  
  onChangeState(stateId: number) {
    if (stateId) {
      this.cscService.getCities(stateId).subscribe(
        data => this.cities = data
      );
    } else {
      this.cities = null;
    }
  }

  onChangeDate(date) {
    this.dateString =this.datepipe.transform(date, 'dd-MM-yyyy');
  }

  onChangeCity(city: string) {
    this.cityId = city;
  }


  onSubmitWithPin() {
    this.cscService.getVaccineByPin(this.pincode, this.dateString).subscribe(
      data => this.vaccineSessions = data
    );
    this.loaded = true;
  }

  onSubmitDistrict() {
    this.cscService.getVaccineByDistrict(this.cityId, this.dateString).subscribe(
      data => this.vaccineSessions = data
    );
    this.loaded = true;
  }

  onSubmitWithPinWeek() {
    this.cscService.getVaccineByPinWeek(this.pincode, this.dateString).subscribe(
      data => this.vaccineSessions = data
    );
    this.loaded = true;
  }

  onSubmitDistrictWeek() {
    this.cscService.getVaccineByDistrictWeek(this.cityId, this.dateString).subscribe(
      data => this.vaccineSessions = data
    );
    this.loaded = true;
  }

  dataSource = this.vaccineSessions.sessions;
}
