import { useLocation } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import Btn from "../component/Button/Btn";
import "./css/IngredientDetailPage.css";

function IngredientDetailPage() {
    const location = useLocation();
    //console.log('location',location.state.igId)
    const ingredient_id = location.state.igId
    const [ingreList, setIngreList] = useState([]);

    useEffect(() => {
        console.log("ingredintId,", ingredient_id)
        console.log('userid,', localStorage.getItem('userId'))
        axios.post("http://localhost:8080/ingredient/detail", {
            userId: localStorage.getItem('userId'),
            igId: ingredient_id
        })
            .then(res => {
                //console.log(res.data)
                setIngreList(res.data);
            })
    }, [])

    // 장바구니 추가
    const submitCart = (val) => {
        if(val == 1){
            alert("이미 장바구니에 추가된 재료입니다.")
        }else{
            axios.post("http://localhost:8080/cart", {
                userId: localStorage.getItem('userId'),
                igId: ingredient_id
            }).then((res)=>{
                console.log("장바구니 추가 후 res", res)
                console.log("장바구니 추가 후 res.data", res.data)
                if(res.data.saveResult == "fail"){
                    alert("이미 장바구니에 추가된 재료입니다.")
                }
            })
        }
    }

    return (
        <div>
            <div className="igDetail__tot">
                <div className="inName">
                    {console.log(ingreList)}
                    <h2 id="inName__name">{ingreList.igName}
                        <button id="cart_btn" onClick={() => { submitCart(ingreList.cart) }}>
                            <img id="cart_img" src="../../img/shopping_cart.png" alt="장바구니 추가" />
                        </button>
                    </h2>
                </div>

                <div className="about_recipe_tot">
                    <div id="about_recipe_title">관련 레시피</div>
                    <div className="about_recipe">
                        {ingreList.recipes
                            ? (ingreList.recipes.map((val) => {
                                return (
                                    <Link to={`/recipe/detail`} state={{ recipeId: val.recipeId }}>
                                        <div key={val.recipeId} className="about_recipe__box">
                                            <div className="about_recipe__img_box">
                                                <img src={val.recipeImg} alt="이미지가 없습니다." className="about_recipe__img" />
                                            </div>
                                            <p>{val.recipeTitle}</p>
                                        </div>
                                    </Link>
                                )
                            }))
                            : <p className="no_result">⚠️ 관련 레시피가 존재하지 않습니다.</p>
                        }
                    </div>
                </div>

                <div className="MinPrice__tot">
                    <div id="MinPrice__title">{ingreList.igName} 최저가</div>

                    {ingreList.items
                        ? (<table className="MinPrice__table"> {ingreList.items.map((val) => {
                            val.title = val.title.replace('<b>', " ")
                            val.title = val.title.replace('</b>', " ")
                            return (
                                <tr>
                                    <td className="MinPrice__img">
                                        <img src={val.image} alt={"상품 이미지가 없습니다."} style={{ width: '60%' }} />
                                    </td>
                                    <td className="MinPrice__name">
                                        {val.title}
                                    </td>
                                    <td className="MinPrice__price">
                                        {val.lprice} 원
                                    </td>
                                    <td className="MinPrice__link">
                                        <Btn context={"구매"} orange={false}
                                            onClick={() => window.open(`${val.link}`, "_blank")} />
                                    </td>
                                </tr>
                            )
                        })
                        }</table>)
                        : <p className="no_result">⚠️ 최저가 상품을 찾을 수 없습니다.</p>
                    }

                    <div className="MinPrice">

                    </div>
                </div>
            </div>

        </div>
    );
}

export default IngredientDetailPage;