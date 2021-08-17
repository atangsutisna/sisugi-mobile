export class Isoman {
  id: string;
  idKasus: string;
  tanggalWawancara?: Date;
  kurvaEpidemiologi?: Date;
  nik: string;
  nama: string;
  tanggalPemantauan: string;
  pcr?: string;
  hasilPcr1?: string;
  tanggalPcr1?: Date;
  tanggalKeluarPcr1?: Date;
  hasilPcr2?: string;
  tanggalPcr2?: Date;
  tanggalKeluarPcr2?: Date;
  kesehatan: string;
  pemantauanTerakhir: boolean;
  status: string;
  updatedAt: Date;
  createdAt: Date;
}
