import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CbadgeComponent } from './cbadge.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CbadgeComponent }
	])],
	exports: [RouterModule]
})
export class CbadgeRoutingModule { }
