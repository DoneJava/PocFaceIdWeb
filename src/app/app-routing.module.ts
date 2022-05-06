import { ValidadorAtivoComponent } from './views/validador-ativo/validador-ativo.component';

import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';



const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'autenticar/ativo', component: ValidadorAtivoComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
