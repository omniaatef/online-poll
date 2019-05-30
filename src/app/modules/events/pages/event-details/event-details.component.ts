import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventStorageService } from 'src/app/core/services/event-storage.service';
import { eventForm } from 'src/app/core/models/event-form.model';
import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { VotingStorageService } from 'src/app/core/services/voting-storage.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  eventsData: eventForm[];
  index :number;
  eventItem: eventForm;
  eventVotingForm:FormGroup;
  progressCounter:number = 0;

  constructor(private route: ActivatedRoute,
              private eventService: EventStorageService,
              private votingService: VotingStorageService,
              private auth :AuthService
              ) { }


  ngOnInit() {
    // console.log('Token: ',this.auth.getToken());

    


    this.eventVotingForm = new FormGroup({
      'options': new FormArray([]),
    });

    
    
    this.eventService.getEventData().subscribe(
      Response => {
        this.eventsData = [];
        for (let item of Response){
          this.eventsData.push(item[1]);
        }
        console.log('event details this.eventsData after', this.eventsData);
        this.eventItem = this.eventsData[this.index];
        console.log('event item ', this.eventItem);
        
        // fill event Voting options array
        for (let item of this.eventItem.options){
          const control = new FormControl('');
          (<FormArray>this.eventVotingForm.get('options')).push(control);
        }
        console.log('voting options', this.eventVotingForm.value);


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


  onVoteSelected(event){
    if ( event.target.checked ) {
      console.log('event');
      this.progressCounter +=  1;
      // console.log('this.progressCounter:', this.progressCounter);
 }

  console.log('voting options', this.eventVotingForm.value);

  

    
  }

}
