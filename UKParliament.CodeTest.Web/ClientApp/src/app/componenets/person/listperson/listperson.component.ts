import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PeopleService } from '../../../services/peopleService';

@Component({
  selector: 'app-listperson',
  templateUrl: './listperson.component.html',
  styleUrls: ['./listperson.component.scss']
})
export class ListpersonComponent implements OnInit {

  constructor(private peopleService: PeopleService) { }  

  @Output() addNewPersonEvent = new EventEmitter();
  @Output() homeButtonClickEvent = new EventEmitter();
  @Output() editListPersonEvent = new EventEmitter();
  @Output() updatedPersonEvent = new EventEmitter();

  //Observable for Directory
  people$;

  ngOnInit() {
    this.fetchPeople();
  }

  fetchPeople() {
    this.people$ = this.peopleService.getPeople();
  }

  addPerson() {
    // refresh list
    this.fetchPeople();

    // Emit new person added
    this.addNewPersonEvent.emit();
  }

  addNewPerson() {
    this.addNewPersonEvent.emit();
  }

  homeButtonClick() {
    this.homeButtonClickEvent.emit();
  }

  editPerson(event) {
    this.peopleService.changeEditPerson(event.target.id)
    this.editListPersonEvent.emit(event.target.id);
  }

  deletePerson(event) {
    if (window.confirm("Delete" + event.currentTarget.name + "?"))
    {
      this.peopleService.deletePerson(event.currentTarget.id).subscribe(id => {
        // refresh list after delete
        this.fetchPeople();
      });
    }
  }
}
