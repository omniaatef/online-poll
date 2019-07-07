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
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { fcmTokenModel } from 'src/app/core/models/fcm-token.model';

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
  eventItemFound: VotingStatusModel;
  
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

  fcmTokens:fcmTokenModel[]=[];

  voteResult;

  message;


  ResultShowing;

  showLoadingOnInit: boolean = true;


  result$;

  votingResultPerEvent;


  
  constructor(private route: ActivatedRoute,
              private eventService: EventStorageService,
              private votingService: VotingStorageService,
              private auth :AuthService,
              private voteResultService: VoteResultService,
              private angularFireDB: AngularFireDatabase,
              private messagingService: MessagingService,
               private authService:AuthService
              )
        {

        this.route.params.subscribe(
          (param:Params)=>{
            console.log('params:', param['id']);
            this.index = param['id'];
          }
        );
        }



  change(index){
    this.checkFormDirty = this.eventVotingForm.dirty;
    
  }


  ngOnInit() {
    
    /** ToDo: create FormGroup for the all options */
    this.eventVotingForm = new FormGroup({
      'options': new FormArray([]),
    });
    
    /** ToDo: get voting status if voted before by current user */
    this.getVotingStatusForUser();
    
    /** ToDo: get event details for current event index */
    this.getEventDetails();


    this.result$ = this.voteResultService.getResult(this.index);
    console.log('this.result$ ', this.result$ );
    

     this.result$.forEach(element => {
       if(element){
         this.votingResultPerEvent = element.voteResult.counter;
         console.log('result$ element: ', this.votingResultPerEvent);
       }
       else{
        console.log('result$ element else: ', this.votingResultPerEvent);
       }
    });
    
    debugger;
    console.log('get new result:', this.result$);
    console.log('get new result:', typeof(this.result$));

  }
  
  
  onVoteBtnClick(){
    
    let eventData: VotingStatusModel = {
      email: this.auth.getUserLoggedIn()['email'],
      eventIndex: this.index,
      option: this.eventVotingForm.value
    }

    this.votingService.setVotingData(eventData);

    this.touched = true;
    this.FillMatchedEvents();

    this.touched = false;
    this.checkFormDirty = false;
    
  }
  
  
  FillMatchedEvents(){
    debugger;
    this.matchedEvents = [];
    
    for(let i=0; i<this.eventVotingForm.value['options'].length; i++){
      if(this.targetCounter){
        this.targetCounter.counter[i] = 0; 
      }
    }
    
    let counterLength;
    
    if(this.voteingData){
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
  }
  
  
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
    
    if(this.targetCounter){
      let voteResult: VotingCounterModel = {
        eventIndex:this.index,
        counter:this.targetCounter.counter,
      }
        // this.voteResultService.setVoteResult(voteResult);
        this.voteResultService.setResult(voteResult,this.index)
      }
      
    }

    
      /**ToDo: Get voting status if voted before by current user  */
      getVotingStatusForUser(){
        debugger;
        this.votingService.getVotingStatus().subscribe(
          (res)=>{
          debugger;

            
            let newUserEmail = this.auth.getUserLoggedIn()['email'];
            let newEventIndex = this.index;
            
            this.voteingData = res;
            this.FillMatchedEvents();
            
            if(this.voteingData){
                this.eventItemFound = this.voteingData.find(
                  function(eventEl) {
                    if(eventEl){
                      return eventEl['email'] == newUserEmail && eventEl['eventIndex'] == newEventIndex;
                    }
                  }
                  );
                }
              }
              );
      }
    
      /** ToDo: get event details for current event index */
      getEventDetails(){
        this.eventService.getEventData().subscribe(
          Response => {
            this.eventsData = [];
      
            for (let item of Response){
              this.eventsData.push(item[1]);
            }
      
            this.eventItem = this.eventsData[this.index];
            
            // fill event Voting options array
            if(this.eventItemFound){
              for (let item of this.eventItemFound.option['options']){
                const control = new FormControl(item);
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
      }
  }
