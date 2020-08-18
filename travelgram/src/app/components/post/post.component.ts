import { Component, OnInit, Input } from '@angular/core';
import { faThumbsUp,faThumbsDown,faShareSquare} from '@fortawesome/free-regular-svg-icons';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()
  post;

  faThumbsUp = faThumbsUp
  faThumbsDown = faThumbsDown
  faShareSquare = faShareSquare

  uid = null;
  upvote = 0;
  downvote = 0;

  constructor(private db:AngularFireDatabase,private auth: AuthService) {
    this.auth.getUser().subscribe((user)=>{
      this.uid = user.uid
    })
   }

  ngOnInit() {
  }

  upvotePost() {
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      upvote:1
    })
  }
  downotePost() {
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      downvote:1
    })
  }

  getInstaUrl() {
    return `https://instagram.com/${this.post.instaId}`
  }
}
