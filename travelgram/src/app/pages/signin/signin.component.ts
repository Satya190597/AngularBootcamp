import { Component, OnInit } from '@angular/core';
import  {NgForm} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router} from '@angular/router';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private auth:AuthService,
    private toastr:ToastrService,
    private route:Router
  ) { }

  ngOnInit() {
  }

  onSubmit(f:NgForm) {
    const {email,password} = f.form.value

    this.auth.signIn(email,password)
    .then((response) => {
      this.toastr.success('Signin Success')
      this.route.navigateByUrl('/')
    })
    .catch(error=>{
      this.toastr.error(error.message,"",{
        closeButton:true
      })
    })
  }
}
