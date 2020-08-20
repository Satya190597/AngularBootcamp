import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireDatabase} from '@angular/fire/database';
import { readAndCompressImage } from 'browser-image-resizer';
import { imageConfig } from 'src/utils/config';
// UUID
import {v4} from "uuid";


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  locationName: string;
  description: string;
  picture: string;

  user = null;
  uploadPercent: number = null;

  constructor(
    private db:AngularFireDatabase,
    private storage:AngularFireStorage,
    private toastr:ToastrService,
    private auth:AuthService,
    private router:Router
  ) {
    auth.getUser().subscribe((user)=>{
      this.db.object(`/users/${user.uid}`)
      .valueChanges()
      .subscribe((user) => {
        this.user = user
      })
    })
  }


  ngOnInit() {
  }

  onSubmit() {
    const uid = v4()

    this.db.object(`/posts/${uid}`)
    .set({
      id:uid,
      locationName: this.locationName,
      description: this.description,
      picture: this.picture,
      by: this.user.name,
      instaId: this.user.instaId,
      date: Date.now()
    })
    .then((response)=>{
      this.toastr.success('Post is successfully added')
      this.router.navigateByUrl('/')
    })
    .catch((error) => {
      this.toastr.error('Unable to post..')
    })
  }

  async uploadFile(event) {
    const file = event.target.files[0]

    let resizedImage = await readAndCompressImage(file,imageConfig);

    const filePath = file.name

    const fileRef = this.storage.ref(filePath)

    const task = this.storage.upload(filePath,resizedImage)

    task.percentageChanges()
    .subscribe((percentage) => {
      this.uploadPercent = percentage
    })

    task.snapshotChanges()
    .pipe(finalize(()=>{
      fileRef.getDownloadURL().subscribe(url => {
        this.picture = url
      })
    }))
    .subscribe()
  }
}
