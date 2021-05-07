import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective} from '@angular/forms';
import { CscService } from '../csc.service';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-resourceform',
  templateUrl: './resourceform.component.html',
  styleUrls: ['./resourceform.component.scss']
})
export class ResourceformComponent implements OnInit {
  constructor(private cscService: CscService) { }

  title = 'Angular 4 Project!';
  states: any = { states: []};
  cities: any = { districts : []};
  resources = [
    {id: 1, value: 'Oxygen Cylinder'}, 
    {id: 2, value: 'Oxygen Concentrator'},
    {id: 3, value: 'Blood Plasma'},
    {id: 4, value: 'Hospital Bed(General)'},
    {id: 5, value: 'Hospital Bed(ICU)'}
  ];
   
   ngOnInit() {
    this.cscService.getStates().subscribe(
      data => this.states = data
    );
   }

   phoneFormControl = new FormControl('', [
    Validators.pattern('[0-9]*'),
    Validators.minLength(10)
  ]);
    onChangeState(stateId: number) {
      console.log(stateId);
      if (stateId) {
        this.cscService.getCities(stateId).subscribe(
          data => this.cities = data
        );
      } else {
        this.cities = null;
      }
    }
    loading: false;
    matcher = new MyErrorStateMatcher();
}
