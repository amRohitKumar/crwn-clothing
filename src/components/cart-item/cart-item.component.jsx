import React from "react";

import { CartItemContainer, ItemDetailsContainer, PriceContainer } from "./cart-item.style";

const CartItem = ({item: {imageUrl, price, name, quantity}}) => (
    <CartItemContainer>
        <img src={imageUrl} alt="item" />
        <ItemDetailsContainer>
            <PriceContainer>{name}</PriceContainer>
            <PriceContainer>{quantity}x${price}</PriceContainer>
        </ItemDetailsContainer>
    </CartItemContainer>
)

export default CartItem;