import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdatemasterpenjualComponent } from './updatemasterpenjual.component';

describe('UpdatemasterpenjualComponent', () => {
  let component: UpdatemasterpenjualComponent;
  let fixture: ComponentFixture<UpdatemasterpenjualComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatemasterpenjualComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatemasterpenjualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
