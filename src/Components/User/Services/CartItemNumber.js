import React from "react"
import {Button} from "@material-ui/core"
import CartImage from "../../../Images/shopping-cart.svg"
import "./CartItemNumber.css"

function CartItemNumber({setCurrentSectionMain, cartLength, theme}){

    function handleClick(event){
        event.preventDefault()
        setCurrentSectionMain(12)
    }

    return (
        <div class="cart-navigation" style={{backgroundColor:theme?"#F8F8F8":""}}>
        <div className="cart-detail-div">
            <div className="cart-length">{cartLength}</div>
            <div className="description">Items in cart</div>
        </div>
        <Button variant="contained" className="cement-cart-button my-cart-button" onClick={handleClick}><img src={CartImage}></img>My Cart</Button>
        </div>
    )
}

export default CartItemNumber