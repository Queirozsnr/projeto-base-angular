import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-header-screen',
  templateUrl: './header-screen.component.html',
  styleUrls: ['./header-screen.component.scss']
})
export class HeaderScreenComponent {
  @Input() title: string = 'Cadastro';
  @Input() buttonLabel: string = 'Novo Cadastro';
  @Input() modalContent: TemplateRef<any>; // Updated input property
  @Input() modalWidth: string = '50%'; // New input property
  
  modalVisible: boolean = false;

  showModal() {
    this.modalVisible = true;
  }

  hideModal() {
    this.modalVisible = false;
  }
}
