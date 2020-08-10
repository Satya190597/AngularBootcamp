import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:Object = {};
  userName:string = 'satya190597';
  private error:Array<string> = [];

  constructor(private githubService:GithubService) { }

  ngOnInit() {
    this.githubService.getUser(this.userName).subscribe((result)=>{
      this.user = result
    })
  }

  submit() {
    this.githubService.getUser(this.userName).subscribe((result)=> {
      this.user = result
    })
  }

}
