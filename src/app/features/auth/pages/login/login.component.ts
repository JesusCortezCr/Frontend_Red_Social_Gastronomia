import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, RouterLink, Router, Route } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule, NgIf,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

onSubmit() {
  if(this.loginForm.invalid) return;
  this.authService.login(this.loginForm.value).subscribe({
    next:(res)=>{
      localStorage.setItem('token', res.token);
      localStorage.setItem('rol',res.rol);
      localStorage.setItem('correo',res.correo);
      if(res.rol==='ROLE_USUARIO'){
        this.router.navigateByUrl('/user')
      }else{
        this.router.navigate(['/home-post'])
      }
    },
    error: (err)=>{
      this.error=err.error || 'Credenciales incorrectas';
    }
  })
}
error: string="Credenciales incorrectas";
loginForm: FormGroup;

constructor(private fb: FormBuilder , private authService : AuthService, private router : Router){
  this.loginForm=this.fb.group(
    {
      correo: ['',[Validators.required,Validators.email]],
      password : ['', [Validators.required,Validators.minLength(5)]],
    },
  )
}

}
