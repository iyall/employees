import { Component, EventEmitter, Input, Output, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../models/employee';


@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss',
})
export class EmployeeFormComponent {
  @Input()
  employee: Employee | undefined;

  @Input()
  mode: 'create' | 'edit' = 'create';
  @Input() isSaving = false;
  @Output()
  submitted = new EventEmitter<Omit<Employee, 'id'>>();

  @Output()
  cancelled = new EventEmitter<void>();
  private fb = inject(FormBuilder);

  submittedForm = signal(false);

  employeeForm = this.fb.nonNullable.group({
    nama: ['', [Validators.required, Validators.minLength(5)]],
    jabatan: ['' as 'Junior' | 'Middle' | 'Senior', [Validators.required]],
    divisi: ['' as 'IT' | 'Accounting' | 'Bisnis' | 'Resiko', [Validators.required]],
    status: ['' as 'Aktif' | 'Non-aktif', [Validators.required]],
    notelp: ['', [Validators.required, Validators.pattern('^[0-9+]{0,3}?[0-9]{9,12}$')]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {}

  ngOnInit() {
    if (this.employee) {
      this.employeeForm.patchValue({
        nama: this.employee.nama,
        jabatan: this.employee.jabatan,
        divisi: this.employee.divisi,
        status: this.employee.status,
        notelp: this.employee.notelp,
        email: this.employee.email
      });
    }
  }

  get nama() {
    return this.employeeForm.controls.nama;
  }

  get jabatan() {
    return this.employeeForm.controls.jabatan;
  }

  get divisi() {
    return this.employeeForm.controls.divisi;
  }

  get status() {
    return this.employeeForm.controls.status;
  }
  get notelp() {
    return this.employeeForm.controls.notelp
  }
  get email() {
    return this.employeeForm.controls.email
  }

  save() {
    this.submittedForm.set(true);

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();

      return;
    }

    this.submitted.emit(this.employeeForm.getRawValue());
  }

  cancel() {
    if (this.isSaving) {
      return;
    }
    this.cancelled.emit();
  }
}
