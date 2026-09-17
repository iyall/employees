import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../models/employee';
import { DataTableModule, DataTableColumn } from '@stackline/angular-data-table-component';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [DataTableModule]
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  private employeeService = inject(EmployeeService);
  private router = inject(Router);

  @ViewChild('statusCell') statusCellTemplate!: TemplateRef<any>;
  @ViewChild('actionCell') actionCellTemplate!: TemplateRef<any>;

  employees = this.employeeService.employees;


  showDeleteModal = false;

  selectedEmployee: Employee | null = null;
  selection: any | null = null;
  searchName: string = '';
  columns: DataTableColumn[] = [
  {id: 'id', name: 'No', selector: 'id' , sortable: true},
  { id: 'nama', name: 'Nama', selector: 'nama', sortable: true, style: { whiteSpace: 'wrap' }  },
  { id: 'notelp', name: 'No. Telp', selector: 'notelp', sortable: true , width: '100px', style: { whiteSpace: 'wrap' } },
  { id: 'email', name: 'Email', selector: 'email', sortable: true, width: '200px', style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } },
  { id: 'jabatan', name: 'Jabatan', selector: 'jabatan', sortable: true, style: { whiteSpace: 'wrap' } },
  { id: 'divisi', name: 'Divisi', selector: 'divisi', sortable: true, style: { whiteSpace: 'wrap' } },
  { id: 'status', name: 'Status', selector: 'status', sortable: true },
  { id: 'action', name: 'Action', selector: 'action', width: '100px', style: { whiteSpace: 'pre-wrap' } }
];

rows = this.employees().map((emp: Employee, idx: number) => ({
  id: emp.id,
  nama: emp.nama,
  jabatan: emp.jabatan,
  divisi: emp.divisi,
  notelp: emp.notelp,
  email: emp.email,
  status: emp.status,
  }));
  constructor() {
    const searchName = this.router.getCurrentNavigation()?.extras.queryParams?.['searchName'];
    if (searchName) {
      this.searchName = searchName;
    }
  }
  ngAfterViewInit(): void {
    // assign the cell template after view init when the template is available
    if (this.statusCellTemplate) {
      this.columns = this.columns.map(col => col.id === 'status' ? { ...col, cellTemplate: this.statusCellTemplate } : col);
    }
    if (this.actionCellTemplate) {
      this.columns = this.columns.map(col => col.id === 'action' ? { ...col, cellTemplate: this.actionCellTemplate } : col);
    }
    
  }


  setSearchName(event: any) {
    this.searchName = event;
  }
  tambahKaryawan() {
    const paramSearchName = this.searchName ? { searchName: this.searchName } : {};
    this.router.navigate(['/home/new'], { queryParams: paramSearchName })

  }

  lihatEmployee(employee: Employee) {
    const paramSearchName = this.searchName ? { searchName: this.searchName } : {};
    this.router.navigate(['/home/detail/' + employee.id], { queryParams: paramSearchName });
  }

  editEmployee(employee: Employee) {
    const paramSearchName = this.searchName ? { searchName: this.searchName } : {};
    this.router.navigate(['/home/' + employee.id + '/edit'],{ queryParams: paramSearchName })

  }

  confirmDelete(employee: Employee) {

    this.selectedEmployee = employee;

    this.showDeleteModal = true;

  }

  cancelDelete() {

    this.showDeleteModal = false;

    this.selectedEmployee = null;

  }

  deleteEmployee() {

    if (!this.selectedEmployee) {
      return;
    }

    const id = this.selectedEmployee.id;

    this.employeeService.deleteEmployee(id)
    this.showDeleteModal = false;
    this.selectedEmployee = null;
    setTimeout(()=>{
      
    }, 500)

   

  }

  ngOnDestroy(): void {


  }

}