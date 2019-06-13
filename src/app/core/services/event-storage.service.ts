import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { eventForm } from '../models/event-form.model';

import 'rxjs/Rx';

@Injectable()
export class EventStorageService {

    constructor(private http : HttpClient){}

    storeEventData(data: eventForm){
        console.log('inside store Event Data', data);
        return this.http.post('https://online-poll-84371.firebaseio.com/EventData.json',data);
    }


    getEventData(){
        return this.http.get<eventForm[]>('https://online-poll-84371.firebaseio.com/EventData.json')
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












    