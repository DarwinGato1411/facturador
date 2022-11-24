import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacturarPage } from './facturar.page';

describe('FacturarPage', () => {
  let component: FacturarPage;
  let fixture: ComponentFixture<FacturarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacturarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
