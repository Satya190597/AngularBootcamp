import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'random-card';
	
  user : any;

  constructor(private toastr: ToastrService,private userService: UserService) {

  }

  ngOnInit() {
	  this.loadUserData()
  }

  loadUserData() {
    this.user = null
    this.userService.getUser().subscribe(
		  (user:any) => {
			  this.user = user.results[0];
			  console.table(user);
		  },
		  (error) => {
			  this.toastr.error('Something went Wrong')
		  }
	  )
  }

}
