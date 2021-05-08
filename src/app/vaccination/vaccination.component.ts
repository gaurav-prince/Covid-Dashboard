import { Component, OnInit } from '@angular/core';
import { CscService } from '../csc.service';
import { DatePipe } from '@angular/common'
import {MatSort} from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.scss']
})
export class VaccinationComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  constructor(private cscService: CscService, public datepipe: DatePipe) { }

  displayedColumns = ['name', 'address', 'district', 'age', 'time', 'fee_type', 'fee', 'date', 'available_capacity', 'vaccine'];
  states: any = { states: [] };
  cities: any = { districts: [] };
  vaccineSessions: any = {
    sessions: []
  };
  vaccineCentres: any = {
    centers: []
  };
  convertedData: any;
  dateString: string = '';
  pincode;
  cityId = '';
  loaded: boolean = false;
  dataSource: any;

  ngOnInit(): void {
    this.cscService.getStates().subscribe(
      data => this.states = data
    );
  }

  onChangeState(stateId: number) {
    this.loaded=false;
    if (stateId) {
      this.cscService.getCities(stateId).subscribe(
        data => this.cities = data
      );
    } else {
      this.cities = null;
    }
  }

  onChangeDate(date) {
    this.dateString = this.datepipe.transform(date, 'dd-MM-yyyy');
    this.loaded=false;
  }

  onChangeCity(city: string) {
    this.cityId = city;
    this.loaded=false;
  }


  onSubmitWithPin() {
    this.cscService.getVaccineByPin(this.pincode, this.dateString).subscribe(
      data => {
        this.vaccineSessions = data;
        this.dataSource = new MatTableDataSource(this.vaccineSessions.sessions);
        this.dataSource.sort = this.sort;
      }
    );
    this.loaded = true;
    // this.dataSource.sort = this.sort;
  }

  onSubmitDistrict() {
    this.cscService.getVaccineByDistrict(this.cityId, this.dateString).subscribe(
      data => {
        this.vaccineSessions = data;
        this.dataSource = new MatTableDataSource(this.vaccineSessions.sessions);
        this.dataSource.sort = this.sort;
      }
    );
    this.loaded = true;
    // this.dataSource.sort = this.sort;
  }

  onSubmitWithPinWeek() {
    this.cscService.getVaccineByPinWeek(this.pincode, this.dateString).subscribe(
      data => {
        this.vaccineCentres = data;
        // console.log('data is ',data);
        // console.log('centres data is ',this.vaccineCentres.centers);
        this.convertedData = this.cscService.convertResponsetoFormat(this.vaccineCentres.centers);
        this.dataSource = new MatTableDataSource(this.convertedData);
        this.dataSource.sort = this.sort;
      }
    );
    this.loaded = true;
  }

  onSubmitDistrictWeek() {
    this.cscService.getVaccineByDistrictWeek(this.cityId, this.dateString).subscribe(
      data => {
        this.vaccineCentres = data;
        console.log(this.vaccineCentres.centers);
        this.convertedData = this.cscService.convertResponsetoFormat(this.vaccineCentres.centers);
        this.dataSource = new MatTableDataSource(this.convertedData);
      }
    );
    this.loaded = true;
    this.dataSource.sort = this.sort;
  }

  onTabChange() {
    this.loaded = false;
    this.vaccineSessions = {
      sessions: []
    };
  }

}
