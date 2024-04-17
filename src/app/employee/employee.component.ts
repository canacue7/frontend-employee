import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  isCreateEmployee: boolean = true;

  employee: any;


  skills: string[] = []

  constructor(private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.employee = this.activatedRoute.snapshot.data['empoyee']

    console.log(this.employee)

    if (this.employee && this.employee.employeeId) {
      this.isCreateEmployee = false;
      if (this.employee.employeeSkills != '') {
        this.skills = [];
        this.skills = this.employee.employeeSkills.split(',')
      }
    } else {
      this.isCreateEmployee = true;
    }
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

    if (this.isCreateEmployee) {
      this.employeeService.saveEmployee(this.employee).subscribe(
        {
          next: (res: Employee) => {
            console.log(res);
            employeeForm.reset();
            this.employee.employeeGender = '';
            this.router.navigate(['/employee-list'])
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        }
      );
    } else {
      this.employeeService.updateEmployee(this.employee).subscribe(
        {
          next: (res: Employee) => {
            this.router.navigate(['/employee-list']);
          }, error: (err: HttpErrorResponse) => {
            console.log(err)
          }
        }
      )
    }


  }
}
