import { Component } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tic-tac-toe';
  winMessage: string = '';
  isCross: boolean = false;
  itemArray : string[] = new Array(9).fill('empty');

  constructor(private toastr:ToastrService) {}

  handleClick = (itemNumber: number) => {
    if(this.winMessage) {
      return this.toastr.info(this.winMessage);
    }
    if(this.itemArray[itemNumber]==='empty') {
      this.itemArray[itemNumber] = this.isCross ? 'cross' : 'circle';
      this.isCross = !this.isCross;
    }
    else {
      return this.toastr.info('Already Filled');
    }
    this.checkIsWinner();
  }

  checkIsWinner = () => {
    if(this.itemArray[0] === this.itemArray[1] &&
      this.itemArray[0] === this.itemArray[2] &&
      this.itemArray[0] !== 'empty') {
      this.winMessage = `${this.itemArray[0].toUpperCase()} Won The Game`
    }
    else if(this.itemArray[3] === this.itemArray[4] &&
      this.itemArray[3] === this.itemArray[5] &&
      this.itemArray[3] !== 'empty') {
      this.winMessage = `${this.itemArray[3].toUpperCase()} Won The Game`
    }
    else if(this.itemArray[6] === this.itemArray[7] &&
      this.itemArray[6] === this.itemArray[8] &&
      this.itemArray[6] !== 'empty') {
      this.winMessage = `${this.itemArray[5].toUpperCase()} Won The Game`
    }
    else if(this.itemArray[0] === this.itemArray[3] &&
      this.itemArray[0] === this.itemArray[6] &&
      this.itemArray[0] !== 'empty') {
      this.winMessage = `${this.itemArray[0].toUpperCase()} Won The Game`
    }
    else if(this.itemArray[1] === this.itemArray[4] &&
      this.itemArray[1] === this.itemArray[7] &&
      this.itemArray[1] !== 'empty') {
      this.winMessage = `${this.itemArray[1].toUpperCase()} Won The Game`
    }
    else if(this.itemArray[2] === this.itemArray[5] &&
      this.itemArray[2] === this.itemArray[8] &&
      this.itemArray[2] !== 'empty') {
      this.winMessage = `${this.itemArray[2].toUpperCase()} Won The Game`
    }
    else if(this.itemArray[0] === this.itemArray[4] &&
      this.itemArray[0] === this.itemArray[8] &&
      this.itemArray[0] !== 'empty') {
      this.winMessage = `${this.itemArray[0].toUpperCase()} Won The Game`
    }
    else if(this.itemArray[2] === this.itemArray[4] &&
      this.itemArray[2] === this.itemArray[6] &&
      this.itemArray[2] !== 'empty') {
      this.winMessage = `${this.itemArray[2].toUpperCase()} Won The Game`
    }
    else if (this.itemArray.indexOf('empty')==-1) {
      this.winMessage = `Match is draw.`
    }
  }
  
  reloadGame = () => {
    this.winMessage = '';
    this.isCross = false;
    this.itemArray = new Array(9).fill('empty');
  }
}
