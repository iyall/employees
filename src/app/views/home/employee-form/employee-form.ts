import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee/employee.service';
import { EmployeeFormComponent } from '../../component/employee-form';

@Component({
  selector: 'app-employee-form-page',
  standalone: true,
  imports: [EmployeeFormComponent],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss',
})
export class EmployeeFormPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  employee = signal<Employee | undefined>(undefined);
  searchName = '';

  mode = signal<'create' | 'edit'>('create');
  // Loading
  isSaving = signal(false);

  // Popup sukses
  showSuccessModal = signal(false);

  successMessage = signal('');

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.searchName = this.route.snapshot.queryParamMap.get('searchName') || '';
    if (idParam) {
      const id = Number(idParam);
      const employee = this.employeeService.getEmployeeById(id);
      this.employee.set(employee);
      this.mode.set('edit');
    }
  }

  save(data: Omit<Employee, 'id'>) {
    if (this.isSaving()) {
      return;
    }
    this.isSaving.set(true);
    const employee = this.employee();

    setTimeout(() => {
      if (this.mode() === 'create') {
        this.employeeService.addEmployee(data);
        this.successMessage.set(
          'Data karyawan berhasil ditambahkan.'
        );
        this.isSaving.set(false);
        this.showSuccessModal.set(true);

        // this.router.navigate(['/home']);
        return;
      }
      if (!employee) {
        return;
      }
      this.employeeService.updateEmployee(employee.id, data);
      this.successMessage.set(
          'Data karyawan berhasil diedit.'
        );
        this.isSaving.set(false);
        this.showSuccessModal.set(true);
    //   this.router.navigate(['/home']);
    }, 1000);
  }
  closeSuccessModal() {

    this.showSuccessModal.set(false);
    this.router.navigate(['/home']);
    return;
    
  }

  cancel() {
    const queryParams: any = {};
    if (this.searchName) {
      queryParams.searchName = this.searchName;
    }
    this.router.navigate(['/home'], { queryParams });
  }
}
