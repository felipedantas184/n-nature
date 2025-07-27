import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const OrderCard = ({ item }: { item: any }) => {
  return (
    <Product>
      <ImageWrapper href={'/'}>
        <Image src={item.product.imageUrl[0]} alt={item.product.title} fill className={'image'} sizes="(max-width: 384px)" />
      </ImageWrapper>
      <TextWrapper style={{ flex: 2 }} >
        <Brand>{item.product.brand}</Brand>
        <Title>{item.product.title} - {item.variantName}</Title>
      </TextWrapper>
      <TopicWrapper>
        <Quantity>Qntd.: {item.quantity}</Quantity>
        <Price>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(item.price)}</Price>
      </TopicWrapper>
    </Product>
  );
}

export default OrderCard;


const Product = styled.div`
 width: 100%;
 padding: 0 8px;

 display: flex;
 flex-direction: row;
 align-items: center;
 gap: 16px;
`
const ImageWrapper = styled(Link)`
  flex: 1;
  position: relative;
  width: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  > div {
    position: unset !important;
  }

  .image {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;

    &:hover {
      transform: scale(1.1);
      transition: transform 0.5s ease-in-out;
    }
  }
`
const TextWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`
const TopicWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`
const Brand = styled.h3`
  color: #13131A;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
`
const Title = styled.h2`
  color: #13131A;
  font-size: 14px;
  font-weight: 500;
`
const Price = styled.span`
  color: #13131A;
  font-size: 15px;
  font-weight: 600;
`
const Quantity = styled.span`
  color: #13131A;
  font-size: 14px;
  font-weight: 500;
`