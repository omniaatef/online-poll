import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';
import { EventFormModel } from 'src/app/core/models/event-form.model';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    eventsData: EventFormModel[];

    constructor(private eventService: EventService ) { }

    ngOnInit(): void {

        this.eventService.getEventData().subscribe(
            Response => {
                // this.eventsData = Response['1'];

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
