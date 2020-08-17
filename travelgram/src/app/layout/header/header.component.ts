import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email = null;

  constructor(
    private auth:AuthService,
    private toastr: ToastrService,
    private router: Router 
  ) { 
    auth.getUser().subscribe((user)=>{
      this.email = user.email
    })
  }

  ngOnInit() {
  }

  async handleSignOut() {
    try{
      await this.auth.logOut();
      this.router.navigateByUrl('/signin');
      this.toastr.info('Logout successfully');
      this.email = null;
    }
    catch(error) {
      this.toastr.error("Problem in sign-out.");
    }
  }
}
