import { CommonModule, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AdminComponent } from '../admin/admin.component';

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
  selectedDay:string | null = null;
  selectedHour:string=''
  adminClientsList:any[]=[]


  days1:any[]=[]
  days2:any[]=[]
daysToChoose:any[]=[]
  
toggleFridayHours:any[]=[]

hours11:any[]=[
'09:00',
'09:15',
'09:30',
'09:45',
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
]
hours22:any[]=[
  '09:00',
  '09:20',
  '09:40',
  '10:00',
  '10:20',
  '10:40',
  '11:00',
  '11:20',
  '11:40',
  '12:00',
  '12:20',
  '12:40',
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

dateExist:boolean=false
// { date: Date, dayName: string }[]


  constructor( private http:HttpClient){}


  ngOnInit(): void {
 
    this.approveForm()

    this.days1 = this.getAllDaysInCurrentMonth();
    this.days2 = this.getAllDaysInCurrentMonth();
    this.getClients()

   }
  
getClients(){
  this.http.get('https://kobi--azulay-default-rtdb.firebaseio.com/clients.json').subscribe((data:any)=>{
    this.adminClientsList = Object.values(data)
  })
}

   getAllDaysInCurrentMonth(): any[] {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const days: any[] = [];

    const hebrewDays = ['יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום שישי', 'שבת'];

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const currentDay = new Date(currentYear, currentMonth, day);
      const dayName = hebrewDays[currentDay.getDay()];

      if (dayName !== 'שבת') {
        const formattedDate = formatDate(currentDay, 'dd/MM/yy', 'en-US');
        days.push({ date: formattedDate + '-' + dayName });
      }
    }

    return days;
  }


  onDaySelected(): void {
    if (this.selectedDay) {
      const selectedHours = this.switchHoursArray(this.selectedDay);
      console.log('Selected hours:', selectedHours);
      this.hours = selectedHours
    }
  }

detectBarberHours(){
  if(this.selectedBarber==='קובי'){
this.toggleFridayHours = this.hours11;
console.log('קובי: '+this.toggleFridayHours)

  }
  if(this.selectedBarber==='חזי'){
    this.toggleFridayHours = this.hours22
    console.log('חזי: '+this.toggleFridayHours)
  }
}

  switchHoursArray(selectedDay: string): string[] {
    const dayNameMatch = selectedDay.match(/-(.*)$/);
    const dayName = dayNameMatch ? dayNameMatch[1] : '';
this.detectBarberHours()
    // Map day names to the corresponding arrays
    const hoursByDay: Record<string, string[]> = {
      'יום ראשון': this.hours1,
      'יום שני': this.hours1,
      'יום שלישי': this.hours1,
      'יום רביעי': this.hours1,
      'יום חמישי': this.hours1,
      'יום שישי': this.toggleFridayHours,
    };

    return hoursByDay[dayName] || [];
  }



  //add client
  approve():void{
    if(this.selectedHour&&this.fullName&&this.phoneNumber){
    alert(`${this.fullName} קבע תור עם ${this.selectedBarber} ביום ${this.selectedDay} בשעה ${this.selectedHour}`)

const client:any = {
  date:this.selectedDay,
  fullName:this.fullName,
  phoneNumber:this.phoneNumber,
  barberName:this.selectedBarber,
  time:this.selectedHour,
}

this.http.post('https://kobi--azulay-default-rtdb.firebaseio.com/clients.json',client).subscribe((response:any)=>{
  console.log(response);
  const clientId = response.name;
  client.id = clientId;
  this.http.put(`https://kobi--azulay-default-rtdb.firebaseio.com/clients/${clientId}.json`, client)
  .subscribe(() => {
    console.log(`Client with ID ${clientId} updated with the generated ID`);
  });
  console.log(`Client ID: ${client.id}`);
  this.restForm()
  this.getClients()
},
(error)=>{
  console.log(error)
}
)
  
  }else{
    alert('ודא כי מוזן ערך בכל השדות')
  }
  }


  

  onRadioChange1(){
    this.daysToChoose = this.days1
   this.hours = this.hours1
   this.selectedDay =  ''
   this.selectedHour = ''

  }
  onRadioChange2(){
    this.daysToChoose = this.days2
    this.hours = this.hours2
    this.selectedDay =  ''
   this.selectedHour = ''
   }
restForm(){
  this.phoneNumber='';
    this.selectedBarber=''
    this.selectedDay=''
    this.selectedHour=''
    this.fullName=''
}
approveForm(){
  if(this.fullName&&this.phoneNumber){
    this.formApprove = !this.formApprove
  }
}

checkIfDateAvailble(barber:any,day:any,hour:any){
  for(let client of this.adminClientsList){
    if(barber === client.barberName && day === client.date && hour === client.time){
      alert('תור תפוס,בחר שעה אחרת')
      this.dateExist = true
this.selectedHour = ''
    }
  }
}

isHourDisabled(hour: string): boolean {
  for (let client of this.adminClientsList) {
    if (this.selectedBarber === client.barberName && this.selectedDay === client.date && hour === client.time
    ) {

      return true; 
    }
  }
  return false; 
}




}
