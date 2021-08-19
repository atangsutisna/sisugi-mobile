import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-informasi-pemeriksaan-penunjang',
  templateUrl: './informasi-pemeriksaan-penunjang.page.html',
  styleUrls: ['./informasi-pemeriksaan-penunjang.page.scss'],
})
export class InformasiPemeriksaanPenunjangPage implements OnInit {
  form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
    });
  }

}
