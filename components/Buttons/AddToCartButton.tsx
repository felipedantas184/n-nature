import { addToCart } from "@/redux/cart.slice";
import { Product } from "@/types/productType";
import storeData from "@/utils/storeData";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const AddToCartButton = ({product} : {product : Product}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const cartItem = cart.find((item: any) => item.id === product.id)

  return ( 
    (product.variants[0].stock <= 0) ? (
      <AddButton disabled>Esgotado</AddButton>
    ) : (
      (cartItem) ? (
        <AddButton disabled={cartItem.quantity >= product.variants[0].stock} onClick={() => dispatch(addToCart(product))}>Adicionar ({cartItem?.quantity})</AddButton>
      ) : (
        <AddButton onClick={() => dispatch(addToCart(product))}>Adicionar</AddButton>
      )
    )
   );
}
 
export default AddToCartButton;








const AddButton = styled.button`
  width: 100%;
  margin: 0;
  padding: 8px 12px;

  background-color: ${storeData.primaryColor};
  background-clip: padding-box;

  border: none;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;

  color: #fff;
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: 600;
  line-height: 1.25;
  text-decoration: none;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;

  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  -webkit-tap-highlight-color: transparent;

  &:hover, &:focus {
    background-color: #13131A;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: ${storeData.primaryColor};
    box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
    transform: translateY(0);
  }

  &:disabled {
    background-color: #545454;
  }
`