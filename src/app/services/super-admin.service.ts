import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class SuperAdminService {
  constructor(private _http: Http) {}

  checkLogin(username: string, password: string): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });

    const data: object = { username: username, password: password };

    return (
      this._http
        .post(environment.apiURL + 'SuperAdmin/CheckLogin.php', data, options)
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }
}
