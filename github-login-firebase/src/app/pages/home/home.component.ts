import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:Object = {name:'satya190597',repos_url:'https://api.github.com/users/Satya190597/repos'};
  userName:string = null;
  private error:Array<string> = [];

  constructor(private githubService:GithubService) { }

  ngOnInit() {
  }

  submit() {
    this.githubService.getUser(this.userName).subscribe((result)=> {
      this.user = result
      console.log(this.user)
    })
  }

}
