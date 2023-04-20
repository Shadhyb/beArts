import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, combineLatest, finalize } from 'rxjs';
import { Post } from 'src/app/interface/post.interface';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: true }) form!: NgForm;

  postInterface = {
    userId: '',
    title: '',
    description: '',

    imgUrl: '',
  };

  constructor(
    private ps: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private http:HttpClient
  ) {}

  post!: Post;
  subGet: Subscription = new Subscription();
  subPut: Subscription = new Subscription();
  id: any = 0;

  ngOnInit(): void {
    this.subGet = combineLatest(
      this.ps.getPosts(),
      this.route.params
    ).subscribe(([posts, params]) => {
      this.post = posts.find((post: Post) => post.id == params['id']);
      this.id = params['id'];
      this.postInterface.title = this.post.title;
      this.postInterface.description = this.post.description;

      this.postInterface.imgUrl = this.post.imgUrl;
    });
  }

  userId: string = '';
  userName:string = '';

  submit(): void {
    console.log(this.form.value.formPost.title);

    const userJson = localStorage.getItem('user');
    if(!userJson) return;
    const user = JSON.parse(userJson);
    this.userId = user.uid;
    this.userName = user.displayName;

    let data = {
      userId: this.userId,
      title: this.form.value.formPost.title,

      description: this.form.value.formPost.description,
      imgUrl: this.form.value.formPost.imgUrl,
      userName: this.userName,
    };

    console.log(data)

    this.ps
      .putPost(this.id, data)
      .subscribe((data) => console.log(data));

    this.router.navigate(['/posts']);
  }

  ngOnDestroy(): void {
    this.subGet.unsubscribe();
  }

  @Input()
  requiredFileType:string | undefined;

  fileName = '';
  uploadProgress:number | undefined;
  uploadSub: Subscription | undefined;

  onFileSelected(event) {
    const file:File = event.target.files[0];

    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);

        const upload$ = this.http.post("/api/thumbnail-upload", formData, {
            reportProgress: true,
            observe: 'events'
        })
        .pipe(
            finalize(() => this.reset())
        );

        this.uploadSub = upload$.subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded ));
          }
        })
    }
}




reset() {
this.uploadProgress = 0
this.uploadSub = undefined;
}


}
