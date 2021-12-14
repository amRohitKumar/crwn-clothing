import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.action'; 
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { CartItemContainer, ItemCountContainer, ShoppingIconContainer } from './cart-icon.style';

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <CartItemContainer onClick={toggleCartHidden}>
        <ShoppingIconContainer />
        <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartItemContainer>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);