import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseAuthService } from '../auth/firebase-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy {

  constructor(private fbAuth: FirebaseAuthService) { }

  sub = new Subscription()
  isLoggedIn = false;
  ngOnInit(): void {
    this.sub = this.fbAuth.isLoggedIn$.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn)
  }
  signOut(){
    this.fbAuth.signOut();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
