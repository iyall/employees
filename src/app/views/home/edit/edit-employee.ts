import { Component, inject, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Employee } from '../../../models/employee'
import { EmployeeService } from '../../../services/employee/employee.service'
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-edit-employee',
    templateUrl: './edit-employee.html',
    styleUrl: './edit-employee.scss',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule]
})
export class EditEmployeeComponent {
    private employeeService = inject(EmployeeService)
    private router = inject(Router)
    private route = inject(ActivatedRoute)
    // employee = signal<Employee | undefined>(undefined)
    employee = signal<Employee| undefined>(undefined);
    isLoading = false;
    showSuccess = false;
    searchName =''
    isAdd:boolean = true
    submitted = signal(false);
    private fb = inject(FormBuilder)
    editForm = this.fb.group({
        nama: ['', [Validators.required, Validators.minLength(5)]],
        jabatan: ['' as 'Junior' | 'Middle' | 'Senior',[ Validators.required]],
        divisi: ['' as 'IT' | 'Accounting' | 'Bisnis' | 'Resiko', [Validators.required]],
        status: ['' as 'Aktif' | 'Non-aktif', [Validators.required]],
        notelp: ['', [Validators.required, Validators.pattern('^[0-9+]{0,3}?[0-9]{9,12}$')]],
        email: ['', [Validators.required , Validators.email]]
    })


    

    constructor() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.employee.set(this.employeeService.getEmployeeById(id))
        this.searchName = this.route.snapshot.queryParamMap.get('searchName') || '';
        const employee = this.employee();
        this.isAdd = true

    if (!employee) {
      return;
    }

    this.editForm.patchValue({
      nama: employee.nama,
      jabatan: employee.jabatan,
      divisi: employee.divisi,
      status: employee.status,
      notelp: employee.notelp,
      email: employee.email

    });

    }
    isFieldInvalid(field: string): boolean {
        const control = this.editForm.get(field);
        return !!control && control.invalid && (control.dirty || control.touched);
    }

    onCancel(){

    }
    onSave(){

    }
    onSubmited(){

    }
    onSubmit(): void {
        if (this.editForm.invalid) {
        this.editForm.markAllAsTouched(); // Trigger semua validasi merah jika disubmit kosong
        return;
        }

        this.isLoading = true;

        // Simulasi proses Save/API Call
        setTimeout(() => {
        this.isLoading = false;
        this.showSuccess = true;
        
        // Auto-hide popup setelah 3 detik
        setTimeout(() => {
            this.showSuccess = false;
        }, 3000);
        
        console.log('Data yang disimpan:', this.editForm.value);
        }, 1500);
    }
    onBack(){
        const queryParams: any = {};
        if (this.searchName) {
            queryParams.searchName = this.searchName;
        }
        this.router.navigate(['/home'], { queryParams });
    }

}