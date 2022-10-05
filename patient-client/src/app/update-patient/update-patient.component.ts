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
  patient: Patient = new Patient;
  selectedFile: any;

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

  onFileSelected(event: any){
    if(event.target.files){
      this.selectedFile = event.target.files[0]
      console.log(event.target.files[0]) 
    }
  }

  goToPatientList(){
    this.router.navigate(['/patients']);
  }

  onSubmit(){
    //console.log(this.form.value);
    this.updatePatient();
  }

  updatePatient(){
    const patientFormData = this.prepareFormData(this.form.value)
    this.patientService.updatePatient(patientFormData).subscribe(data => {
      console.log(data);
      this.patient = new Patient;
      this.goToPatientList();
    }, error => console.log(error))
  }

  prepareFormData(data: any): FormData{
    const formData = new FormData();
    formData.append(
      'newPatientDetails',
      new Blob([JSON.stringify(data)], {type: 'application/json'})
    );
    formData.append(
      'imageFile',
      this.selectedFile,
      this.selectedFile.name
    );
    return formData;
  }

}
