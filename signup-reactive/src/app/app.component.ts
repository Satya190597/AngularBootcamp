import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { PasswordChecker } from './custom-validator/password-checker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
 })

export class AppComponent implements OnInit {
	title = 'signup-reactive';
	
	registerForm: FormGroup;
	isSubmitted: false;

	constructor(private formBuilder: FormBuilder) {
	}
	
	ngOnInit(){

		this.registerForm = this.formBuilder.group({
			firstName : ['',Validators.required],
			lastName : ['',Validators.required],
			email : ['',[Validators.required,Validators.email]],
			password : ['',[Validators.required,Validators.minLength(6)]],
			confirmPassword : ['',Validators.required],
			termsAndCondition: [false,Validators.requiredTrue]
		},{
			validators : PasswordChecker('password','confirmPassword')
		})

	}
	
	get h() {

		return this.registerForm.controls;

	}

	register() {
		
		this.isSubmitted = true;
		if(this.registerForm.valid) {
			alert(JSON.stringify(this.registerForm.value));
			this.registerForm.reset();
			this.isSubmitted = false;
		}

	}

	reset() {

		this.registerForm.reset();
		this.isSubmitted = false;

	}
}
