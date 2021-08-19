import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaktorKontakPaparanPage } from './faktor-kontak-paparan.page';

describe('FaktorKontakPaparanPage', () => {
  let component: FaktorKontakPaparanPage;
  let fixture: ComponentFixture<FaktorKontakPaparanPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FaktorKontakPaparanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FaktorKontakPaparanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
