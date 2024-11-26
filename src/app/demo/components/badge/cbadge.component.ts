import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cbadge',
  templateUrl: './cbadge.component.html',
  styleUrl: './cbadge.component.scss'
})
export class CbadgeComponent {
  @Input() status: string = '';
  

  getStatusLabel() {
    switch (this.status) {
      case 'INSTOCK':
        return 'APROVADO';
            case 'LOWSTOCK':
        return 'EM ANÁLISE';
            case 'OUTOFSTOCK':
        return 'REPROVADO';
      default:
        return '';
    }
  }
}
