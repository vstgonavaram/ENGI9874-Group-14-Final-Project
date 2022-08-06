package com.university.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.university.entity.Document;

@Repository
public interface IDocumentRepo extends JpaRepository<Document, Integer>{

}
