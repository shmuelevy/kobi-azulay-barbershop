import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  fullName:string=''
  phoneNumber:any;
  selectedBarber:string=''
  selectedDay:string=''
  selectedHour:string=''
    days:any[]=[
      '14/1/24-יום ראשון',
      '15/1/24-יום שני',
      '16/1/24-יום שלישי',
      '17/1/24-יום רביעי',
      '18/1/24-יום חמישי',
    ]
  
  hours:any[]=[
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
  ]
  
  constructor( private http:HttpClient){}
  
  approve():void{
    if(this.selectedHour&&this.fullName&&this.phoneNumber){
    alert(`${this.fullName} קבע תור עם ${this.selectedBarber} ביום ${this.selectedDay} בשעה ${this.selectedHour}`)

const client = {
  שם:this.fullName,
  נייד:this.phoneNumber,
  ספר:this.selectedBarber,
  יום:this.selectedDay,
  שעה:this.selectedHour,
}

this.http.post('https://kobi--azulay-default-rtdb.firebaseio.com/clients.json',client).subscribe((response)=>{
  console.log(response);
},
(error)=>{
  console.log(error)
}
)

    const indexToRemove = this.hours.indexOf(this.selectedHour);
      if (indexToRemove !== -1) {
        this.hours.splice(indexToRemove, 1);
      }
    this.phoneNumber='';
    this.selectedBarber=''
    this.selectedDay=''
    this.selectedHour=''
    this.fullName=''
  }
  }
}
