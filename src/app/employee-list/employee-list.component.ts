import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  dataSource: Employee[] = [];
  displayedColumns: string[] = ['employeeId', 'employeeName', 'employeeContactNumber', 'employeeAddress', 
  'employeeDepartment', 'employeeGender', 'employeeSkills', 'edit', 'delete', 'test'];


  constructor(private employeeService: EmployeeService, private router: Router){
    this.getEmployeeList()
  }

  ngOnInit(): void {
    
  }

  getEmployeeList(): void {
    this.employeeService.getEmployees().subscribe(
      {
        next: (resp: Employee[]) => {
          this.dataSource = resp;
          console.log(resp)
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  deleteEmployee(Id:number):void {
    console.log(Id)
    this.employeeService.deleteEmployee(Id).subscribe({
      next: (res) =>{
        console.log(res)
        this.getEmployeeList()
      },error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  updateEmployee(Id:number):void {
    this.router.navigate(['/employee', {empId: Id}])
  }
  testEmployee(Id:number):void {
    this.router.navigate(['/employee',{empId:Id}])
  }
}
