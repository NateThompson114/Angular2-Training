import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

export interface AuthResponseData {
  idToken: string;	      // A Firebase Auth ID token for the newly created user.
  email: string;          // The email for the newly created user.
  refreshToken: string;	  // A Firebase Auth refresh token for the newly created user.
  expiresIn: string;	    // The number of seconds in which the ID token expires.
  localId: string;	      // The uid of the newly created user.
  registered?: boolean;	// Whether the email is for an existing account.
}

interface UserInfo {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  loggedInUser = new BehaviorSubject<User>(null);
  private tokenExpirationTime: any;

  private authData = {
    url: 'https://identitytoolkit.googleapis.com/v1/accounts',
    signUpAttr: ':signUp',
    logInAttr: ':signInWithPassword',
    key: '?key=AIzaSyCVZwz5GL2bzeGfMk4Z8UiDTzcsvM9SJys'
  };

  constructor(private http: HttpClient, private router: Router) { }

  signUp(userInfo: UserInfo) {
    return this.http.post<AuthResponseData>(
      `${this.authData.url + this.authData.signUpAttr + this.authData.key}`,
      {
        email: userInfo.email,
        password: userInfo.password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap((respData: AuthResponseData) => {
        this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn);
      })
    );
  }

  login(userInfo: UserInfo) {
    return this.http.post<AuthResponseData>(
      `${this.authData.url + this.authData.logInAttr + this.authData.key}`,
      {
        email: userInfo.email,
        password: userInfo.password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap((respData: AuthResponseData) => {
        this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn);
      })
    );
  }

  logout() {
    this.loggedInUser.next(null);
    this.router.navigate(['/auth']);
    // localStorage.clear();
    localStorage.removeItem('userData');
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: Date

    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.loggedInUser.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      console.log(expirationDuration);

      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTime = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user = new User(email, localId, idToken, expirationDate);
    this.loggedInUser.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResp: HttpErrorResponse) {
    let errorMessage = `A unknown error has occured`;
    console.log(errorMessage);


    if (!errorResp.error || !errorResp.error.error) {
      return throwError(errorMessage);
    }

    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS': // The email address is already in use by another account.
        errorMessage = 'This email exist.';
        break;

      case 'OPERATION_NOT_ALLOWED': // Password sign-in is disabled for this project.
        errorMessage = 'Password sign-in is currently disabled.';
        break;

      case 'TOO_MANY_ATTEMPTS_TRY_LATER': // We have blocked all requests from this device due to unusual activity. Try again later.
        errorMessage = 'Too many attempts, please try again later.';
        break;

      case 'EMAIL_NOT_FOUND': // There is no user record corresponding to this identifier. The user may have been deleted.
        errorMessage = 'Email was not found.';
        break;

      case 'INVALID_PASSWORD': // The password is invalid or the user does not have a password.
        errorMessage = 'Your email is incorrect, please check your password and try again.';
        break;

      case 'USER_DISABLED': // The user account has been disabled by an administrator.
        errorMessage = 'Your account has been disabled, please contact admin@test.com for further assistance.';
        break;

      default:
        errorMessage = `A unknown error has occured: ${errorResp.error.error.message}`;
        break;
    }

    return throwError(errorMessage);
  }

}
