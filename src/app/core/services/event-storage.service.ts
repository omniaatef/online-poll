import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { eventForm } from '../models/event-form.model';

import 'rxjs/Rx';

@Injectable()
export class EventStorageService {

    constructor(private http : HttpClient){}

    storeEventData(data: eventForm){
        return this.http.post('https://online-poll-84371.firebaseio.com/eventDetailData.json',data);
    }


    getEventData(){
        return this.http.get<eventForm[]>('https://online-poll-84371.firebaseio.com/eventDetailData.json')
            .map(
                (eventsData)=>{
                  const eventEntries = Object.entries(eventsData)
                    return eventEntries
                }
              )
    }


}












    