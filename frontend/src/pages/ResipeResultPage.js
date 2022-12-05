import "../component/Layout/Text.css";
import "./css/StoragePage.css";
import RecipePageLayout from "../component/Layout/RecipePageLayout";
import RecipeHeader from "../component/Layout/RecipeHeader";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"

function RecipeResultPage() {
    const [recipeList, setRecipeList] = useState([]);

    const location = useLocation();
    console.log(location.state)
    const categoryId = location.state.categoryId
    const lactos = location.state.lactos
    const caffeine = location.state.caffeine
    const igId = location.state.ingredientId
    const keyword = location.state.keyward
    console.log("categoryId:", categoryId)
    console.log("lactos:", lactos)
    console.log("caffeine:", caffeine)
    console.log("igId:", igId)
    console.log("keyword:", keyword)


    const getResult = (res) => {
        if (res.data.success === undefined) {
            setRecipeList(res.data);
        }
        else {
            alert(res.data.message);
        }
    };

    useEffect(() => {
        axios.post("http://localhost:8080/recipe/result", {
            categoryId: categoryId,
            keyword: keyword,
            lactos: lactos,
            caffeine: caffeine,
            ingredientId: igId
        })
        .then(res => {
                getResult(res);
            })
    }, []);

    return (
        <div className="Recipe">
            <RecipeHeader category={categoryId} />
            <RecipePageLayout recipe={recipeList} length={recipeList.length}/>
        </div>
    )
}

export default RecipeResultPage;