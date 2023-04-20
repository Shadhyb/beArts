import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDemoFormNormalLoginComponent } from '../login/login/login.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDemoFormValidateReactiveComponent } from '../signup/signup/signup.component';



@NgModule({
  declarations: [
    NzDemoFormNormalLoginComponent,
    NzDemoFormValidateReactiveComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzButtonModule,
    RouterModule
  ]
})
export class AuthModule { }
