import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TokenMethodsUtils } from '../../../shared/token-methods';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup = new FormGroup({});
  changeView: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { 
  }

  ngOnInit(): void {
    this.initFormSignIn();
    this.verifyAuthentication();
  }

  initFormSignIn(): void {
    this.loginForm = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  verifyAuthentication(): void {
    if (this.authService.authenticated) {
      this.router.navigate(['/users']);
    }
  }

  signIn(): void {
    this.authService.signIn(this.loginForm.value).subscribe({
      next: (response) => {
        TokenMethodsUtils.saveToken(response.data.accessToken);
        TokenMethodsUtils.saveRefreshToken(response.data.refreshToken);
        this.router.navigate(['/users']);
      },
      error: (err) => {
        
      }
    });
  }

  togglePassword(): void {
    this.changeView = !this.changeView;
  }
}
