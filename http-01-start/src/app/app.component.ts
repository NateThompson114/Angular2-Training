import { PostsService } from './posts.service';
import { Post } from './post.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  database = {
    root: 'https://ng-complete-guide-26e23.firebaseio.com/',
    postEndPoint: 'posts.json'
  };
  loadedPosts: Post[] = [];
  isFetching = false;
  error: Error = null;
  private errorSub: Subscription;

  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(errorMsg => {
      this.error = errorMsg;
    });
    this.fetchPost();
  }

  onCreatePost(data: NgForm) {
    // Send Http request
    const postData = (data.value as Post);
    // this.postService.createAndStorePost(postData.title, postData.content).subscribe(response => {
    //   this.fetchPost();
    //   console.log(response);
    //   data.reset();
    // });
    const request = this.postService.createAndStorePost(postData.title, postData.content);
    this.fetchPost();
    if (!this.error) {
      data.reset();
      this.fetchPost();
    }

  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost();
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePost().subscribe(() => {
      this.loadedPosts = [];
    });

    // for (const post of this.loadedPosts) {
    //   this.postService.deletePost(post.id).subscribe(() => {
    //     this.loadedPosts = [];
    //   });
    // }

  }

  private fetchPost() {
    this.isFetching = true;
    this.error = null;
    this.postService.fetchPost().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, (error: HttpErrorResponse) => {
      this.isFetching = false;
      this.error = error;
    });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}
