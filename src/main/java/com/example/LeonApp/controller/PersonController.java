package com.example.LeonApp.controller;

import com.example.LeonApp.entity.Person;
import com.example.LeonApp.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PersonController {

    private final PersonService service;

    @GetMapping(value = "/api/get-all-persons")
    public List<Person> getAllPersons() {
        return service.getAllPersons();
    }

    @PostMapping(value = "/api/save-new-person")
    public void savePerson(@RequestBody Person person) {
        service.savePerson(person);
    }

    @DeleteMapping(value = "/api/delete-all-persons")
    public void deleteAllPersons() {
        service.deleteAllPersons();
    }
}
