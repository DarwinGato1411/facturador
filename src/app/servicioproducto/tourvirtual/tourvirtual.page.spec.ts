import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TourvirtualPage } from './tourvirtual.page';

describe('TourvirtualPage', () => {
  let component: TourvirtualPage;
  let fixture: ComponentFixture<TourvirtualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourvirtualPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TourvirtualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
