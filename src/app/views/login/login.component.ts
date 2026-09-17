import { Component, inject} from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.scss'],
standalone: true,
imports: [ReactiveFormsModule]
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

  errorMessage = '';

  private authService = inject(AuthService);

  onLogin() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    if(this.loginForm.valid){
        const isLoggedIn = this.authService.login(username, password);
        if (!isLoggedIn) {
            this.errorMessage = 'Username atau password salah!';
        } else {
            this.errorMessage = '';
        }
    } else {
        this.errorMessage = 'Username dan password harus diisi!';
    }
    }
}