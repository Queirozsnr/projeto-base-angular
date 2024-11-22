import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderScreenComponent } from './header-screen.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        DialogModule
    ],
    declarations: [HeaderScreenComponent],
    exports: [HeaderScreenComponent]
})
export class HeaderScreenModule { }
