import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuscarclientePage } from './buscarcliente.page';

describe('BuscarclientePage', () => {
  let component: BuscarclientePage;
  let fixture: ComponentFixture<BuscarclientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarclientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuscarclientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
