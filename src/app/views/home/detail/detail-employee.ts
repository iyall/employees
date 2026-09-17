import { Component, signal, inject } from '@angular/core'
import { ActivatedRoute, Router  } from '@angular/router'
import { Employee } from '../../../models/employee'
import { EmployeeService } from '../../../services/employee/employee.service'

@Component({
    selector: 'app-detail-employee',
    templateUrl: './detail-employee.html',
    styleUrl: './detail-employee.scss',
    standalone: true,
})
export class DetailEmployeeComponent {
    private router = inject(Router)
    private route = inject(ActivatedRoute)
    private employeeService = inject(EmployeeService)
    employee = signal<Employee | undefined>(undefined);
    searchName: string = '';
    constructor() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.employee.set(this.employeeService.getEmployeeById(id));
        this.searchName = this.route.snapshot.queryParamMap.get('searchName') || '';
    }
    onBack() {
        const queryParams: any = {};
        if (this.searchName) {
            queryParams.searchName = this.searchName;
        }
        this.router.navigate(['/home'], { queryParams });
    }
    onEdit(){
        const id = this.employee()?.id
        const paramSearchName = this.searchName ? { searchName: this.searchName } : {};
        this.router.navigate(['/home/' + id + '/edit'],{ queryParams: paramSearchName })

    }

}