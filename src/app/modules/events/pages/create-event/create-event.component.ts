import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { EventStorageService } from 'src/app/core/services/event-storage.service';
import { eventForm } from 'src/app/core/models/event-form.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  createEventForm : FormGroup;
  // eventData: eventForm[];

  constructor(private EventService: EventStorageService) { }

  ngOnInit() {
    this.createEventForm = new FormGroup({
      'eventName': new FormControl('', Validators.required),
      'image': new FormControl('',[Validators.required,Validators.pattern('(https?:\/\/.*\.(?:png|jpg))')]),
      'date': new FormControl('', Validators.required),
      'details': new FormControl('',  Validators.required),
      'options': new FormArray([], Validators.required),
      'info': new FormControl('')
    });

    console.log('inside Submit Form', this.createEventForm.value);


    // this.eventData = this.createEventForm.value;
    // console.log('type ofd ', typeof(this.eventData));
  }


  onSubmit(){
    console.log('inside Submit Form', this.createEventForm.value);
    this.EventService.storeEventData(this.createEventForm.value).subscribe(
      (res:Response)=> 
      {
        console.log('inside response', res);
        this.createEventForm.reset();
      },
      (err:Error) => console.log('Inside Erro', err)
    );
  }

  onAddOption(){
    console.log('on add option');
    const control = new FormControl('');
    (<FormArray>this.createEventForm.get('options')).push(control);
    
  }

  onDeleteOption(index: number){
    (<FormArray>this.createEventForm.get('options')).removeAt(index);
  }

}
