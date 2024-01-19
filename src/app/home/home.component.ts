import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
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
  
  hours2:any[]=[
    '10:00',
    '10:20',
    '10:40',
    '11:00',
    '11:20',
    '11:40',
    '12:00',
    '12:20',
    '12:40',
    '13:00',
    '13:20',
    '13:40',
    '14:00',
    '14:20',
    '14:40',
    '15:00',
    '15:20',
    '15:40',
    '16:00',
    '16:20',
    '16:40',
    '17:00',
    '17:20',
    '17:40',
    '18:00',
    '18:20',
    '18:40',
    '19:00',
    '19:20',
    '19:40',
  ] 
  hours1:any[]=[
    '10:00',
    '10:15',
    '10:30',
    '10:45',
    '11:00',
    '11:15',
    '11:30',
    '11:45',
    '12:00',
    '12:15',
    '12:30',
    '12:45',
    '13:00',
    '13:15',
    '13:30',
    '13:45',
    '14:00',
    '14:15',
    '14:30',
    '14:45',
    '15:00',
    '15:15',
    '15:30',
    '15:45',
    '16:00',
    '16:15',
    '16:30',
    '16:45',
    '17:00',
    '17:15',
    '17:30',
    '17:45',
    '18:00',
    '18:15',
    '18:30',
    '18:45',
    '19:00',
    '19:15',
    '19:30',
    '19:45',
  ]
  
hours:any[]=[]

formApprove:boolean = true;

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
  
  }
  }

  onRadioChange1(){
   this.hours = this.hours1
  }
  onRadioChange2(){
    this.hours = this.hours2
   }
restForm(){
  this.phoneNumber='';
    this.selectedBarber=''
    this.selectedDay=''
    this.selectedHour=''
    this.fullName=''
}
approveForm(){
 
    this.formApprove = true
}

ngOnInit(): void {
 
 this.approveForm()
}

}
