package com.example.springboot.patientserver.controller;

import com.example.springboot.patientserver.model.ImageModel;
import com.example.springboot.patientserver.model.Patient;
import com.example.springboot.patientserver.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Set;

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
    @PostMapping(value = "/patients", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Patient createPatient(@RequestPart("patient") Patient patient, @RequestPart("imageFile") MultipartFile file){
        //return patientService.addPatient(patient);
        try {
            Set<ImageModel> image = patientService.uploadImage(file);
            patient.setPatientImage(image);
            return patientService.addPatient(patient);
        } catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/patients/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id){
        return patientService.getPatientById(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping(value = "/patients/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestPart("newPatientDetails") Patient newPatientDetails, @RequestPart("imageFile") MultipartFile file){
        //return patientService.updatePatient(id, newPatientDetails);
        try {
            Set<ImageModel> image = patientService.uploadImage(file);
            newPatientDetails.setPatientImage(image);
            return patientService.updatePatient(id, newPatientDetails);
        } catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/patients/{id}")
    public ResponseEntity<Map<String, Boolean>> deletePatient(@PathVariable Long id){
        return patientService.deletePatient(id);
    }
}
