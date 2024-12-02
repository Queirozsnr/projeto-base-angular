import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(public layoutService: LayoutService, private primengConfig: PrimeNGConfig) {
        this.primengConfig.setTranslation({
            weak: 'Fraco',
            medium: 'Média',
            strong: 'Forte',
            passwordPrompt: 'Digite uma senha'
        });
    }
}
