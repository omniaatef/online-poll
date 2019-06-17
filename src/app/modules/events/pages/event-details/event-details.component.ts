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
import { VoteResultService } from 'src/app/core/services/vote-result.service';

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
  
  targetCounter:VotingCounterModel;

  flag = true;
  checkFirstVote: boolean;
  touched: boolean= false;
  notExistFlag : boolean = true;

  viewVotePercentage = [];

  voteResults:VotingCounterModel[];
  VoteResultCounter = [] ;

  // myStyles = {
  //   'width': '100%'
  //   }


  constructor(private route: ActivatedRoute,
              private eventService: EventStorageService,
              private votingService: VotingStorageService,
              private auth :AuthService,
              private voteResultService: VoteResultService
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

    /*Get event If Voted by current user */
    this.votingService.getVotingStatus().subscribe(
      (res)=>{
        
        let newUserEmail = this.auth.getUserLoggedIn()['email'];
        let newEventIndex = this.index;

          this.voteingData = res;
          this.onFillMatchedEvents();

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
          }
        }
        else{
            for (let item of this.eventItem.options){
            const control = new FormControl('');
            (<FormArray>this.eventVotingForm.get('options')).push(control);
          }
        }
      }
  );

  
  // var myVar = setInterval(function(){
   
    
  // }, 1000);

  this.getVoteResult();


  }



  onVoteSelected(){
    this.userEmail = this.auth.getUserLoggedIn()['email'];
    this.eventIndex = this.index;
    let eventData: VotingStatusModel = {
      email: this.userEmail,
      eventIndex: this.eventIndex,
      option: this.eventVotingForm.value
    }
    this.votingService.setVotingData(eventData);
    
    this.touched = true;
    this.onFillMatchedEvents();
    debugger;
    // this.getVoteResult();
    // let latestVoteResult = this.voteResultService.getCurrentVoteResult();
    debugger;

    console.log('this target counter: ',this.index, this.voteResultService.latestVoteResult);
    
    
    this.targetCounter =  this.voteResultService.latestVoteResult.find(element => {
      return element.eventIndex == this.index;
    });
   console.log('xx:',this.targetCounter);

   this.VoteResultCounter = this.targetCounter.counter;
   console.log('VoteResultCounter :',this.VoteResultCounter);

   

    
    this.touched = false;
    
  }


  onFillMatchedEvents(){
    // debugger;
    this.matchedEvents = [];

    for(let i=0; i<this.eventVotingForm.value['options'].length; i++){
      if(this.targetCounter){
        this.targetCounter.counter[i] = 0; 
      }
    }

    let counterLength;
    
    
    this.voteingData.forEach(element => {

      /** check if this user voted before */
      let checkFirstVote = this.voteingData.find(element=>{
        if(element){
          this.userEmail = this.auth.getUserLoggedIn()['email'];
          return (element.email == this.userEmail) && (element.eventIndex == this.index);
        }
      });

        if(element){
          // debugger;

          if(this.touched){
            if((this.index == element.eventIndex) && (this.userEmail != element.email)){
                  this.matchedEvents.push(element);
              }

            else if((this.index == element.eventIndex) && (this.userEmail == element.email)){
                console.log('event that changes:', element);
                element.option['options'] = this.eventVotingForm.value['options'];
                this.matchedEvents.push(element);
                
              }

              else if(checkFirstVote == undefined && this.notExistFlag ){
                debugger;
                  let lastMatched: VotingStatusModel;
                  lastMatched = {
                    email:this.userEmail,
                    eventIndex: this.index,
                    option: this.eventVotingForm.value
                  }

                  this.matchedEvents.push(lastMatched);
                  this.voteingData.push(lastMatched);
                  this.notExistFlag = false;
              }
          } 
        
        else{
          if((this.index == element.eventIndex)){
            this.matchedEvents.push(element);
          }
          else{
            // debugger;
          //   console.log('new event without votes');
          //   counterLength =  this.eventsData[this.index].options.length;

          //   if(counterLength){
          //     let counterItem = {
          //       eventIndex:this.index,
          //       counter: []
          //     }
        
          //     for(let i=0; i<counterLength;i++){
          //       counterItem.counter.push(0);
          //     }

          //     this.targetCounter = counterItem; 
            
          // }
        }
        }
      }
    });


    this.matchedEvents.forEach(item =>{
      counterLength =  item.option['options'].length;

      if(counterLength && this.flag){
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
        return element.eventIndex == this.index;
      });

      for(let i=0; i<item.option['options'].length; i++){

        if(item.option['options'][i] == true){
          this.targetCounter.counter[i]++;
        }
      }
    });


      debugger;
      this.viewVotePercentage = this.votingPercentage(this.matchedEvents.length, this.targetCounter.counter );
    console.log('inject el func here');

    let voteResult: VotingCounterModel = {
      eventIndex:this.index,
      counter:this.targetCounter.counter}
    
    

    // this.voteResultService.storeVoteResult(voteResult);
    this.voteResultService.setVoteResult(voteResult);
    // this.voteResultService.storeVoteResult(voteResult).subscribe();
    
    
  }

  votingPercentage(totalCount, votesCount){
    
    let votesCountPercentage=[];
    for(let i=0; i<votesCount.length; i++){
      votesCountPercentage[i] = (votesCount[i]/totalCount)*100;
    }
    debugger;
    return votesCountPercentage;
  }

  setMyStyles(index) {
    let styles = {
      'width':  this.viewVotePercentage[index] ? this.viewVotePercentage[index]+'%' : '0%',
    };
    return styles;
  }

   getVoteResult(){
    debugger;
      
      this.voteResultService.getVoteResult().subscribe(
        (res)=>{
          console.log('get result success', res);
          
          let targetCounter = res.find(element => {
            return element.eventIndex == this.index;
          });
  
          console.log('target counter', targetCounter.counter);
  
          this.VoteResultCounter = targetCounter.counter;
  
          
        },
        (err)=>{
          console.log('error occured while getting data', err);
          
        }
      );
    
  }





}
