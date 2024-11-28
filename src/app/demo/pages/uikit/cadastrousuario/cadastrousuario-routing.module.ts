import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from './cadastrousuario.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CadastroUsuarioComponent }
	])],
	exports: [RouterModule]
})
export class CadastroUsuarioRoutingModule { }
