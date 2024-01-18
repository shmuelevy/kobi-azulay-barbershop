import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'barbershop-app';

  clientsList:any[]=[]



constructor( private http:HttpClient){}

getData(){
   this.http.get('https://kobi--azulay-default-rtdb.firebaseio.com/clients.json').subscribe(users=>{  
  console.log('users: ',users) 
  this.clientsList.push(users)
})
}


ngOnInit(): void {
  for(let clients of this.clientsList){
    console.log('clients: ',clients) 
  }
}

}
