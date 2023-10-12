import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalfilterhistorybeliComponent } from './modalfilterhistorybeli.component';

describe('ModalfilterhistorybeliComponent', () => {
  let component: ModalfilterhistorybeliComponent;
  let fixture: ComponentFixture<ModalfilterhistorybeliComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalfilterhistorybeliComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalfilterhistorybeliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
