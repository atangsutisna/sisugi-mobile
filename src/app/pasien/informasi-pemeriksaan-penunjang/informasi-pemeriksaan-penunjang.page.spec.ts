import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformasiPemeriksaanPenunjangPage } from './informasi-pemeriksaan-penunjang.page';

describe('InformasiPemeriksaanPenunjangPage', () => {
  let component: InformasiPemeriksaanPenunjangPage;
  let fixture: ComponentFixture<InformasiPemeriksaanPenunjangPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InformasiPemeriksaanPenunjangPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformasiPemeriksaanPenunjangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
