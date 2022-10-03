import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from './patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseURL = "http://localhost:8080/api/v1/patients";
  constructor(private httpClient: HttpClient) { }

  getPatientsList(): Observable<Patient[]>{
    return this.httpClient.get<Patient[]>(`${this.baseURL}`);
  }
  getPatientById(id: number):Observable<Patient>{
    return this.httpClient.get<Patient>(`${this.baseURL}/${id}`);
  }
  createPatient(data: any): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, data);
  }
  updatePatient(id: number, patient: Patient): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, patient);
  }
  deletePatient(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
