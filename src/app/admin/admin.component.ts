import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin.component.html',
  providers: [HomeComponent],
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{

  clientsList:any[]=[]
filteredClientsList: any[] = [];


constructor(private http:HttpClient,private homeComponent:HomeComponent){}


 chooseDay = this.homeComponent.getAllDaysInCurrentMonth();

 dayChoosed:string = ''
 searchBarber:string = ''
searchClient:string = ''

loadData(){
  this.http.get('https://kobi--azulay-default-rtdb.firebaseio.com/clients.json').subscribe((users:any)=>{  
    this.clientsList = Object.values(users);
  console.log('Users List:', this.clientsList);
})
}
delete(name:any,idToDelete:any):void{
 
  if (!idToDelete) {
    console.error('Client key is undefined.');
    return;
  }

 if( window.confirm(`האם למחוק את התור של ${name} ?`)){
this.http.delete(`https://kobi--azulay-default-rtdb.firebaseio.com/clients/${idToDelete}.json`).subscribe(()=>{
 
  alert('תור נמחק')
this.loadData()
console.error('deleting client:', this.clientsList);

},
(error) => {
  console.error('Error deleting client:', error);
})
 }else{
  alert('שגיאה')
 }
}

getClientName() {
  if (this.searchClient) {
    this.http.get('https://kobi--azulay-default-rtdb.firebaseio.com/clients.json').subscribe((users: any) => {
      // Filter the clientsList based on searchBarber
      this.clientsList = Object.values(users).filter((client: any) => 
        client.fullName.includes(this.searchClient) ||(client.fullName.includes(this.searchClient) && client.date === this.dayChoosed && client.barberName === this.searchBarber));
      console.log('Filtered clientsList:', this.clientsList);
      
    });
  } else {
    // If searchBarber is empty, load the original data
    this.loadData();
  }
}

getBarberName() {
  if (this.searchBarber) {
    this.http.get('https://kobi--azulay-default-rtdb.firebaseio.com/clients.json').subscribe((users: any) => {
      // Filter the clientsList based on searchBarber
      this.clientsList = Object.values(users).filter((client: any) => client.barberName === this.searchBarber ||(client.barberName === this.searchBarber && client.date === this.dayChoosed &&  client.fullName.includes(this.searchClient)));
      console.log('Filtered clientsList:', this.clientsList);
      
    });
  } else {
    // If searchBarber is empty, load the original data
    this.loadData();
  }
}

getDate() {
  if (this.dayChoosed) {
    this.http.get('https://kobi--azulay-default-rtdb.firebaseio.com/clients.json').subscribe((users: any) => {
      this.clientsList = Object.values(users).filter((client: any) => client.date === this.dayChoosed && client.barberName === this.searchBarber && client.fullName.includes(this.searchClient));
      
      console.log('Filtered clientsList:', this.clientsList);
    });
  } else {
    this.loadData();
  }
}



ngOnInit(): void {
  this.loadData()
}

}
