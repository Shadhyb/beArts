import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, combineLatest, count } from 'rxjs';
import { FirebaseDbService } from 'src/app/service/firebase-db.service';
import { PostsService } from 'src/app/service/posts.service';
import { FirebaseAuthService } from '../auth/firebase-auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-top-members',
  templateUrl: './top-members.component.html',
  styleUrls: ['./top-members.component.scss'],
})
export class TopMembersComponent implements OnInit {
  constructor(private fbDb: FirebaseDbService, private ps: PostsService, private fbA: FirebaseAuthService, private http: HttpClient) {}

ngOnInit(): void {


}
}

