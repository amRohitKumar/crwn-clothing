import styled from "styled-components";

export const CartDropdownContainer = styled.div`
    position: absolute;
    width: 240px;
    height: 340px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid black;
    background-color: white;
    top: 90px;
    right: 40px;
    z-index: 5; 
    
    button {
        margin-top: auto;
    }
`;

export const CartItemsContainer = styled.div`
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;  
`;

export const EmptySpan = styled.div`
    font-size: 18px;
    margin: 50px auto;
`;