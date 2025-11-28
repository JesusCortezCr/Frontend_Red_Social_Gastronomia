import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { PublicacionService } from '../../../core/services/publicacion.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../core/models/categoria';
import { CategoriaService } from '../../../core/services/categoria.service';

interface PublicacionRequest{
  titulo:string;
  descripcion:string;
  categoriaId:number;
}


@Component({
  selector: 'app-create-post',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {


  // categoriaSeleccionada(event: any) {
  //   const categoriaId = Number(event.target.value);
  //   const categoria = this.categorias.find((c) => c.id === categoriaId);

  //   if (!categoria) return;

  //   this.form.patchValue({ categoriaId: categoria.id });

  //   this.vistaPrevia.categoria = categoria.nombre;
  // }
  form!: FormGroup;
  vistaPrevia = {
    titulo: '',
    descripcion: '',
    categoria: '',
    imagenUrl: '',
  };
  categorias: Categoria[] = [];
  imagenFile:File | null=null;

  constructor(
    private fb: FormBuilder,
    private publicacionService: PublicacionService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoriaId: [null, Validators.required],
      imagen: [null],
    });

    this.categoriaService.traerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.log('Error al cargar las categorias', err);
      },
    });

    //sincronizacion automatica
    this.form.valueChanges.subscribe((val) => {
      this.vistaPrevia.titulo = val.titulo;
      this.vistaPrevia.descripcion = val.descripcion;
      if (val.categoriaId) {
        const categoria = this.categorias.find(c => c.id === val.categoriaId);
        this.vistaPrevia.categoria = categoria ? categoria.nombre : '';
      } else {
        this.vistaPrevia.categoria = '';
      }
    });
  }

  imagenSeleccionado(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    this.imagenFile=file;
    this.form.patchValue({ imagen: file }); 

    const reader = new FileReader();
    reader.onload = () => {
      this.vistaPrevia.imagenUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  crearPublicacion() {
  if (this.form.invalid || !this.imagenFile) {
    console.log('Formulario inválido o imagen faltante');
    alert('Por favor completa todos los campos y selecciona una imagen');
    return;
  }

  const publicacionRequest: PublicacionRequest = {
    titulo: this.form.value.titulo,
    descripcion: this.form.value.descripcion,
    categoriaId: this.form.value.categoriaId
  };

  console.log('Enviando publicación:', publicacionRequest);
  console.log('📤 Imagen:', this.imagenFile.name);

  this.publicacionService.crearPublicacion(publicacionRequest, this.imagenFile).subscribe({
    next: (response) => {
      console.log('Publicación creada exitosamente:', response);
      alert('¡Publicación creada con éxito!');
      this.router.navigate(["/user/publicaciones"]);
    },
    error: (error) => {
      console.error("Error al crear la publicación:", error);
      console.error('❌ Error del servidor:', error.error);
      alert('Error al crear la publicación. Por favor intenta de nuevo.');
      const mensaje = error.error?.error || 'Error al crear la publicación';
    }
  });
}
}
