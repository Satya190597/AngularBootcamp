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

  private isValidEmail:Object = {
    empty : false,
    inValid: false,
  }

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  submit(f:NgForm) {
    const {email,password} = f.value;

    this.emailValidation(f);

    if(this.isValidEmail['email'] || this.isValidEmail['inValid'])
      return false;

    this.auth.signUp(email,password).then(result => {
      this.toastr.success('Signup Successfull');
      this.router.navigateByUrl('/');
    })
    .catch(error => {
      this.toastr.error('Sorry Something Went Wrong');
    })
  }

  emailValidation(f:NgForm) {
    const {email} = f.value;
    
    email.length<=0 ? this.isValidEmail['empty'] = true : this.isValidEmail['empty'] = false;

    var pattern = new RegExp("^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$")

    pattern.test(email) ?  this.isValidEmail['inValid'] = false : this.isValidEmail['inValid'] = true;
  }
}
