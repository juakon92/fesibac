import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntidadPage } from './entidad.page';

describe('EntidadPage', () => {
  let component: EntidadPage;
  let fixture: ComponentFixture<EntidadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
