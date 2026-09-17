import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router'

@Injectable({
    providedIn:'root'
})


export class AuthService {
    private router = inject(Router)
    private mockUser = {userName: 'admin', password: 'admin123'}
    private mockToken = 'ini-token-jwt-hardcode-12345'

    login(userName:string, password:string): boolean{
        if(userName === this.mockUser.userName && password === this.mockUser.password){
            localStorage.setItem('token', this.mockToken)
            this.router.navigate(['/home'])
            return true;
        }else{
            this.router.navigate(['/login'])
            return false;
        }
    }
    getToken():string|null{
        return localStorage.getItem('token')
    }
    isLoggedIn():boolean{
        return !!this.getToken()
    }

    logout(){
        localStorage.removeItem('token')
        this.router.navigate(['/login'])
    }
}