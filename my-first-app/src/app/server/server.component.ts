import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {
  id: number = 10;
  status: string = "offine";

  constructor(){
    this.status = Math.random()>0.5?"offline":"online";
  }

  getServerStatus(){
    return this.status;
  }

  getColor(){
    return this.getServerStatus() === "offline"?"red":"green";
  }


}
