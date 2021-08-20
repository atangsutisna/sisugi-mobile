import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PenyelidikanEpiPage } from './penyelidikan-epi.page';

describe('PenyelidikanEpiPage', () => {
  let component: PenyelidikanEpiPage;
  let fixture: ComponentFixture<PenyelidikanEpiPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PenyelidikanEpiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PenyelidikanEpiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
