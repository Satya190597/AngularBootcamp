import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  submit(f:NgForm) {
    const {email,password} = f.value
    this.auth.signUp(email,password).then(result => {
      this.toastr.success('Signup Successfull')
      this.router.navigateByUrl('/')
    })
  }
}
