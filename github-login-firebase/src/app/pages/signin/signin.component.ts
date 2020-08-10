import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private auth:AuthService,
    private router:Router,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
  }

  submit(f:NgForm) {

    const {email,password} = f.value

    this.auth.signIn(email,password).then(result => {
      this.toastr.success('Signin Successful.')
      this.router.navigateByUrl('')
    })
    .catch(error => {
      this.toastr.error('Invalid email or password.')
    })

  }

}
