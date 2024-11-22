import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderScreenComponent } from './header-screen.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: HeaderScreenComponent }
	])],
	exports: [RouterModule]
})
export class HeaderScreenRoutingModule { }
