import { Component, OnInit } from '@angular/core';
import { eventForm } from 'src/app/core/models/event-form.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  // eventsDataArr :eventForm[];

  constructor() { }

  ngOnInit() {
    // console.log('inside event Comp:', this.eventsDataArr);
    
  }

}
