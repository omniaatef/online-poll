import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventStorageService } from 'src/app/core/services/event-storage.service';
import { eventForm } from 'src/app/core/models/event-form.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  eventsData: eventForm[];
  index :number;
  eventItem: eventForm;

  constructor(private route: ActivatedRoute,
              private eventService: EventStorageService) { }

  ngOnInit() {


    this.eventService.getEventData().subscribe(
      Response => {
          this.eventsData = [];
          for (let item of Response){
              this.eventsData.push(item[1]);
          }
          console.log('event details this.eventsData after', this.eventsData);
          this.eventItem = this.eventsData[this.index];
          console.log('event item ', this.eventItem);


      },
      error => console.log('event details events error', error)
  );


  this.route.params.subscribe(
    (param:Params)=>{
      console.log('params:', param['id']);
      this.index = param['id'];
    }
  );

  }

}
