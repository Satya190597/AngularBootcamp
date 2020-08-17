import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireDatabase} from '@angular/fire/database';
import { readAndCompressImage } from 'browser-image-resizer';
import { imageConfig } from 'src/utils/config';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  picture:string = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"

  uploadPercent: number = null

  constructor(
    private auth:AuthService,
    private router:Router,
    private db:AngularFireDatabase,
    private storage:AngularFireStorage,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
  }

  onSubmit(f:NgForm) {
    const {email,password,username, country, bio, name} = f.form.value;

    this.auth.signUp(email,password)
    .then((response) => {
      const {uid} = response.user
      this.db.object(`/users/${uid}`).set({
        id:uid,
        name:name,
        instaUser:username,
        bio:bio,
        country:country,
        picture:this.picture
      })
    })
    .then(()=>{
      this.router.navigateByUrl('/');
      this.toastr.success('Signup success');
    })
    .catch((error)=>{
      this.toastr.error('Signup Failed');
    })
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
