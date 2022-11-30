package com.project.rafe.repository;

import com.project.rafe.domain.ingredient.Ingredient;
import com.project.rafe.domain.storage.Storage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StorageRepository extends JpaRepository<Storage, Long> {

    List<Storage> findAllByUserId(Long userId);

    Optional<Storage> findByUserIdAndIngredient(Long userId, Ingredient ingredient);

    Boolean existsByUserIdAndIngredient(Long userId, Ingredient ingredient);



}
