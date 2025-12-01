import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { Categoria } from '../../../../core/models/categoria';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  
  categorias: Categoria[] = [];
  categoriasFiltradas: Categoria[] = [];
  
  nuevaCategoria = {
    nombre: '',
    descripcion: ''
  };

  mostrarModal: boolean = false;
  
  textoBusqueda: string = '';

  totalCategorias: number = 0;
  categoriasActivas: number = 0;
  contenidoAsociado: number = 0;
  ultimos7Dias: number = 0;

  mensaje: string = '';
  mostrarMensaje: boolean = false;
  tipoMensaje: 'success' | 'error' = 'success';

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.traerCategorias().subscribe({
      next: (categorias: Categoria[]) => {
        this.categorias = categorias;
        this.categoriasFiltradas = categorias;
        this.calcularEstadisticas();
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  calcularEstadisticas(): void {
    this.totalCategorias = this.categorias.length;
    this.categoriasActivas = this.categorias.length;
    this.contenidoAsociado = Math.floor(Math.random() * 100);
    this.ultimos7Dias = Math.floor(Math.random() * 10);
  }

  buscarCategoria(): void {
    if (!this.textoBusqueda.trim()) {
      this.categoriasFiltradas = this.categorias;
      return;
    }

    const texto = this.textoBusqueda.toLowerCase();
    this.categoriasFiltradas = this.categorias.filter(cat => 
      cat.nombre.toLowerCase().includes(texto) || 
      cat.descripcion.toLowerCase().includes(texto)
    );
  }

  abrirModal(): void {
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.limpiarFormulario();
  }

  agregarCategoria(): void {
    if (!this.nuevaCategoria.nombre.trim()) {
      this.mostrarAlerta('El nombre de la categoría es obligatorio', 'error');
      return;
    }

    if (!this.nuevaCategoria.descripcion.trim()) {
      this.mostrarAlerta('La descripción es obligatoria', 'error');
      return;
    }

    this.categoriaService.agregarCategoria(this.nuevaCategoria).subscribe({
      next: (categoria: Categoria) => {
        this.mostrarAlerta('Categoría agregada exitosamente', 'success');
        this.limpiarFormulario();
        this.cerrarModal();
        this.cargarCategorias();
      },
      error: (error) => {
        console.error('Error al agregar categoría:', error);
        this.mostrarAlerta('Error al agregar la categoría. Intente nuevamente.', 'error');
      }
    });
  }

  limpiarFormulario(): void {
    this.nuevaCategoria = {
      nombre: '',
      descripcion: ''
    };
  }

  mostrarAlerta(mensaje: string, tipo: 'success' | 'error'): void {
    this.mensaje = mensaje;
    this.tipoMensaje = tipo;
    this.mostrarMensaje = true;

    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 3000);
  }
}
