import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employee: Employee = {
    employeeId: 0,
    employeeName: '',
    employeeContactNumber: '',
    employeeAddress: '',
    employeeGender: '',
    employeeDepartment: '',
    employeeSkills: ''
  }

  skills: string[] = []

  constructor(private employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit(): void {

  }

  disableSelect = new FormControl(false);


  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  selectGender(gender: string): void {
    this.employee.employeeGender = gender;
  }

  onSkillsChangees(event: any) {
    console.log(event)
    if (event.checked) {
      this.skills.push(event.source.value)
    } else {
      this.skills.forEach(
        (item, index) => {
          if (item == event.source.value) {
            this.skills.splice(index, 1);
          }
        }
      )
    }
    this.employee.employeeSkills = this.skills.toString();
  }

  saveEmployee(employeeForm: NgForm): void {
    this.employeeService.saveEmployee(this.employee).subscribe(
      {
        next: (res: Employee) => {
          console.log(res);
          employeeForm.reset();
          this.employee.employeeGender ='';
          this.router.navigate(['/employee-list'])
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
}
}
