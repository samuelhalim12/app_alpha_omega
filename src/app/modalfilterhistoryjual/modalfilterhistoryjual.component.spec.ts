import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalfilterhistoryjualComponent } from './modalfilterhistoryjual.component';

describe('ModalfilterhistoryjualComponent', () => {
  let component: ModalfilterhistoryjualComponent;
  let fixture: ComponentFixture<ModalfilterhistoryjualComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalfilterhistoryjualComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalfilterhistoryjualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
