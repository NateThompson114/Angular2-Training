import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';


export class AuthInterceptorService implements HttpInterceptor {
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // if (req.url === 'google.com') {
    //   // Can check and do something
    // }
    // console.log('Request is on its way');

    const modifiedRequest = req.clone({ headers: req.headers.append('Auth', 'xyz') });

    return next.handle(modifiedRequest);

    // return next.handle(modifiedRequest).pipe(tap(event => {
    //   if (event.type === HttpEventType.Response) {
    //     console.log('Response Arrived, body data: ', event.body);
    //   }
    // }));
  }

}
