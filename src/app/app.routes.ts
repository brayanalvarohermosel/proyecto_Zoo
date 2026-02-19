import { Routes } from '@angular/router';
import { CrearAnimalComponent } from './pages/crear-animal/crear-animal.component/crear-animal.component';
import { DetalleAnimalComponent } from './pages/detalle-animal/detalle-animal.component/detalle-animal.component';
import { EditarAnimalComponent } from './pages/editar-animal/editar-animal.component/editar-animal.component';
import { ListadoAnimalesComponent } from './pages/listado-animales/listado-animales.component/listado-animales.component';

export const routes: Routes = [
    { path: '', redirectTo: '/animales', pathMatch: 'full' },
    { path: 'animales', component: ListadoAnimalesComponent },
    { path: 'animales/crear', component: CrearAnimalComponent },
    { path: 'animales/editar/:id', component: EditarAnimalComponent },
    { path: 'animales/:id', component: DetalleAnimalComponent },
    { path: '**', redirectTo: '/animales' }
];