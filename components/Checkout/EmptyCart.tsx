import Image from "next/image";
import styled from "styled-components";

const EmptyCart = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={'/assets/icons/emptyCart.svg'} alt={'Carrinho Vazio'} fill className={'image'} />
      </ImageWrapper>
      <Span>Seu carrinho está vazio</Span>
      <Span>Você será redirecionado em instantes...</Span>
    </Wrapper>
  );
}

export default EmptyCart;



const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`
const ImageWrapper = styled.div`
  position: relative;
  width: 50%;
  max-width: 500px;

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
  }
`
const Span = styled.span`
  color: #13131A;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`