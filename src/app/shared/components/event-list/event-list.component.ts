import { Component, OnInit, Input } from '@angular/core';
import { EventStorageService } from 'src/app/core/services/event-storage.service';
import { eventForm } from 'src/app/core/models/event-form.model';
import { VotingStorageService } from 'src/app/core/services/voting-storage.service';
import { VotingStatusModel } from 'src/app/core/models/voting-status.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  constructor(private eventService: EventStorageService, private votingDataService: VotingStorageService) { }

   eventsData: eventForm[];

  //  usersCount: VotingStatusModel[] = [];

  ngOnInit(): void {
    this.eventService.getEventData().subscribe(
      Response => {
          this.eventsData = [];
          for (let item of Response){
              this.eventsData.unshift(item[1]);
          }

          // this.eventsData.reverse();
          // console.log('home this.eventsData after', this.eventsData);
      },
      error => console.log('home events error', error)
  );


  /** Get number of users who are voted */
  // this.votingDataService.getVotingStatus().subscribe(
  //   (res)=>{
  //     debugger;
  //     this.usersCount = res;
  //     console.log('event data:', this.eventsData);
      
  //   //   var eventItem = this.usersCount.find(
  //   // //     function(eventEl) {
  //   // //     if(eventEl){
  //   // //         return eventEl['eventIndex'] == this.usersCount;
  //   // //     }
  //   // // }
  //   // );
      
  //   },
  //   (err)=> console.log('err while get users count')
    
  // );
  }
  

}
