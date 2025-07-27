import { Product } from "@/types/productType";
import storeData from "@/utils/storeData";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ProductCard = ({product} : {product : Product}) => {
  const cart = useSelector((state: any) => state.cart);

  useEffect(() => {
    localStorage.setItem("easy-phone-cart", JSON.stringify(cart))
  }, [cart])

  return (
    <CardLi>
      <ImageWrapper href={`/${product.id}`} >
        <Image src={product.imageUrl[0]} alt={product.title} fill sizes="(max-width: 384px)" className={'image'}  />
      </ImageWrapper >
      <TextWrapper href={'/'} >
        <Brand>{product.brand}</Brand>
        <Title>{product.title}</Title>
        <Price>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format((product.variants[0].promotional ? product.variants[0].promotional : product.variants[0].price))}</Price>
      </TextWrapper>
      <ViewProductButton href={`/${product.id}`} >Visualizar Produto</ViewProductButton>
      {/**<AddToCartButton product={product} /> */}
    </CardLi>
  );
}
 
export default ProductCard;


const CardLi = styled.li`
  background-color: #FFFFFF;
  padding: 0 8px 8px 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
  gap: 4px;
  border-radius: 8px;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`
const ImageWrapper = styled(Link)`
  position: relative;
  width: 100%;
  max-height: 250px;
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.5s ease-in-out;
  -webkit-tap-highlight-color: transparent;

  > div {
    position: unset !important;
    transition: transform 0.5s ease-in-out;
  }
  
  .image {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
    transition: transform 0.5s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }
`
const TextWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
`
const Brand = styled.h3`
  color: #44444A;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
`
const Title = styled.h2`
  color: #13131A;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`
const Price = styled.h4`
  color: #13131A;
  font-size: 14px;
  font-weight: 500;
`
const ViewProductButton = styled(Link)`
  margin: 0;
  padding: 8px 12px;

  background-color: ${storeData.secondaryColor};
  background-clip: padding-box;

  border: none;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;

  color: #fff;
  font-family: "Montserrat";
  font-size: 13px;
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
    background-color: ${storeData.secondaryColor};
    box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
    transform: translateY(0);
  }

  &:disabled {
    background-color: #545454;
  }
`