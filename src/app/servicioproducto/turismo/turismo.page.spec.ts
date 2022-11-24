import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TurismoPage } from './turismo.page';

describe('TurismoPage', () => {
  let component: TurismoPage;
  let fixture: ComponentFixture<TurismoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurismoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TurismoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
