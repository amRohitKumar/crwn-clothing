export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);
    if(existingCartItem){
        return cartItems.map(cartItem => 
            (cartItem.id === cartItemToAdd.id)?{...cartItem, quantity: cartItem.quantity+1}:cartItem    
        )
    }
    else{
        return [...cartItems, {...cartItemToAdd, quantity: 1}]
    }
}

export const clearItemToCart = (item, reqItem) => {
    return item.filter(cartItem => cartItem.id !== reqItem.id);
}