import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
// Services
import { PeopleService } from '../../../services/peopleService';
// Interfaces
import { Person } from '../person';

@Component({
  selector: 'app-editperson',
  templateUrl: './editperson.component.html',
  styleUrls: ['./editperson.component.scss']
})
export class EditpersonComponent implements OnInit {

  person$: Observable<Person>;
  editPersonForm: FormGroup;
  subscription: Subscription;

  @Output() updatePersonEvent = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private peopleService: PeopleService) { }

  ngOnInit() {
    this.editPersonForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      emailAddress: ['', Validators.required],
      address: ['']
    });

    // Subscribe to change of Person Id in Service (for editing)
    this.subscription = this.peopleService.personId$
      .subscribe(id => {
        this.person$ = this.peopleService.getPersonById(id).pipe(tap(pers => this.editPersonForm.patchValue(pers)));
      })
  }

  // Update Button Click 
  updatePersonClickEvent(event) {
    event.preventDefault();

    // Instanciate an interface
    var person = {} as Person;

    // Assign form values to new person object
    Object.keys(this.editPersonForm.value).filter(a => this.editPersonForm.value[a] !== null).forEach(key => {
      person[key] = this.editPersonForm.value[key];
    });

    // Call Service to add new person record, and emit the event
    this.peopleService.updatePerson(person).subscribe(p => {
      this.updatePersonEvent.emit(p);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
