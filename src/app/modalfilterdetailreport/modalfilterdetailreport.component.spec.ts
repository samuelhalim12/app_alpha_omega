import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalfilterdetailreportComponent } from './modalfilterdetailreport.component';

describe('ModalfilterdetailreportComponent', () => {
  let component: ModalfilterdetailreportComponent;
  let fixture: ComponentFixture<ModalfilterdetailreportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalfilterdetailreportComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalfilterdetailreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
