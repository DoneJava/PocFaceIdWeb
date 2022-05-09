import { ValidadorAtivoComponent } from './views/validador-ativo/validador-ativo.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { NotFoundComponent } from './views/not-found/not-found.component';



const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'autenticar', component: ValidadorAtivoComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
