import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private _authenticated: boolean = false;
    private jwthelper = new JwtHelperService();
    private ApiUrl: string;

    public userlogin: Observable<any>;
    private userloginSubject?: BehaviorSubject<any>;

    public token: Observable<string>;
    private tokenSubject: BehaviorSubject<string>;

    constructor(
        private http: HttpClient,

        private router: Router
    ) {
        this.ApiUrl = environment.apiUrl;
        this.userloginSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')!));
        this.userlogin = this.userloginSubject.asObservable();

        this.tokenSubject = new BehaviorSubject<string>(localStorage.getItem('token')!);
        this.token = this.tokenSubject.asObservable();
    }

    async login(email: any, _password: any): Promise<any> {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        let body = JSON.stringify({
            email: email, password: _password
        });
        let rh : any = null;

        try {
            rh = await lastValueFrom(this.http.post<any>(this.ApiUrl + "login-user", body, httpOptions,));
        }
        catch (e) {
            rh.success = false;
            rh.message = "Terjadi Kesalahan. Cobalah Beberapa Saat Lagi";
            rh.data = null;
        }

        return rh;
    }

    async getDataKaryawan(token: any): Promise<any> {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            })
        };
        let rh : any = null;

        try {
            rh = await lastValueFrom(this.http.get<any>(this.ApiUrl + "user/detail-profile", httpOptions,));
        }
        catch (e) {
            rh.success = false;
            rh.message = "Terjadi Kesalahan. Cobalah Beberapa Saat Lagi";
            rh.data = null;
        }

        return rh;
    }

    setSession(_user: any) {
        console.log(_user);
        var token = _user.access_token;
        localStorage.setItem('token', _user.access_token);
        localStorage.setItem('user', JSON.stringify(_user.user));
        this.userloginSubject!.next(_user.user);
        this.tokenSubject.next(token);
    }

    isLoggedIn() {
        var user = localStorage.getItem('user');
        if (user == null) return false;

        var token = localStorage.getItem('token');
        if (token == null) return false;

        var isExpired = this.jwthelper.isTokenExpired(token);
        if (isExpired) return false;

        return true;
    }

    logout() {

            this.router.navigate(['/auth/login']);

            localStorage.removeItem('user');
            localStorage.removeItem('token');

            this.userloginSubject!.next(null!);
            this.tokenSubject.next(null!);
    }
}
