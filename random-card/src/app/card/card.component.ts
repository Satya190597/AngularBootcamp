import { Component, OnInit, Input } from '@angular/core';
import {
  faEnvelope,
  faMapMarkedAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  @Input()
  user;

  faEnvelope = faEnvelope
  faMapMarkedAlt = faMapMarkedAlt
  faPhone = faPhone
  
  ngOnInit() {
  }

}
