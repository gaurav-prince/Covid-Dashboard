import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { CscService } from '../csc.service';

@Component({
  selector: 'app-resourceform',
  templateUrl: './resourceform.component.html',
  styleUrls: ['./resourceform.component.scss']
})
export class ResourceformComponent implements OnInit {
  constructor(private cscService: CscService) { }

  title = 'Angular 4 Project!';
  todaydate;
  componentproperty;
  emailid;
  formdata;
  createAccountForm: FormGroup;
  countries: {};
  states: {};
  cities: {};
  resources: [
    {id: 1, value: 'Oxygen Cylinder'}, 
    {id: 2, value: 'Oxygen Concentrator'},
    {id: 3, value: 'Blood Plasma'},
    {id: 4, value: 'Hospital Bed(General)'},
    {id: 5, value: 'Hospital Bed(ICU)'}];
  
   ngOnInit() {
      this.formdata = new FormGroup({
         emailid: new FormControl("", Validators.compose([
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*")
         ])),
         passwd: new FormControl("", this.passwordvalidation)
      });

      this.cscService.getCountries().subscribe(
        data => this.countries = data
      );
  
      this.createAccountForm = new FormGroup({
        country: new FormControl(''),
        state: new FormControl(''),
        city: new FormControl('')
      });
   }
   passwordvalidation(formcontrol) {
      if (formcontrol.value.length < 5) {
         return {"passwd" : true};
      }
   }

   onChangeCountry(countryId: number) {
      if (countryId) {
        this.cscService.getStates(countryId).subscribe(
          data => {
            this.states = data;
            this.cities = null;
          }
        );
      } else {
        this.states = null;
        this.cities = null;
      }
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
   loading = true;
   onClickSubmit(data) {this.emailid = data.emailid;}
}
