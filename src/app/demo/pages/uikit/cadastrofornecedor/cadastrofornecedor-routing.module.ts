import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CadastroFornecedorComponent } from './cadastrofornecedor.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CadastroFornecedorComponent }
	])],
	exports: [RouterModule]
})
export class CadastroFornecedorRoutingModule { }
