import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  dataSource: Employee[] = [];
  displayedColumns: string[] = ['employeeId', 'employeeName', 'employeeContactNumber', 'employeeAddress', 'employeeDepartment', 'employeeGender', 'employeeSkills'];


  constructor(private employeeService: EmployeeService){
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
}
