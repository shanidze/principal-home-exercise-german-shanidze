import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  showNewPersonComponent: boolean = false;
  showEditPersonComponent: boolean = false;

  homeButtonClickEvent() {
    // Home button clicked on List Componenet
    this.showNewPersonComponent = false;
    this.showEditPersonComponent = false;
  }

  addPersonClick() {
    // Add person button clicked on List Componenet
    this.showEditPersonComponent = false;
    this.showNewPersonComponent = !this.showNewPersonComponent;
  }

  editPersonClick(personid) {
    // Edit person button clicked on List Componenet
    this.showNewPersonComponent = false;
    this.showEditPersonComponent = true;
  }

  updatePerson() {
    // Update person button clicked on Edit Person Componenet
    this.showNewPersonComponent = false;
    this.showEditPersonComponent = false;
  }
}
