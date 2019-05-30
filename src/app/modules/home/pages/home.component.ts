import { Component, OnInit } from '@angular/core';
import { eventForm } from 'src/app/core/models/event-form.model';
import { EventStorageService } from 'src/app/core/services/event-storage.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    // eventsData: eventForm[];


    constructor(private eventService: EventStorageService ) { }

    ngOnInit(): void {

        // this.eventService.getEventData().subscribe(
        //     Response => {
        //         this.eventsData = [];
        //         for (let item of Response){
        //             this.eventsData.push(item[1]);
        //         }
        //         console.log('home this.eventsData after', this.eventsData);
        //     },
        //     error => console.log('home events error', error)
        // );
       
    }
}
