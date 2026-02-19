import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalesService } from '../../../services/animales.service';
import { Animal } from '../../../models/animal.model/animal.model';

@Component({
  selector: 'app-crear-animal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './crear-animal.component.html',
  styleUrls: ['./crear-animal.component.css']
})
export class CrearAnimalComponent {

  formulario: FormGroup;

  enviando: boolean = false;
  mensajeError: string = '';


  /**
   * Constructor del componente.
   * Inicializa el formulario con validaciones.
   * 
   * @param fb Constructor de formularios reactivos
   * @param animalesService Servicio para operaciones CRUD de animales
   * @param router Servicio para navegación entre rutas
   */
  constructor(
    private fb: FormBuilder,
    private animalesService: AnimalesService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      especie: ['', [Validators.required, Validators.minLength(3)]],
      habitat: ['', [Validators.required]],
      dieta: ['', [Validators.required]]
    });
  }

  /**
   * Maneja el envío del formulario.
   * Valida los datos y llama al servicio para crear el animal.
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

    const nuevoAnimal: Animal = this.formulario.value;

    this.animalesService.createAnimal(nuevoAnimal).subscribe({
      next: (r) => {
        console.log('Animal creado correctamente:', r);
        alert('✅ Animal creado correctamente');
        this.router.navigate(['/animales']);
      },
      error: (e) => {
        console.error('Error al crear animal:', e);
        this.mensajeError = 'Error al crear el animal. Intenta nuevamente.';
        this.enviando = false;
      }
    });
  }

  /**
   * Marca todos los campos del formulario como "tocados"
   * para activar los mensajes de validación en la vista.
   * @returns void
   */
  marcarCamposComoTocados(): void {
    Object.keys(this.formulario.controls).forEach(campo => {
      this.formulario.get(campo)?.markAsTouched();
    });
  }

  /**
   * Cancela la creación del animal y vuelve al listado.
   * Muestra una confirmación antes de salir.
   * @returns void
   */
  cancelar(): void {
    if (confirm('¿Estás seguro de cancelar? Los datos no se guardarán.')) {
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
   * @returns string Mensaje de error asociado al campo
   */
  obtenerMensajeError(campo: string): string {
    const control = this.formulario.get(campo);

    if (!control || !control.errors) return '';

    if (control.errors['required']) return 'Este campo es obligatorio';
    if (control.errors['minlength']) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    if (control.errors['maxlength']) return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
    if (control.errors['min']) return `El valor mínimo es ${control.errors['min'].min}`;
    if (control.errors['max']) return `El valor máximo es ${control.errors['max'].max}`;

    return 'Campo inválido';
  }

}