import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.authService.saveUserSession(res);

        localStorage.setItem('token', res.token); 
        localStorage.setItem('rol', res.rol);
        localStorage.setItem('correo', res.correo);

        //verificacion para el id del usuario
        const userId = (res as any).id ?? (res as any).userId ?? (res as any).usuarioId;
        if (userId !== undefined && userId !== null) {
          localStorage.setItem('userId', userId.toString());
        }

        localStorage.setItem('userId', res.id.toString());
        
        if (res.rol === 'ROLE_USUARIO') {
          this.router.navigateByUrl('/user');
        } else if (res.rol === 'ROLE_MODERADOR') {
          this.router.navigate(['/moderador']);
        } else if (res.rol === 'ROLE_ADMINISTRADOR') {
          this.router.navigate(['/administrador']);
        }
      },
      error: (err) => {
        this.error = err.error || 'Credenciales incorrectas';
      },
    });
  }
}