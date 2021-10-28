import CartActionTypes from "./cart.types";

const INITIAL_VALUE = {
    hidden: true
};

const cartReducer = (state = INITIAL_VALUE, action) => {
    switch(action.type){
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        default: 
            return state;
    }
} 

export default cartReducer;