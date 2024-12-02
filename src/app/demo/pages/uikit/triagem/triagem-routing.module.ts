import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TriagemComponent } from './triagem.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: TriagemComponent }
	])],
	exports: [RouterModule]
})
export class TriagemRoutingModule { }
