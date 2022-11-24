import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabprincipalPage } from './tabprincipal.page';

describe('TabprincipalPage', () => {
  let component: TabprincipalPage;
  let fixture: ComponentFixture<TabprincipalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabprincipalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabprincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
