import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AnimalesService } from '../../../services/animales.service'; 
import { Animal } from '../../../models/animal.model/animal.model';
import { AnimalCardComponent } from '../../../components/animal-card/animal-card.component/animal-card.component';

@Component({
  selector: 'app-listado-animales',
  standalone: true,
  imports: [
    CommonModule,
    AnimalCardComponent
  ],
  templateUrl: './listado-animales.component.html',
  styleUrls: ['./listado-animales.component.css']
})
export class ListadoAnimalesComponent implements OnInit {

  animales: Animal[] = [];
  cargando: boolean = true;
  mensajeExito: string = '';
  mensajeError: string = '';

  /**
   * Constructor del componente.
   * 
   * @param animalesService Servicio para obtener y gestionar animales
   * @param router Servicio para navegación entre rutas
   * @param cdr Servicio para detección manual de cambios
   */
  constructor(
    private animalesService: AnimalesService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Llama a la función de carga de animales.
   * 
   * @returns void
   */
  ngOnInit(): void {
    this.cargarAnimales();
  }

  /**
   * Carga todos los animales desde el backend.
   * Actualiza la lista de animales y el estado de carga.
   * 
   * @returns void
   */
  cargarAnimales(): void {
    this.cargando = true;
    
    this.animalesService.getAnimales().subscribe({
      next: (animal) => {
        this.animales = animal;
        this.cargando = false;

        // Fuerza detección de cambios
        this.cdr.detectChanges();

        console.log('Animales cargados:', animal);
      },
      error: (e) => {
        console.error('Error al cargar animales:', e);
        this.mensajeError = 'Error al cargar los animales. Intenta nuevamente.';
        this.cargando = false;
      }
    });
  }

  /**
   * Navega a la vista de detalle de un animal.
   * 
   * @param id Identificador del animal
   * @returns void
   */
  verDetalle(id: string): void {
    this.router.navigate(['/animales', id]);
  }

  /**
   * Navega a la vista de edición de un animal.
   * 
   * @param id Identificador del animal
   * @returns void
   */
  editarAnimal(id: string): void {
    this.router.navigate(['/animales/editar', id]);
  }

  /**
   * Elimina un animal tras confirmación del usuario.
   * Actualiza la lista y muestra mensajes de éxito o error temporalmente.
   * 
   * @param id Identificador del animal
   * @param nombre Nombre del animal (para mensajes)
   * @returns void
   */
  eliminarAnimal(id: string, nombre: string): void {
    const confirmacion = confirm(`¿Estás seguro de que quieres eliminar a ${nombre}?`);
    
    if (confirmacion) {
      this.animalesService.deleteAnimal(id).subscribe({
        next: (r) => {
          console.log('Animal eliminado:', r);
          this.mensajeExito = `${nombre} ha sido eliminado correctamente`;

          // Recarga la lista después de eliminar
          this.cargarAnimales();
          
          setTimeout(() => {
            this.mensajeExito = '';
          }, 3000);
        },
        error: (r) => {
          console.error('Error al eliminar:', r);
          this.mensajeError = `No se pudo eliminar a ${nombre}. Intenta nuevamente.`;
          
          setTimeout(() => {
            this.mensajeError = '';
          }, 3000);
        }
      });
    }
  }

  /**
   * Navega a la vista de creación de un nuevo animal.
   * 
   * @returns void
   */
  irACrear(): void {
    this.router.navigate(['/animales/crear']);
  }

}