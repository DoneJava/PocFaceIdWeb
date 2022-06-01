import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './views/login/login.component';
import { NotFoundComponent } from './views/not-found/not-found.component';



const routes: Routes = [
  { path: 'register', loadChildren: () => import('./views/register/register.module').then(m => m.RegisterModule)},
  { path: 'adm', loadChildren: () => import('./views/adm-space/adm-space.module').then(m => m.AdmSpaceModule) },
  { path: 'autenticar', loadChildren: () => import('./views/test/test.module').then(m => m.TestModule), canActivate: [AuthGuard] },
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
