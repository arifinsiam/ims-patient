package com.example.springboot.patientserver.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "gender")
    private String gender;

    @Column(name = "age")
    private String age;

    //@DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "date_of_birth")
    private String dob;

    @Column(name = "number")
    private String number;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String address;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "patient_image",
        joinColumns = {
            @JoinColumn(name = "patient_id")
        },
        inverseJoinColumns = {
            @JoinColumn(name = "image_id")
        }
    )
    private Set<ImageModel> patientImage;

//    @Lob
//    @Column(name = "photo")
//    private byte[] photo;
}
