package com.project.rafe.controller;

import com.project.rafe.domain.Recipe.dto.RecipeDetailDto;
import com.project.rafe.domain.Recipe.dto.RecipeDetailReqDto;
import com.project.rafe.domain.Recipe.dto.LikeRequestDto;
import com.project.rafe.domain.Recipe.dto.SimpleRecipeDto;
import com.project.rafe.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;
    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);

    @PostMapping("/recipe/like")
    public ResponseEntity<Map<String ,Object>> press_like(@Valid @RequestBody LikeRequestDto likeRequestDto) {
        Map<String, Object> result;
        //request로 유효성 검사 했으니 바로 검사
        Long userId = likeRequestDto.getUserId();
        Long recipeId = likeRequestDto.getRecipeId();
        return ResponseEntity.ok().body(recipeService.pressLike(userId, recipeId));
    }

    @PostMapping("/recipe/detail")
    public ResponseEntity<?> showRecipeDetail(@RequestBody RecipeDetailReqDto request) {
        RecipeDetailDto result = recipeService.showRecipeDetail(request.getUserId(), request.getRecipeId());
        if (result == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(result);
    }

    //카테고리별 조회 (전체 조회 = 10)
    @GetMapping("/recipe/{category-id}")
    public ResponseEntity<?> showRecipeList(@PathVariable("category-id") Long categoryId) {
        List<SimpleRecipeDto> resultList = recipeService.searchRpByCategory(categoryId);
        if(resultList.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(resultList);
    }

    @GetMapping("/recipe/read")
    public void readRecipeJson (){
        recipeService.read_recipe();
    }
}
