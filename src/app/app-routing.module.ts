import { ValidadorAtivoComponent } from './views/validador-ativo/validador-ativo.component';

import { CameraComponent } from './components/camera/camera.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorComponent } from './views/validador/validador.component';
import { AuthGuard } from './guard/auth.guard';
import { MenuComponent } from './views/menu/menu.component';
import { CompareComponent } from './views/compare/compare.component';
import { MenuValidationComponent } from './views/menu-validation/menu-validation.component';



const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'autenticar', component: ValidadorComponent, /* canActivate: [AuthGuard] */ },
  { path: 'autenticar/ativo', component: ValidadorAtivoComponent, /* canActivate: [AuthGuard] */ },
  { path: 'menu', component: MenuComponent, /* canActivate: [AuthGuard] */},
  { path: 'menu/autenticar', component: MenuValidationComponent, /* canActivate: [AuthGuard] */},
  { path: 'compare', component: CompareComponent, /* canActivate: [AuthGuard] */},
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
