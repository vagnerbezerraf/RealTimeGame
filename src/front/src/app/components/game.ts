import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { FluidModule } from 'primeng/fluid';
interface Player {
  id: string;
  name: string;
  accumulatedTime: number;
  isActive: boolean;
  isWinner: boolean;
}
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    FormsModule,
    FluidModule,
    CommonModule,
    ButtonModule],
  template: `
  <p-fluid>  
    <div class="flex flex-col md:flex-row gap-8">
      <div class="md:w-1/2">
          <div class="card">    
            <div class="font-semibold text-xl mb-4">New Game</div>  

            <div *ngIf="!isConnected" class="inline-flex gap-4" >              
                <input [(ngModel)]="playerName" pInputText type="text" placeholder="Name" pTooltip="Your name" />
                <p-button (click)="joinGame()" type="button" label="Join Game" pTooltip="Click to proceed" />
            </div>


            <div *ngIf="isConnected">
              <!-- <p-button pButton type="button" label="Leave Game" (click)="leaveGame()" /> -->
              <div class="font-semibold text-xl mb-4">Connected Players</div>
              <div *ngFor="let player of players">
                {{ player.name }} - {{ player.accumulatedTime }}s - {{ player.isActive ? 'Playing' : 'Waiting' }} - {{ player.isWinner ? 'Winner' : '' }}
              </div>

              <p-button pbutton type="button" label="Click Now!!!" *ngIf="isActivePlayer" (click)="clickButton()" />
            </div>


        </div>
      </div>
    </div>
  </p-fluid>
  `
})
export class Game {
  playerName = '';
  isConnected = false;
  players: Player[] = [];
  isActivePlayer = false;

  constructor(private gameService: GameService) {
    this.gameService.hubConn.on('PlayerJoined', (players: Player[]) => {
      this.players = players;
    });

    this.gameService.hubConn.on('GameStateUpdated', (players: Player[]) => {
      this.players = players;
      console.log(this.gameService.hubConn.connectionId);
      this.isActivePlayer = players.some((p) => p.id === this.gameService.hubConn.connectionId && p.isActive);
    });

    this.gameService.hubConn.on('PlayerLeft', (players: Player[]) => {
      this.players = players;
    });
  }

  joinGame() {
    this.gameService.joinGame(this.playerName);
    this.isConnected = true;
  }

  clickButton() {
    const timeTaken = Math.random() * 2; // Simulate time taken
    this.gameService.playerClicked(timeTaken);
  }

  leaveGame() {
    this.gameService.leaveGame();
    this.isConnected = false;
  }


  items: MenuItem[] = [];

  loading = [false, false, false, false];

  ngOnInit() {
      this.items = [{ label: 'Update', icon: 'pi pi-refresh' }, { label: 'Delete', icon: 'pi pi-times' }, { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' }, { separator: true }, { label: 'Setup', icon: 'pi pi-cog' }];
  }

  load(index: number) {
      this.loading[index] = true;
      setTimeout(() => (this.loading[index] = false), 1000);
  }
}
