import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { CbadgeComponent } from './cbadge.component';

@NgModule({
    imports: [
        CommonModule,
        StyleClassModule
    ],
    declarations: [CbadgeComponent],
    exports: [CbadgeComponent]
})
export class CbadgeModule { }
