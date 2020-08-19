import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { readAndCompressImage } from 'browser-image-resizer';
import { imageConfig } from 'src/utils/config';
import {User} from '../../models/user';
import {CustomValidator} from './custom-validators/custom.validators';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  picture:string = "../../../assets/avatar.png";
  uploadPercent: number = null
  userSignupForm:FormGroup;
  isSubmitted:boolean = false;

  constructor(
    private auth:AuthService,
    private router:Router,
    private db:AngularFireDatabase,
    private storage:AngularFireStorage,
    private toastr:ToastrService
  ) 
  {}

  ngOnInit() {
    this.userSignupForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email],[CustomValidator.emailUnavailable(this.db)]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      instaId: new FormControl('',[Validators.required],[CustomValidator.instaIdUnavailable(this.db)]),
      country: new FormControl('',[Validators.required]),
      bio: new FormControl('',[Validators.maxLength(50)])
    })
  }

  get f() {
    return this.userSignupForm.controls;
  }


  onSubmit() {

    this.isSubmitted = true;

    if(this.userSignupForm.invalid)
      return;

    var user:User = {
      name : this.userSignupForm.get('name').value,
      email : this.userSignupForm.get('email').value,
      instaId :this.userSignupForm.get('instaId').value,
      password : this.userSignupForm.get('password').value,
      country : this.userSignupForm.get('country').value,
      bio : this.userSignupForm.get('bio').value,
      picture: this.picture,
      uid: null
    };
    
    this.auth.signUp(user.email,user.password)
    .then((response) => {
      user.uid = response.user.uid
      this.db.object(`/users/${user.uid}`).set(user)
    })
    .then(()=>{
      this.router.navigateByUrl('/');
      this.toastr.success('Signup success');
    })
    .catch((error)=>{
      console.log(error)
      this.toastr.error('Signup Failed');
    })
  }

  getCountryName() {
    
  }
  async uploadFile(event) {
    const file = event.target.files[0];
    const resizeIamge = await readAndCompressImage(file,imageConfig);
    const filePath = file.name; // Rename the image with uuid.
    const fileRef = this.storage.ref(filePath)
    const task = this.storage.upload(filePath,resizeIamge)
    task.percentageChanges().subscribe((percentage)=> {
      this.uploadPercent = percentage
    })
    task.snapshotChanges().pipe(finalize(()=>{
      fileRef.getDownloadURL().subscribe((url)=>{
        this.picture = url;
        this.toastr.success('Image upload success.')
      })
    }))
    .subscribe();
  }
}
