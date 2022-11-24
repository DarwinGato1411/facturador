import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearservicioPage } from './crearservicio.page';

describe('CrearservicioPage', () => {
  let component: CrearservicioPage;
  let fixture: ComponentFixture<CrearservicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearservicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearservicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
