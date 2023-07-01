import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit{
  serverName: string = "Name of the server";
  allowNewServer: boolean = false;
  serverCreationStatus: string = "No server was created";
  serverCreated: boolean = false;
  servers = ['Sever 1','Server 2'];
  constructor(){
    setTimeout(() => {
      this.allowNewServer = true;
    }, 3000);
  }

  ngOnInit(): void {
      
  }

  onCreateServer(){
    this.servers.push(this.serverName);
    this.serverCreated = true;
    this.serverCreationStatus = "Server was created, the name of the server is: "+this.serverName;
  }

  onServerUpdate(event : any){
    console.log(event);
    this.serverName = (<HTMLInputElement>event.target).value;
  }


}
