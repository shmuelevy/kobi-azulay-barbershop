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
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{

  clientsList:{}={}

constructor(private http:HttpClient){}


loadData(){
  this.http.get('https://kobi--azulay-default-rtdb.firebaseio.com/clients.json').subscribe(users=>{  
 this.clientsList=users
 console.log('usersList: ',this.clientsList)
})
}
start(name:any,idToDelete:any){
 if( window.confirm(`האם למחוק את התור של ${name} ?`)){
this.http.delete(`https://kobi--azulay-default-rtdb.firebaseio.com/clients/${idToDelete}.json`).subscribe((data:any)=>{
  this.clientsList=data
alert('תור נמחק')
this.loadData()

},
(error) => {
  console.error('Error deleting client:', error);
})
 }else{
  alert('שגיאה')
 }
}
ngOnInit(): void {
  this.loadData()
}

}
