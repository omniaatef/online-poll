import { Component, OnInit, Input } from '@angular/core';
import { EventStorageService } from 'src/app/core/services/event-storage.service';
import { eventForm } from 'src/app/core/models/event-form.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  constructor(private eventService: EventStorageService) { }

   eventsData: eventForm[];

  ngOnInit(): void {
    this.eventService.getEventData().subscribe(
      Response => {
          this.eventsData = [];
          for (let item of Response){
              this.eventsData.push(item[1]);
          }
          console.log('home this.eventsData after', this.eventsData);
      },
      error => console.log('home events error', error)
  );
  }


  

}
