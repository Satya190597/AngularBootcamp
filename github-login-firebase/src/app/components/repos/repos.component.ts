import { Component, OnInit,Input,OnChanges,ChangeDetectorRef } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit,OnChanges {

  @Input()
  repourl:string = null

  public repos:Array<Object>
  constructor(private githubService: GithubService,private ref:ChangeDetectorRef) { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    if(this.repourl!==null) {
      this.githubService.getRepoList(this.repourl).subscribe((result:Array<Object>) => {
        this.repos = result
        this.ref.detectChanges()
      })
    }
  }
}
