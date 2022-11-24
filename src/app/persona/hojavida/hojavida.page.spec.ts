import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HojavidaPage } from './hojavida.page';

describe('HojavidaPage', () => {
  let component: HojavidaPage;
  let fixture: ComponentFixture<HojavidaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HojavidaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HojavidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
