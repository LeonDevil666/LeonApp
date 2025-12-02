package com.example.LeonApp.service;

import com.example.LeonApp.entity.Person;
import com.example.LeonApp.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonService {
    private final PersonRepository repository;

    public List<Person> getAllPersons() {
        return repository.findAll();
    }

    public void savePerson(Person person) {
        if(person != null) {
            person.setPassword(Base64.getEncoder().encodeToString(person.getPassword().getBytes()));
            repository.save(person);
        }
    }

    public void deleteAllPersons() {
        repository.deleteAll();
    }
}
