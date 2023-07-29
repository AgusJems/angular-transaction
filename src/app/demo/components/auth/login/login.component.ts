import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginInterface } from './login-interface';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [ConfirmationService]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    public login: LoginInterface = {};

    constructor(public layoutService: LayoutService, private auth: AuthService, private _router: Router, private confirmationService: ConfirmationService) { }

    postLogin() {
        this.auth.login(this.login.username, this.login.password).then((e) => {
            if (e.status == '200') {
                this.auth.setSession(e.data);
                this._router.navigate(["/"]);
            } else {
                this.confirm();
            }
        })
    }

    confirm() {
        this.confirmationService.confirm({
            message: 'Username atau Password Salah !!!',
            accept: () => {
                //Actual logic to perform a confirmation
            }
        });
    }
}
