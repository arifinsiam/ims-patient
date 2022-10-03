import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {

  patient: Patient = new Patient();

  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
  }
  
  // id!: number;
  // name!: string;
  // gender!: string;
  // age!: string;
  // dob!: Date;
  // number!: string;
  // email!: string;
  // address!: string;
  // photo!: Blob;

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

  savePatient(){
    this.patientService.createPatient(this.form.value).subscribe(data=>{
      console.log(data);
      this.goToPatientList();
    },
    error => console.log(error));
  }

  goToPatientList(){
    this.router.navigate(['/patients']);
  }

  onSubmit(){
    console.log(this.form.value);
    this.savePatient();
  }
}
