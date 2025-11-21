import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private fb:FormBuilder, private authService:AuthService, private router : Router){
    this.registroForm=this.fb.group(
      {
        nombre: ['',[Validators.required]],
        apellido: ['',[Validators.required]],
        correo: ['',[Validators.required,Validators.email]],
        password: ['',[Validators.required,Validators.minLength(5)]]
      }
    )
  }

onSubmitRegistro() {
  if(this.registroForm.invalid) return;
  this.authService.registro(this.registroForm.value).subscribe({
    next:(usuario)=>{
      console.log("Usuario creado exitosamente",usuario);
      this.router.navigateByUrl('/auth/login')
    },
    error:(err)=>{
      this.error=err.error || 'Error al registrar la cuenta';
    }
  })
}
error:string="Valores incorrectos";
registroForm:FormGroup;
}
