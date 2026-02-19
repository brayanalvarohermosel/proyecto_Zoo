import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Animal } from '../../../models/animal.model/animal.model';

@Component({
  selector: 'app-animal-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.css']
})
export class AnimalCardComponent {

  @Input() animal!: Animal;

  /**
   * Evento que se emite al hacer clic en "Ver".
   * @param id Identificador del animal a visualizar.
   */
  @Output() verClick = new EventEmitter<string>();

  /**
   * Evento que se emite al hacer clic en "Editar".
   * @param id Identificador del animal a editar.
   */
  @Output() editarClick = new EventEmitter<string>();

  /**
   * Evento que se emite al hacer clic en "Borrar".
   * @param data Objeto que contiene:
   *  - id: Identificador del animal.
   *  - nombre: Nombre del animal.
   */
  @Output() borrarClick = new EventEmitter<{ id: string, nombre: string }>();

  /**
   * Ejecuta la acción de visualizar un animal.
   * Emite el evento verClick con el id del animal.
   * @returns void
   */
  onVerClick(): void {
    if (this.animal.id) {
      this.verClick.emit(this.animal.id);
    }
  }

  /**
   * Ejecuta la acción de editar un animal.
   * Emite el evento editarClick con el id del animal.
   * @returns void
   */
  onEditarClick(): void {
    if (this.animal.id) {
      this.editarClick.emit(this.animal.id);
    }
  }

  /**
   * Ejecuta la acción de borrar un animal.
   * Emite el evento borrarClick con el id y nombre del animal.
   * @returns void
   */
  onBorrarClick(): void {
    if (this.animal.id) {
      this.borrarClick.emit({ 
        id: this.animal.id, 
        nombre: this.animal.nombre 
      });
    }
  }

}