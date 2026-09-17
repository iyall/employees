import { Injectable, signal } from '@angular/core';
import { Employee } from '../../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees = signal<Employee[]>([
    {
      id: 1,
      nama: 'Budi Santoso',
      jabatan: 'Junior',
      divisi: 'IT',
      status: 'Aktif',
      notelp: '081234567890',
      email: 'budi.santoso@example.com',
    },
    {
      id: 2,
      nama: 'Andi Wijaya',
      jabatan: 'Middle',
      divisi: 'Accounting',
      status: 'Aktif',
      notelp: '081234567891',
      email: 'andi.wijaya@example.com',
    },
    {
      id: 3,
      nama: 'Siti Rahma',
      jabatan: 'Senior',
      divisi: 'Bisnis',
      status: 'Aktif',
      notelp: '081234567892',
      email: 'siti.rahma@example.com',
    },
    {
      id: 4,
      nama: 'Dedi Kurniawan',
      jabatan: 'Junior',
      divisi: 'Resiko',
      status: 'Non-aktif',
      notelp: '081234567893',
      email: 'dedi.kurniawan@example.com',
    },
    {
      id: 5,
      nama: 'Rina Amelia',
      jabatan: 'Middle',
      divisi: 'Accounting',
      status: 'Aktif',
      notelp: '081234567894',
      email: 'rina.amelia@example.com',
    },
    {
      id: 6,
      nama: 'Agus Setiawan',
      jabatan: 'Senior',
      divisi: 'IT',
      status: 'Aktif',
      notelp: '081234567895',
      email: 'agus.setiawan@example.com',
    },
    {
      id: 7,
      nama: 'Dewi Lestari',
      jabatan: 'Middle',
      divisi: 'Bisnis',
      status: 'Non-aktif',
      notelp: '081234567896',
      email: 'dewi.lestari@example.com',
    },
    {
      id: 8,
      nama: 'Fajar Nugroho',
      jabatan: 'Senior',
      divisi: 'IT',
      status: 'Aktif',
      notelp: '081234567897',
      email: 'fajar.nugroho@example.com',
    },
    {
      id: 9,
      nama: 'Lina Marlina',
      jabatan: 'Middle',
      divisi: 'Accounting',
      status: 'Aktif',
      notelp: '081234567898',
      email: 'lina.marlina@example.com',
    },
  ]);

  deleteEmployee(id: number) {
    this.employees.update(employee => 
      employee.filter(data => data.id !== id)
    );
  }
  getEmployeeById(id: number): Employee | undefined {
    return this.employees().find((employee) => employee.id === id);
  }
  addEmployee(data: Omit<Employee, 'id'>):any {
    return this.employees.update((employees) => {
      const newId = employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
      return [
        ...employees,
        {
          id: newId,
          ...data,
        },
      ];
    });
  }

  updateEmployee(id: number, data: Omit<Employee, 'id'>):any {
    return this.employees.update((employees) =>
      employees.map((employee) =>
        employee.id === id
          ? {
              id,
              ...data,
            }
          : employee,
      ),
    );
  }
}
