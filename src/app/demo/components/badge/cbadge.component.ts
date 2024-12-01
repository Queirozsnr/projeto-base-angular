import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cbadge',
  templateUrl: './cbadge.component.html',
  styleUrl: './cbadge.component.scss'
})
export class CbadgeComponent {
  @Input() status: string = '';
  @Input() label: string = '';

  private statusMap = {
    'APROVADO': { label: 'APROVADO', color: 'instock' },
    'PENDENTE': { label: 'PENDENTE', color: 'proposal' },
    'EM ANÁLISE': { label: 'EM ANÁLISE', color: 'lowstock' },
    'REPROVADO': { label: 'REPROVADO', color: 'outofstock' }
  };

  getStatusLabel() {
    if (this.label) {
      return this.label;
    }
    return this.statusMap[this.status]?.label || '';
  }

  getStatusColor() {
    return this.statusMap[this.status]?.color || '';
  }
}
