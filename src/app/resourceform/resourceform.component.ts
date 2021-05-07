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
  states = {};
  cities = {};
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

   onChangeState(stateId: number) {
      if (stateId) {
        this.cscService.getCities(stateId).subscribe(
          data => this.cities = data
        );
      } else {
        this.cities = null;
      }
    }
}
