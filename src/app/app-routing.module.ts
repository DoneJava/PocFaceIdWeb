import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { TestComponent } from './views/test/test.component';
import { AdmSpaceComponent } from './views/adm-space/adm-space.component';



const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'adm', component: AdmSpaceComponent },
  { path: 'autenticar', component: TestComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
