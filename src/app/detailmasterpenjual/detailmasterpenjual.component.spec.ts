import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailmasterpenjualComponent } from './detailmasterpenjual.component';

describe('DetailmasterpenjualComponent', () => {
  let component: DetailmasterpenjualComponent;
  let fixture: ComponentFixture<DetailmasterpenjualComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailmasterpenjualComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailmasterpenjualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
