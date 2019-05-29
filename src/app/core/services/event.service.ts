import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { EventFormModel } from '../models/event-form.model';

import 'rxjs/Rx';

@Injectable()
export class EventService{

    // eventForm: EventFormModel[];

    constructor(private http: HttpClient){}

    storeEventData(formData: EventFormModel){
       return this.http.post('https://online-poll-84371.firebaseio.com/data.json', formData);

    }

    getEventData(){
        return this.http.get<EventFormModel[]>('https://online-poll-84371.firebaseio.com/data.json')
            .map(
                (eventsData)=>{
                  console.log('inside map',eventsData);
                  const eventEntries = Object.entries(eventsData)
                    console.log('eventdata',eventEntries)
                    return eventEntries

                }
              )
    }
}