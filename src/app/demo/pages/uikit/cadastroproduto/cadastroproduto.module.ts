import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CadastroProdutoComponent } from './cadastroproduto.component';
import { CadastroProdutoRoutingModule } from './cadastroproduto-routing.module';
import { HeaderScreenModule } from 'src/app/demo/components/header-screen/header-screen.module';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from "primeng/inputtextarea";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		CadastroProdutoRoutingModule,
		DataViewModule,
		PickListModule,
		OrderListModule,
		InputTextModule,
		DropdownModule,
		RatingModule,
		ButtonModule,
		DialogModule,
		HeaderScreenModule,
		InputTextareaModule
	],
	declarations: [
		CadastroProdutoComponent
	]
})
export class CadastroProdutoModule { }
