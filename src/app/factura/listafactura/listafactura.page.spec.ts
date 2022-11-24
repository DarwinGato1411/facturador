import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListafacturaPage } from './listafactura.page';

describe('ListafacturaPage', () => {
  let component: ListafacturaPage;
  let fixture: ComponentFixture<ListafacturaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListafacturaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListafacturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
