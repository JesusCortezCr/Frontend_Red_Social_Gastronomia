import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../../../core/services/auth.service";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  registroForm: FormGroup;
  error = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ["", [Validators.required]],
      apellido: ["", [Validators.required]],
      correo: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmitRegistro() {
    if (this.registroForm.invalid) return;

    this.authService.registro(this.registroForm.value).subscribe({
      next: (usuario) => {
        console.log("Usuario creado exitosamente", usuario);
        this.router.navigate(["/auth/login"]);
      },
      error: (err) => {
        this.error = err.error || "Error al registrar la cuenta";
      },
    });
  }
}
