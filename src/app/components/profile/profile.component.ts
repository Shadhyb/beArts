import { Component, Injectable, Injector, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirebaseAuthService } from '../auth/firebase-auth.service';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { FirebaseDbService } from 'src/app/service/firebase-db.service';

import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { style } from '@angular/animations';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  validateForm: UntypedFormGroup;


  submitForm(): void {
    console.log('submit', this.validateForm.value);
    let bio = this.validateForm.value.comment
    return bio
  }



  private authSubject = new BehaviorSubject<any>(null);
;
  constructor(private http:HttpClient, private fbA:FirebaseAuthService, private fbdb:FirebaseDbService, private fb: UntypedFormBuilder) {
    this.validateForm = this.fb.group({

      comment: ['']
    });

  }

  user$ = this.authSubject.asObservable();

  ngOnInit(): void {
  }

userName(){
  return this.fbA.auth.currentUser?.displayName
}
avatar(){
 return this.fbA.auth.currentUser?.photoURL
}
userNameAsyncValidator = (control: UntypedFormControl) =>
new Observable((observer: Observer<ValidationErrors | null>) => {
  setTimeout(() => {
    if (control.value === 'JasonWood') {
      // you have to return `{error: true}` to mark it as an error event
      observer.next({ error: true, duplicated: true });
    } else {
      observer.next(null);
    }
    observer.complete();
  }, 1000);
});





}
