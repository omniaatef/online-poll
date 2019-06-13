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

  flag = true;
  checkFirstVote: boolean;
  touched: boolean= false;
  notExistFlag : boolean = true;


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


  //   this.votingService.getVotingStatus().subscribe(
  //     (res)=>{
  //         this.voteingData = res;
  //     }
  // );
    this.touched = true;
    this.onFillMatchedEvents();
    this.touched = false;
    
  }


  onFillMatchedEvents(){
    this.matchedEvents = [];

    for(let i=0; i<this.eventVotingForm.value['options'].length; i++){
      this.targetCounter.counter[i] = 0; 
    }

    let counterLength ;
    console.log('inside onFill', this.voteingData);

    
    
    
    this.voteingData.forEach(element => {
      // debugger;
      
      let checkFirstVote = this.voteingData.find(element=>{
        if(element){
          this.userEmail = this.auth.getUserLoggedIn()['email'];
          return element.email == this.userEmail;
        }
      });

        if(element){     
          
          


        if(this.touched){
          console.log('touched');

          if((this.index == element.eventIndex) && (this.userEmail != element.email)){
                this.matchedEvents.push(element);
              }

          else if((this.index == element.eventIndex) && (this.userEmail == element.email)){
              console.log('event that changes:', element);
              element.option['options'] = this.eventVotingForm.value['options'];
              this.matchedEvents.push(element);
              
            }

            else if(checkFirstVote == undefined && this.notExistFlag ){
                let lastMatched: VotingStatusModel;
                lastMatched = {
                  email:this.userEmail,
                  eventIndex: this.index,
                  option: this.eventVotingForm.value
                }

                this.matchedEvents.push(lastMatched);
                this.notExistFlag = false;

            }
          // this.touched = false;
        } 
        
        else{
          if((this.index == element.eventIndex)){
            this.matchedEvents.push(element);
            // if(this.userEmail == element.email){
  
            // }
            // console.log('element', element.option['options']);
          }
        }


        // else if((this.index == element.eventIndex) && (this.userEmail == element.email)){
        //   console.log('event that changes:', element);
        //   element.option['options'] = this.eventVotingForm.value['options'];
        //   this.matchedEvents.push(element);
          
        // }
        // else if(checkFirstVote == undefined){
        //   debugger;
        //   console.log('new email has voted');
        //   // this.matchedEvents.push();
        //   let lastMatched: VotingStatusModel;
        //   lastMatched = {
        //     email:this.userEmail,
        //     eventIndex: this.index,
        //     option: null
        //   }
        //   // this.matchedEvents.push(lastMatched);
        //   // checkFirstVote == null;
        //   console.log('last matched', this.matchedEvents);
          
          

        // }
      }



      // if(element){        
      //   if((this.index == element.eventIndex) && (this.userEmail != element.email)){
      //     this.matchedEvents.push(element);
      //     // if(this.userEmail == element.email){

      //     // }
      //     // console.log('element', element.option['options']);
      //   }
      //   else if((this.index == element.eventIndex) && (this.userEmail == element.email)){
      //     console.log('event that changes:', element);
      //     element.option['options'] = this.eventVotingForm.value['options'];
      //     this.matchedEvents.push(element);
          
      //   }
      //   else if(checkFirstVote == undefined){
      //     debugger;
      //     console.log('new email has voted');
      //     // this.matchedEvents.push();
      //     let lastMatched: VotingStatusModel;
      //     lastMatched = {
      //       email:this.userEmail,
      //       eventIndex: this.index,
      //       option: null
      //     }
      //     // this.matchedEvents.push(lastMatched);
      //     // checkFirstVote == null;
      //     console.log('last matched', this.matchedEvents);
          
          

      //   }
      // }
    });


    this.matchedEvents.forEach(item =>{
      debugger;
      counterLength =  item.option['options'].length;

      if(counterLength && this.flag){
        debugger;
        let counterItem = {
          eventIndex:this.index,
          counter: []
        }
  
        for(let i=0; i<counterLength;i++){
          counterItem.counter.push(0);
        }
  
        this.votingCounter.push(counterItem);
        this.flag = false;

      }


      this.targetCounter = this.votingCounter.find(element=>{
        debugger
        return element.eventIndex == this.index;
      });
      console.log('target Counter ', this.targetCounter.counter);

   


      

      for(let i=0; i<item.option['options'].length; i++){

        if(item.option['options'][i] == true){
          debugger;
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
