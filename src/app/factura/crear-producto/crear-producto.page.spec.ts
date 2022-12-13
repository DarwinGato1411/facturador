import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearProductoPage } from './crear-producto.page';

describe('CrearProductoPage', () => {
  let component: CrearProductoPage;
  let fixture: ComponentFixture<CrearProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearProductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
