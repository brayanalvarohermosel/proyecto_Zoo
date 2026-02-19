import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalesService } from '../../../services/animales.service';
import { Animal } from '../../../models/animal.model/animal.model';
@Component({
  selector: 'app-editar-animal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './editar-animal.component.html',
  styleUrl: './editar-animal.component.css'
})
export class EditarAnimalComponent implements OnInit {

  animalId: string = '';
  cargando: boolean = true;
  enviando: boolean = false;
  mensajeError: string = '';

  formulario: FormGroup;

  /**
   * Constructor del componente.
   * Inicializa el formulario con validaciones.
   * 
   * @param fb Constructor de formularios reactivos
   * @param animalesService Servicio para gestionar animales
   * @param route Servicio para acceder a los parámetros de la ruta
   * @param router Servicio para navegación
   * @param cdr Servicio para detección manual de cambios
   */
  constructor(
    private fb: FormBuilder,
    private animalesService: AnimalesService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      especie: ['', [Validators.required, Validators.minLength(3)]],
      habitat: ['', [Validators.required]],
      dieta: ['', [Validators.required]]
    });
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Obtiene el ID desde la ruta y carga el animal correspondiente.
   * @returns void
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.animalId = id || '';

    if (this.animalId) {
      this.cargarAnimal();
    } else {
      this.mensajeError = 'No se proporcionó un ID válido';
      this.cargando = false;
    }
  }

  /**
   * Carga los datos del animal desde el backend
   * y rellena el formulario con los valores obtenidos.
   * 
   * @returns void
   */
  cargarAnimal(): void {
    this.cargando = true;

    this.animalesService.getAnimalById(this.animalId).subscribe({
      next: (animal) => {
        // Se actualizan los valores del formulario sin recrearlo
        this.formulario.patchValue({
          nombre: animal.nombre,
          especie: animal.especie,
          habitat: animal.habitat,
          dieta: animal.dieta
        });

        this.cargando = false;

        // Se fuerza la detección de cambios si es necesario
        this.cdr.detectChanges();

        console.log('Animal cargado para edición:', animal);
      },
      error: (error) => {
        console.error('Error al cargar animal:', error);
        this.mensajeError = 'No se pudo cargar el animal. Verifica que existe.';
        this.cargando = false;
      }
    });
  }

  /**
   * Maneja el envío del formulario.
   * Valida los datos y actualiza el animal en el backend.
   * @returns void
   */
  onSubmit(): void {
    if (this.formulario.invalid) {
      this.mensajeError = 'Por favor, completa todos los campos correctamente';
      this.marcarCamposComoTocados();
      return;
    }

    this.enviando = true;
    this.mensajeError = '';

    const animalActualizado: Animal = {
      id: this.animalId,
      ...this.formulario.value
    };

    this.animalesService.updateAnimal(this.animalId, animalActualizado).subscribe({
      next: (response) => {
        console.log('Animal actualizado correctamente:', response);
        alert('✅ Animal actualizado correctamente');
        this.router.navigate(['/animales']);
      },
      error: (error) => {
        console.error('Error al actualizar animal:', error);
        this.mensajeError = 'Error al actualizar el animal. Intenta nuevamente.';
        this.enviando = false;
      }
    });
  }

  /**
   * Marca todos los campos como tocados
   * para activar la visualización de errores.
   * @returns void
   */
  marcarCamposComoTocados(): void {
    Object.keys(this.formulario.controls).forEach(campo => {
      this.formulario.get(campo)?.markAsTouched();
    });
  }

  /**
   * Cancela la edición y vuelve al listado.
   * @returns void
   */
  cancelar(): void {
    if (confirm('¿Estás seguro de cancelar? Los cambios no se guardarán.')) {
      this.router.navigate(['/animales']);
    }
  }

  /**
   * Verifica si un campo es inválido y ha sido tocado.
   * @param campo Nombre del campo a validar
   * @returns boolean true si el campo es inválido y fue tocado
   */
  campoNoValido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  /**
   * Devuelve el mensaje de error correspondiente a un campo.
   * @param campo Nombre del campo del formulario
   * @returns string Mensaje de error asociado
   */
  obtenerMensajeError(campo: string): string {
    const control = this.formulario.get(campo);

    if (!control || !control.errors) return '';

    if (control.errors['required']) return 'Este campo es obligatorio';
    if (control.errors['minlength']) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    if (control.errors['maxlength']) return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
    if (control.errors['min']) return `El valor mínimo es ${control.errors['min'].min}`;
    if (control.errors['max']) return `El valor máximo es ${control.errors['max'].max}`;
    if (control.errors['pattern']) return 'URL inválida (debe comenzar con http:// o https://)';

    return 'Campo inválido';
  }

}