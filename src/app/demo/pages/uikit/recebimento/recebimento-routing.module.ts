import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecebimentoComponent } from './recebimento.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RecebimentoComponent }
	])],
	exports: [RouterModule]
})
export class RecebimentoRoutingModule { }
