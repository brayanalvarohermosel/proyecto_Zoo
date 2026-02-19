import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from '../../../models/animal.model/animal.model';
import { AnimalesService } from '../../../services/animales.service';

@Component({
  selector: 'app-detalle-animal',
  templateUrl: './detalle-animal.component.html',
  styleUrls: ['./detalle-animal.component.css']
})
export class DetalleAnimalComponent implements OnInit {

  /** Animal cargado desde el backend */
  animal: Animal | null = null;

  /** Indica si los datos están cargando */
  cargando: boolean = true;

  /** Mensaje de error mostrado en la vista */
  mensajeError: string = '';

  /**
   * Constructor del componente.
   * 
   * @param animalesService Servicio para obtener, eliminar y gestionar animales
   * @param route Servicio para acceder a los parámetros de la ruta
   * @param router Servicio para navegación entre rutas
   * @param cdr Servicio para forzar detección de cambios manualmente
   */
  constructor(
    private animalesService: AnimalesService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Obtiene el ID desde la ruta y carga el animal correspondiente.
   * @returns void
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.cargarAnimal(id);
    } else {
      this.mensajeError = 'No se proporcionó un ID válido';
      this.cargando = false;
    }
  }

  /**
   * Carga los datos de un animal por su ID.
   * @param id Identificador del animal a consultar
   * @returns void
   */
  cargarAnimal(id: string): void {
    this.cargando = true;
    
    this.animalesService.getAnimalById(id).subscribe({
      next: (data) => {
        this.animal = data;
        this.cargando = false;

        // Forzamos detección de cambios por si la actualización ocurre fuera del ciclo normal
        this.cdr.detectChanges();

        console.log('Animal cargado:', data);
      },
      error: (error) => {
        console.error('Error al cargar animal:', error);
        this.mensajeError = 'No se pudo cargar el animal. Verifica que el ID sea correcto.';
        this.cargando = false;
      }
    });
  }

  /**
   * Navega a la vista de edición del animal actual.
   * @returns void
   */
  editarAnimal(): void {
    if (this.animal?.id) {
      this.router.navigate(['/animales/editar', this.animal.id]);
    }
  }

  /**
   * Elimina el animal actual tras confirmación del usuario.
   * @returns void
   */
  eliminarAnimal(): void {
    if (!this.animal) return;
    
    const confirmacion = confirm(`¿Estás seguro de que quieres eliminar a ${this.animal.nombre}?`);
    
    if (confirmacion && this.animal.id) {
      this.animalesService.deleteAnimal(this.animal.id).subscribe({
        next: (response) => {
          console.log('Animal eliminado:', response);
          alert(`✅ ${this.animal?.nombre} ha sido eliminado correctamente`);
          this.router.navigate(['/animales']);
        },
        error: (e) => {
          console.error('Error al eliminar:', e);
          this.mensajeError = `No se pudo eliminar a ${this.animal?.nombre}. Intenta nuevamente.`;
        }
      });
    }
  }

  /**
   * Navega nuevamente al listado de animales.
   * @returns void
   */
  volverAlListado(): void {
    this.router.navigate(['/animales']);
  }

}