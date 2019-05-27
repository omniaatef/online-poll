import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  eventForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.eventForm = new FormGroup({
      'eventName': new FormControl('',),
      'eventImage': new FormControl('',),
      'eventDate': new FormControl('',),
      'eventDetails': new FormControl('',),
      'eventVotingOptions': new FormArray([],),
      'eventInformation': new FormControl('',)
    })
  }

  onSubmit(){
    console.log('inside create event ',this.eventForm);
  }

  addVotingOption(){
    const voteControl = new FormControl('');
    (<FormArray>this.eventForm.get('eventVotingOptions')).push(voteControl);
  }

  deleteVotingOption(index: number){
    (<FormArray>this.eventForm.get('eventVotingOptions')).removeAt(index);
  }

}
