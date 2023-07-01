import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'reactive-app';
  myForm: FormGroup;

  constructor(fb: FormBuilder){
    this.myForm = fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'id':['', Validators.compose([Validators.required,this.idValidator])],
      'address': fb.group({
        'street': [''],
        'state': ['',Validators.required],
        'pinCode':['']
      })
    });

    this.myForm.valueChanges.subscribe((form : any)=>{
      console.log('form changed to :', form);
    });

    this.myForm.get('address')?.valueChanges.subscribe((form : any)=>{
      console.log('address changed to',form);
    });

  }

  onSubmit(value : string){
    console.log(value);
  }

  idValidator(control : FormControl) : {[s: string]: boolean} | null{
    if(!control.value.match(/^123/))
      return {invalidId : true};

    return null;
  }


  ngOnInit(){

  }

}
