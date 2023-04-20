import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DettagliCardComponent } from './components/dettagli-card/dettagli-card.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { NzDemoTableRowSelectionAndOperationComponent } from './components/zorro/table.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { TopMembersComponent } from './components/top-members/top-members.component';
import { NzDemoFormNormalLoginComponent } from './components/auth/login/login/login.component';
import { NzDemoFormValidateReactiveComponent } from './components/auth/signup/signup/signup.component';

import { AuthGuard } from './components/auth/auth.guard';
import { HomePageComponent } from './components/home-page/home-page.component';

import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,

  },

  {
    path: 'posts',
    component: NzDemoTableRowSelectionAndOperationComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'details/:id',
    component: DettagliCardComponent,
  },{
    path: 'edit/:id',
    component: EditPostComponent,
    canActivate:[AuthGuard]
  },{
    path: 'nuovo-post',
    component: CreatePostComponent,
    canActivate:[AuthGuard]
  },{
    path: 'top-members',
    component: TopMembersComponent,

  },{
    path: 'login',
    component: NzDemoFormNormalLoginComponent,

  },{
    path: 'signup',
    component: NzDemoFormValidateReactiveComponent
  },
  {
    path:'profile',
    component: ProfileComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
