import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Services
import { PeopleService } from '../../../services/peopleService';
// Interfaces
import { Person } from '../person';

@Component({
  selector: 'app-addperson',
  templateUrl: './addperson.component.html',
  styleUrls: ['./addperson.component.scss']
})
export class AddpersonComponent implements OnInit {

  public addPersonForm: FormGroup;
  
  @Output() addPersonEvent = new EventEmitter();

  constructor(private peopleService: PeopleService) {
    this.addPersonForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'emailAddress': new FormControl('', [Validators.required]),
      'address': new FormControl('')
    });
  }

  ngOnInit() {
  }

  addPerson(event) {
    event.preventDefault();

    // Instanciate an interface
    var newPerson = {} as Person;

    // Assign form values to new person object
    Object.keys(this.addPersonForm.value).filter(a => this.addPersonForm.value[a] !== null).forEach(key => {
      newPerson[key] = this.addPersonForm.value[key];
    });

    // Call Service to add new person record, and emit the event
    this.peopleService.createPerson(newPerson).subscribe(data => {
      this.addPersonEvent.emit(newPerson);
    });
  }
}
