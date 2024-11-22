import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CadastroProdutoComponent } from './cadastroproduto.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CadastroProdutoComponent }
	])],
	exports: [RouterModule]
})
export class CadastroProdutoRoutingModule { }
