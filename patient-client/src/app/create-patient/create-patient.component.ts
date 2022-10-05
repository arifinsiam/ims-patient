import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileHandler } from '../file-handler';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {

  patient: Patient = new Patient;

  constructor(private patientService: PatientService,
    private router: Router,
    private sanitizer: DomSanitizer) { }

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

  selectedFile: any;
  // retrievedImage: any;
  // base64Data: any;
  // retrieveResonse: any;
  // imageName: any;
  
  get f(){
    return this.form.controls;
  }

  savePatient(){
    const patientFormData = this.prepareFormData(this.form.value)
    this.patientService.createPatient(patientFormData).subscribe(data=>{
      console.log(data);
      this.goToPatientList();
    },
    error => console.log(error));
  }

  prepareFormData(data: any): FormData{
    const formData = new FormData();
    formData.append(
      'patient',
      new Blob([JSON.stringify(data)], {type: 'application/json'})
    );
    formData.append(
      'imageFile',
      this.selectedFile,
      this.selectedFile.name
    );
    return formData;
  }

  goToPatientList(){
    this.router.navigate(['/patients']);
  }

  onFileSelected(event: any){
    if(event.target.files){
      this.selectedFile = event.target.files[0]
      console.log(event.target.files[0])

      // const fileHandle: FileHandler = {
      //   file: selectedFile,
      //   url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(selectedFile))
      // }
      
    }
  }

  onSubmit(){
    console.log(this.form.value);
    this.savePatient();
  }
}
