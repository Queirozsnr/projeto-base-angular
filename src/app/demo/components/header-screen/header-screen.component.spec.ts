import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateRef } from '@angular/core';

import { HeaderScreenComponent } from './header-screen.component';

describe('HeaderScreenComponent', () => {
  let component: HeaderScreenComponent;
  let fixture: ComponentFixture<HeaderScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title and button label', () => {
    component.title = 'Test Title';
    component.buttonLabel = 'Test Button';
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Test Title');
    expect(compiled.querySelector('p-button').getAttribute('ng-reflect-label')).toBe('Test Button');
  });

  it('should show and hide the modal', () => {
    component.showModal();
    expect(component.modalVisible).toBeTrue();
    
    component.hideModal();
    expect(component.modalVisible).toBeFalse();
  });

  it('should render modal content', () => {
    const template = fixture.debugElement.injector.get(TemplateRef);
    component.modalContent = template;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('ng-container')).toBeTruthy();
  });
});
