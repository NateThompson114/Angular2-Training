import { Post } from './post.model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<HttpErrorResponse>();
  database = {
    root: 'https://ng-complete-guide-26e23.firebaseio.com/',
    postEndPoint: 'posts.json'
  };

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    const db = this.database;
    // Send Http request
    return this.http
      .post<{ name: string }>(
        `${db.root + db.postEndPoint}`,
        postData,
        {
          observe: 'response',
          responseType: 'json'
        }
      )
      .subscribe(responseData => {
        console.log(responseData);
      },
        (error: HttpErrorResponse) => {
          this.error.next(error);
        }
      );
  }

  deletePost() {
    const db = this.database;
    return this.http.delete(
      `${db.root + db.postEndPoint}`,
      {
        observe: 'events'
      }
    ).pipe(tap(event => {
      console.log(event);
      if (event.type === HttpEventType.Sent) {
        console.log('Delete has been sent.');
      }
      if (event.type === HttpEventType.Response) {
        console.log('Response from Delete', event.body);
      }
    }));
  }

  fetchPost() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'hello');
    const db = this.database;

    return this.http
      .get<{ [key: string]: Post }>(`${db.root}${db.postEndPoint}`, {
        headers: new HttpHeaders({ 'custom-headers': 'hello' }),
        params: searchParams
      })
      .pipe(
        map(responseData => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          return postArray;
        }),
        catchError(errorRes => {
          // Send to analytics server.
          return throwError(errorRes);
        })
      );
  }

}
