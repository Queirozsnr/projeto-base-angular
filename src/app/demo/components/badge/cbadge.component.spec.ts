import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbadgeComponent } from './cbadge.component';

describe('CbadgeComponent', () => {
  let component: CbadgeComponent;
  let fixture: ComponentFixture<CbadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CbadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CbadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
