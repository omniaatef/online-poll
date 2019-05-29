import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  eventForm: FormGroup;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventForm = new FormGroup({
      'eventName': new FormControl('', Validators.required),
      'eventImage': new FormControl('',[Validators.required,Validators.pattern('(https?:\/\/.*\.(?:png|jpg))')]),
      'eventDate': new FormControl('', Validators.required),
      'eventDetails': new FormControl('', Validators.required),
      'eventVotingOptions': new FormArray([], Validators.required),
      'eventInformation': new FormControl('',)
    });
    console.log('inside ngOnInit ',this.eventForm);

  }

  onSubmit(){
    console.log('inside create event ',this.eventForm);
    this.eventService.storeEventData(this.eventForm.value).subscribe(
      Response => {
        console.log('event response', Response);
        this.eventForm.reset();
      },
      error => console.log('event error', error)
    )
  }

  addVotingOption(){
    const voteControl = new FormControl('', Validators.required);
    (<FormArray>this.eventForm.get('eventVotingOptions')).push(voteControl);
  }

  deleteVotingOption(index: number){
    (<FormArray>this.eventForm.get('eventVotingOptions')).removeAt(index);
  }

}
