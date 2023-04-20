import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  Subject,
  Subscription,
  combineLatest,
} from 'rxjs';
import { Post } from 'src/app/interface/post.interface';
import { PostsService } from 'src/app/service/posts.service';
import { FirebaseAuthService } from '../auth/firebase-auth.service';

@Component({
  selector: 'app-dettagli-card',
  templateUrl: './dettagli-card.component.html',
  styleUrls: ['./dettagli-card.component.scss'],
})
export class DettagliCardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private ps: PostsService,
    private router: Router,
    private notification: NzNotificationService,
    private fbAuth: FirebaseAuthService,
  ) {}

  a = 'url("")';

  post!: Post;
  sub: Subscription = new Subscription();
  subLog: Subscription = new Subscription();
  post$ = new Subject<Post | null>();


  cont: number = 0;

  uid:string = '';
  seiTu: boolean = true;
  fav: any;

  isLoggedIn: boolean = false;

  ngOnInit() {
    this.subLog = this.fbAuth.isLoggedIn$.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn)
    this.sub = combineLatest(this.ps.getPosts(), this.route.params, this.ps.getAllFav()).subscribe(
      ([posts, params, favs]) => {
        this.post = posts.find((post: Post) => post.id == params['id']);
        this.a = `url("${this.post.imgUrl}")`;

        console.log(favs);

        this.cont = favs.filter((fav:any) => fav.postId == params['id']).length;

        const userJson = localStorage.getItem('user');
        if(!userJson) return;
        const user = JSON.parse(userJson);
        if( this.post.userId === user.uid) this.seiTu = true;
        this.uid = user.uid;

        this.fav = favs.find((fav:any) => (fav.postId == params['id'] && fav.userId == this.uid));

        console.log(this.fav);

        (this.fav)? this.fillOutline = 'fill' : this.fillOutline = 'outline' ;


        console.log(this.seiTu);
      }
    );
  }

  fillOutline: 'fill' | 'outline' = 'outline';

  toggle(){
    if(this.fillOutline == 'outline'){
      this.ps.fav({'userId': this.uid, 'postId': String(this.post.id)}).subscribe(()=>{
        this.cont++;
        this.fillOutline = 'fill';
      })
    }else{
      this.ps.delFav(this.fav.id).subscribe(()=>{
        this.cont--;
        this.fillOutline = 'outline';
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  buttonClick(data: { a: any; id: number }) {
    switch (data.a) {
      case 'eye':
        this.router.navigate([`/details`, data.id]);
        break;
      case 'edit':
        this.router.navigate([`/edit`, data.id]);
        break;
      case 'delete':
        this.ps.deletePost(data.id).subscribe((data) => {
          console.log(data);
          this.router.navigate([`/posts`]);
          this.createNotification('warning');
        });
        break;
    }
  }

  createNotification(type: string): void {
    this.notification.create(
      type,
      "IL POST E' STATO ELIMINATO CON SUCCESSO",
      '',
      {
        nzStyle: {
          width: '450px',
          marginLeft: '-265px',
        },
        nzClass: 'test-class',
      }
    );
  }
}
