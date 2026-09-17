export interface Employee {
  id: number;
  nama: string;
  jabatan: 'Junior' | 'Middle' | 'Senior';
  divisi: 'IT' | 'Accounting' | 'Bisnis' | 'Resiko';
  status: 'Aktif' | 'Non-aktif';
  notelp?: string;
  email?: string;
}