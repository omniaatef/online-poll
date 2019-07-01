import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { EventStorageService } from 'src/app/core/services/event-storage.service';
import { eventForm } from 'src/app/core/models/event-form.model';
import { Router } from '@angular/router';
import { MessagingService } from 'src/app/shared/services/messaging.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  createEventForm : FormGroup;

  constructor(private EventService: EventStorageService, private router: Router,private MessagingService: MessagingService) {

   }

  ngOnInit() {
    this.createEventForm = new FormGroup({
      'eventName': new FormControl('', Validators.required),
      'image': new FormControl('',[Validators.required,Validators.pattern('(https?:\/\/.*\.(?:png|jpg))')]),
      'date': new FormControl('', Validators.required),
      'details': new FormControl('',  Validators.required),
      'eventQuestion': new FormControl('',  Validators.required),
      'options': new FormArray([], [Validators.required, Validators.minLength(2)]),
      'info': new FormControl('')
    });

  }


  onSubmit(){
    this.EventService.storeEventData(this.createEventForm.value).subscribe(
      (res:Response)=> 
      {
        this.createEventForm.reset();
        
      },
      (err:Error) => console.log('Inside Erro', err),
      ()=>{
        this.EventService.getEventData().subscribe(
          (res)=>{
            this.router.navigate([`/events/event-details/${(res.length)-1}`]);
          }
        )
      }
    );
  }

  onAddOption(){
    const control = new FormControl('');
    (<FormArray>this.createEventForm.get('options')).push(control);
  }

  onDeleteOption(index: number){
    (<FormArray>this.createEventForm.get('options')).removeAt(index);
  }

}
