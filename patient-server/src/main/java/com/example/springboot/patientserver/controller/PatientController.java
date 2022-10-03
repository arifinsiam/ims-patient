package com.example.springboot.patientserver.controller;

import com.example.springboot.patientserver.model.Patient;
import com.example.springboot.patientserver.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class PatientController {
    @Autowired
    private PatientService patientService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/patients")
    public List<Patient> getAllPatients(){
        return patientService.getPatients();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/patients")
    public Patient createPatient(@RequestBody Patient patient){
        return patientService.addPatient(patient);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/patients/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id){
        return patientService.getPatientById(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/patients/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient newPatientDetails){
        return patientService.updatePatient(id, newPatientDetails);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/patients/{id}")
    public ResponseEntity<Map<String, Boolean>> deletePatient(@PathVariable Long id){
        return patientService.deletePatient(id);
    }
}
