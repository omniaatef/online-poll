import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
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
export class EventDetailsComponent implements OnInit , OnChanges {

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

  PrevFormStatus:FormGroup;

  checkFormDirty:boolean = false;

  
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


  // @Input()
  // ck=true;

  ngOnChanges(changes: SimpleChanges){
    console.log("2");
  }

  change(index){
    console.log('previous form status:', this.eventVotingForm.value);
    console.log('previous form status Prev:', this.PrevFormStatus);
    console.log('previous form status dirty:', this.eventVotingForm.dirty);
    
    console.log('inside change: ',index);

    this.checkFormDirty = this.eventVotingForm.dirty;

    


    
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

  this.getVoteResult();

  console.log('check input status: ', this.eventVotingForm);

  // this.PrevFormStatus = new FormGroup(this.eventVotingForm.controls) ;
  

  }



  onVoteBtnClick(){
    console.log('Begin of Click',this.votingService.storedStatus);
    
    debugger;
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


    this.targetCounter =  this.voteResultService.latestVoteResult.find(element => {
      return element.eventIndex == this.index;
    });

    this.VoteResultCounter = this.targetCounter.counter;
    console.log('end of Click',this.votingService.storedStatus);

    
    this.touched = false;
    this.checkFormDirty = false;

    console.log('check form status: ', this.eventVotingForm);

    
  }


  onFillMatchedEvents(){
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

          if(this.touched){
            if((this.index == element.eventIndex) && (this.userEmail != element.email)){
                  this.matchedEvents.push(element);
              }

            else if((this.index == element.eventIndex) && (this.userEmail == element.email)){
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
                  this.voteingData.push(lastMatched);
                  this.notExistFlag = false;
              }
          } 
        
        else{
          if((this.index == element.eventIndex)){
            this.matchedEvents.push(element);
          }
        }
      }
    });


    this.matchedEvents.forEach(item =>{
      debugger;
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


      if(this.targetCounter){
        this.viewVotePercentage = this.votingPercentage(this.matchedEvents.length, this.targetCounter.counter );
        
        let voteResult: VotingCounterModel = {
          eventIndex:this.index,
          counter:this.targetCounter.counter
        }

        this.voteResultService.setVoteResult(voteResult);
      }
    
  }

  votingPercentage(totalCount, votesCount){
    debugger;
    let votesCountPercentage=[];
    for(let i=0; i<votesCount.length; i++){
      votesCountPercentage[i] = (votesCount[i]/totalCount)*100;
    }
    return votesCountPercentage;
  }

  setMyStyles(index) {
    let styles = {
      'width':  this.viewVotePercentage[index] ? this.viewVotePercentage[index]+'%' : '0%',
    };
    return styles;
  }

   getVoteResult(){
      
      this.voteResultService.getVoteResult().subscribe(
        (res)=>{
          console.log('get result success', res);
          
          let targetCounter = res.find(element => {
            return element.eventIndex == this.index;
          });
  
          if(targetCounter){
            this.VoteResultCounter = targetCounter.counter;
          }
          else{
            for(let i=0; i<this.eventVotingForm.value['options'].length; i++){
                this.VoteResultCounter[i] = 0; 
            }
          }
          
        },
        (err)=>{
          console.log('error occured while getting data', err);
          
        }
      );
    
  }





}
