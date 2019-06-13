import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventStorageService } from 'src/app/core/services/event-storage.service';
import { eventForm } from 'src/app/core/models/event-form.model';
import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { VotingStorageService } from 'src/app/core/services/voting-storage.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { VotingStatusModel } from 'src/app/core/models/voting-status.model';
import { VotingCounterModel } from 'src/app/core/models/voting-counter.model';
import { element } from '@angular/core/src/render3';
import { debug } from 'util';

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
  optionCheckd: boolean = false;
  
  userEmail: string ;
  eventIndex: number ;
  
  voteingData: VotingStatusModel[] = [];
  eventItemFounded: VotingStatusModel;
  
  matchedEvents: VotingStatusModel[] = [];
  votingCounter :VotingCounterModel[] = [
  ];
  
  // eventVotingCounter:FormGroup;

  targetCounter:VotingCounterModel;


  constructor(private route: ActivatedRoute,
              private eventService: EventStorageService,
              private votingService: VotingStorageService,
              private auth :AuthService
              )
        {

        this.route.params.subscribe(
          (param:Params)=>{
            console.log('params:', param['id']);
            this.index = param['id'];
          }
        );
        }


  ngOnInit() {

    this.eventVotingForm = new FormGroup({
      'options': new FormArray([]),
    });

    // this.eventVotingCounter = new FormGroup({
    //   'options': new FormArray([]),
    // });

    /*Get event If Voted by current user */
    this.votingService.getVotingStatus().subscribe(
      (res)=>{
        
        let newUserEmail = this.auth.getUserLoggedIn()['email'];
        let newEventIndex = this.index;

          this.voteingData = res;
          let matchedEventsIndexes = this.onFillMatchedEvents();
          console.log('matchedEventsIndexes', matchedEventsIndexes);
          


            this.eventItemFounded = this.voteingData.find(
              function(eventEl) {
              if(eventEl){
                  return eventEl['email'] == newUserEmail && eventEl['eventIndex'] == newEventIndex;
              }
          }
          );
      }
  );
  /**End of Voted by current user */


    
    /* Get Event Details for current event Index */
    this.eventService.getEventData().subscribe(
      Response => {
        this.eventsData = [];
        for (let item of Response){
          this.eventsData.push(item[1]);
        }
        this.eventItem = this.eventsData[this.index];
        
        // fill event Voting options array
        if(this.eventItemFounded){
          for (let item of this.eventItemFounded.option['options']){
            const control = new FormControl(item);
            const controlCount = new FormControl(0);
            (<FormArray>this.eventVotingForm.get('options')).push(control);

            // (<FormArray>this.eventVotingCounter.get('options')).push(controlCount);

          }

          // console.log('new form array', this.eventVotingCounter);
          
          
        }
        else{
            for (let item of this.eventItem.options){
            const control = new FormControl('');
            (<FormArray>this.eventVotingForm.get('options')).push(control);
          }
        }
      }
  );




  }


  onVoteSelected(event){
    this.userEmail = this.auth.getUserLoggedIn()['email'];
    this.eventIndex = this.index;
    let eventData: VotingStatusModel = {
      email: this.userEmail,
      eventIndex: this.eventIndex,
      option: this.eventVotingForm.value
    }
    this.votingService.setVotingData(eventData);
    
    this.onFillMatchedEvents();
    
  }


  onFillMatchedEvents(){
    this.matchedEvents = [];
    debugger;
    let counterLength ;
    console.log('inside onFill', this.voteingData);
    
    this.voteingData.forEach(element => {
      debugger;
      if(element){        
        if(this.index == element.eventIndex){
          this.matchedEvents.push(element);
          console.log('element', element.option['options']);
        }
      }
    });


    this.matchedEvents.forEach(item =>{

      counterLength =  item.option['options'].length;

      if(counterLength){
      
        let counterItem = {
          eventIndex:this.index,
          counter: []
        }
  
        for(let i=0; i<counterLength;i++){
          counterItem.counter.push(0);
        }
  
        this.votingCounter.push(counterItem);
      }


      this.targetCounter = this.votingCounter.find(element=>{
        debugger
        return element.eventIndex == this.index;
      });
      console.log('target Counter ', this.targetCounter.counter);


      for(let i=0; i<item.option['options'].length; i++){

        if(item.option['options'][i] == true){
          this.targetCounter.counter[i]++;
        }
        else{
          
        }
      }

        console.log('targetCounter outSide For', this.targetCounter.counter);
    });


    return this.matchedEvents;

  }





}
