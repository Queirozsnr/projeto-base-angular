import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-header-screen',
  templateUrl: './header-screen.component.html',
  styleUrls: ['./header-screen.component.scss']
})
export class HeaderScreenComponent {
  @Input() title: string = 'Cadastro';
  @Input() buttonLabel: string = 'Novo Cadastro';
  @Input() modalContent: TemplateRef<any>;
  @Input() modalWidth: string = '50%';
  @Output() buttonClick = new EventEmitter<void>();
  
  modalVisible: boolean = false;

  showModal() {
    this.modalVisible = true;
    this.buttonClick.emit();
  }

  hideModal() {
    this.modalVisible = false;
  }
}
