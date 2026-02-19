import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animal } from '../models/animal.model/animal.model';

@Injectable({
  providedIn: 'root',
})

export class AnimalesService {
  constructor(private http: HttpClient) {}

  private readonly API_URL = "https://698a05f7c04d974bc6a11fd5.mockapi.io/animales";

  /**
   * Obtiene todos los animales desde la API.
   * 
   * @returns Observable<Animal[]> Lista de animales
   */
  getAnimales() {
    return this.http.get<Animal[]>(this.API_URL);
  }

  /**
   * Obtiene un animal específico por su ID.
   * 
   * @param id Identificador del animal
   * @returns Observable<Animal> Datos del animal
   */
  getAnimalById(id: string) {
    return this.http.get<Animal>(`${this.API_URL}/${id}`);
  }

  /**
   * Crea un nuevo animal en la API.
   * 
   * @param animal Objeto con los datos del nuevo animal
   * @returns Observable<Animal> Animal creado con su ID asignado
   */
  createAnimal(animal: Animal){
    return this.http.post<Animal>(this.API_URL, animal);
  }

  /**
   * Actualiza un animal existente.
   * 
   * @param id Identificador del animal a actualizar
   * @param animal Objeto con los datos actualizados del animal
   * @returns Observable<Animal> Animal actualizado
   */
  updateAnimal(id: string, animal: Animal) {
    return this.http.put<Animal>(`${this.API_URL}/${id}`, animal);
  }
  
  /**
   * Elimina un animal por su ID.
   * 
   * @param id Identificador del animal a eliminar
   * @returns Observable<Animal> Animal eliminado
   */
  deleteAnimal(id: string) {
    return this.http.delete<Animal>(`${this.API_URL}/${id}`);
  }
}
