import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {

  id!: number;
  patient: Patient = new Patient();

  constructor(private patientService: PatientService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.patientService.getPatientById(this.id).subscribe(data=>{
      console.log(data);
      this.patient = data;
    }, error => console.log(error));
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    gender: new FormControl(''),
    age: new FormControl('', Validators.required),
    dob: new FormControl(''),
    number: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    photo: new FormControl(''),
  });
  
  get f(){
    return this.form.controls;
  }

  goToPatientList(){
    this.router.navigate(['/patients']);
  }

  onSubmit(){
    //console.log(this.form.value);
    this.updatePatient();
  }

  updatePatient(){
    // var date = new Date(this.patient.dob)
    // const format = 'yyyy-MM-dd';
    // const locale = 'en-US';
    // const formattedDate = formatDate(date, format, locale);
    // this.patient.dob = formattedDate;

    this.patientService.updatePatient(this.id, this.patient).subscribe(data => {
      console.log(data);
      this.patient = new Patient;
      this.goToPatientList();
    }, error => console.log(error))
  }

}
