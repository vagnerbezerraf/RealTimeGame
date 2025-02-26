import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public hubConn: signalR.HubConnection;
  constructor() { 
    this.hubConn = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7287/gameHub')
    .build();

    this.hubConn.on('PlayerJoined', (players) => {
      console.log('Player joined', players);
    });

    this.hubConn.on('GameStateUpdated', (players) => {
      console.log('Game state updated', players);
    });

    this.hubConn.start().catch(err => console.error(err));
  }
  joinGame(playerName: string) {
    this.hubConn.invoke('JoinGame', playerName).catch(err => console.error(err));
  }

  playerClicked(timeTaken: number) {
    this.hubConn.invoke('PlayerClicked', timeTaken).catch(err => console.error(err));
  }
  
  leaveGame() {
    this.hubConn.invoke('LeaveGame').catch(err => console.error(err));
  }
}
