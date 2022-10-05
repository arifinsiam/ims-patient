package com.example.springboot.patientserver.service;

import com.example.springboot.patientserver.exception.ResourceNotFoundException;
import com.example.springboot.patientserver.model.ImageModel;
import com.example.springboot.patientserver.model.Patient;
import com.example.springboot.patientserver.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getPatients(){
        return patientRepository.findAll();
    }
    public Patient addPatient(Patient patient){
        return patientRepository.save(patient);
    }

    public Set<ImageModel> uploadImage(MultipartFile multipartFile) throws IOException {
        Set<ImageModel> image = new HashSet<>();
        ImageModel imageModel = new ImageModel(
                multipartFile.getOriginalFilename(),
                multipartFile.getContentType(),
                multipartFile.getBytes()
        );
        image.add(imageModel);
        return image;
    }

    public ResponseEntity<Patient> getPatientById(Long id){
        Patient patient = patientRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Patient does not exist with id: "+id));
        return ResponseEntity.ok(patient);
    }
    public ResponseEntity<Patient> updatePatient(Long id, Patient newPatientDetails){
        Patient patient = patientRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Patient does not exist with id: "+id));
        // update
        patient.setName(newPatientDetails.getName());
        patient.setGender(newPatientDetails.getGender());
        patient.setAge(newPatientDetails.getAge());
        patient.setDob(newPatientDetails.getDob());
        patient.setNumber(newPatientDetails.getNumber());
        patient.setEmail(newPatientDetails.getEmail());
        patient.setAddress(newPatientDetails.getAddress());

        Patient updatedPatient = patientRepository.save(patient);
        return ResponseEntity.ok(updatedPatient);
    }

    public ResponseEntity<Map<String, Boolean>> deletePatient(Long id){
        Patient patient = patientRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Patient does not exist with id: "+id));
        patientRepository.delete(patient);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
