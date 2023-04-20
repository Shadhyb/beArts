import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { FirebaseAuthService } from '../../firebase-auth.service';
import { FirebaseDbService } from 'src/app/service/firebase-db.service';

@Component({
  selector: 'nz-demo-form-validate-reactive',
  template: `
    <div class="cont">
    <img src="" alt="">
      <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
        <nz-form-item>
          <nz-form-label [nzSpan]="7" nzRequired>Username</nz-form-label>
          <nz-form-control
            [nzSpan]="12"
            nzHasFeedback
            nzValidatingTip="Validating..."
            [nzErrorTip]="userErrorTpl"
          >
            <input
              nz-input
              formControlName="userName"
              placeholder="async validate try to write JasonWood"
            />
            <ng-template #userErrorTpl let-control>
              <ng-container *ngIf="control.hasError('required')"
                >Please input your username!</ng-container
              >
              <ng-container *ngIf="control.hasError('duplicated')"
                >The username is redundant!</ng-container
              >
            </ng-template>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSpan]="7" nzRequired>E-mail</nz-form-label>
          <nz-form-control
            [nzSpan]="12"
            nzHasFeedback
            [nzErrorTip]="emailErrorTpl"
          >
            <input
              nz-input
              formControlName="email"
              placeholder="email"
              type="email"
            />
            <ng-template #emailErrorTpl let-control>
              <ng-container *ngIf="control.hasError('email')"
                >The input is not valid E-mail!</ng-container
              >
              <ng-container *ngIf="control.hasError('required')"
                >Please input your E-mail!</ng-container
              >
            </ng-template>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSpan]="7" nzRequired>Password</nz-form-label>
          <nz-form-control
            [nzSpan]="12"
            nzHasFeedback
            nzErrorTip="Please input your password!"
          >
            <input
              nz-input
              type="password"
              formControlName="password"
              (ngModelChange)="validateConfirmPassword()"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSpan]="7" nzRequired
            >Confirm Password</nz-form-label
          >
          <nz-form-control
            [nzSpan]="12"
            nzHasFeedback
            [nzErrorTip]="passwordErrorTpl"
          >
            <input
              nz-input
              type="password"
              formControlName="confirm"
              placeholder="confirm your password"
            />
            <ng-template #passwordErrorTpl let-control>
              <ng-container *ngIf="control.hasError('required')"
                >Please confirm your password!</ng-container
              >
              <ng-container *ngIf="control.hasError('confirm')"
                >Password is inconsistent!</ng-container
              >
            </ng-template>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSpan]="7">imgUrl</nz-form-label>
          <nz-form-control
            [nzSpan]="12"
            nzHasFeedback
            nzErrorTip="Please write something here!"
          >
            <input nz-input formControlName="imgUrl" placeholder="Url" />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item nz-row [nzJustify]="'center'">
          <div nz-col>
            <button
              nz-button
              nzType="primary"
              [disabled]="!validateForm.valid || a"
            >
              Submit
            </button>
            <button nz-button (click)="resetForm($event)">Reset</button>
          </div>
        </nz-form-item>
      </form>
    </div>
  `,

  styles: [
    `
      .cont {
        display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 550px;
      padding: 40px;
      transform: translate(-50%, -50%);

      box-sizing: border-box;
      box-shadow: 0 15px 25px rgba(0,0,0,.6);
      border-radius: 10px;}
        img{
        width: 250px;
        margin-bottom: 30px
      }

      [nz-form] {
        min-width: 500px;

      }
      @media only screen and (max-width:575px) {
        [nz-form]{
          min-width: unset;
        }}

      button{
        background:#e91e63;
        border:none;
      }
      button:hover{
        color:greenyellow
      }
    `,
  ],
})
export class NzDemoFormValidateReactiveComponent {
  validateForm: UntypedFormGroup;

  a = false;

  submitForm(): void {
    this.a = true;
    let data = {
      email: this.validateForm.value.email,
      password: this.validateForm.value.password,
      name: this.validateForm.value.userName,
      imgUrl: (this.validateForm.value.imgUrl)? this.validateForm.value.imgUrl: 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png',
    };
    this.fbA
      .signUp(data.email, data.password, data.name, data.imgUrl)
      .then((user: any) =>{
        console.log(user.data);
        this.fbDb.post(user.uid, data.name, data.email, data.imgUrl)
      }
      )
      .then(() =>
        this.fbA.logIn({ email: data.email, password: data.password })
      );
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.validateForm.controls['confirm'].updateValueAndValidity()
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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

  confirmValidator = (
    control: UntypedFormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private fb: UntypedFormBuilder,
    private fbA: FirebaseAuthService,
    private fbDb: FirebaseDbService
  ) {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [this.confirmValidator]],
      imgUrl: [''],
    });
  }
}
