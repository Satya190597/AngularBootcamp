import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

import { ToastrService} from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService
  ) {
    auth.getUser().subscribe((user) => {
      if(user!==null)
        this.email = user.email
    })
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout().then((result)=>{
      this.email = null;
      this.toastr.success('Logout Successfully')
      this.router.navigateByUrl('signin')
    })
    .catch(error => {
      this.toastr.error('Something went wrong.')
    })
  }

}
