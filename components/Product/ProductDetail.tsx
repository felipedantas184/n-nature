import { Product, Variant } from "@/types/productType";
import Image from "next/image";
import styled from "styled-components";
import DetailButton from "../Buttons/DetailButton";
import ProductFeatures from "./ProductFeatures";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import { useSelector } from "react-redux";

const ProductDetail = ({ product }: { product: Product }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [selectedProduct, setSelectedProduct] = useState({
    id: product.id,
    title: product.title,
    brand: product.brand,
    category: product.category,
    imageUrl: product.imageUrl,
    description: product.description,
    selectedVariant: {
      id: product.variants[0].id,
      name: product.variants[0].name,
      stock: product.variants[0].stock,
    },
    price: product.variants[0].promotional ? product.variants[0].promotional : product.variants[0].price
  })

  const cart = useSelector((state: any) => state.cart);

  useEffect(() => {
    localStorage.setItem("easy-phone-cart", JSON.stringify(cart))
  }, [cart])

  return (
    <>
      <Section>
        <Wrapper>
          <Link href={'/'} style={{ position: 'absolute', zIndex: 2, left: '16px', top: '16px', WebkitTapHighlightColor: 'transparent' }} >
            <FaArrowLeft style={{ backgroundColor: '#C4C4C450', borderRadius: '50%', padding: '2px' }} size={20} color="#33333A" />
          </Link>
          <ImageWrapper>
            <Image src={product.imageUrl[0]} alt={product.title} fill className={'image'} />
          </ImageWrapper>
          <BigWrapper>
            <TextWrapper style={{ marginTop: 24 }} >
              <SpaceBetween>
                <Brand>{product.brand}</Brand>
                <Stock>{selectedVariant.stock} restantes</Stock>
              </SpaceBetween>
              <Title>{product.title}</Title>
              <BrandWrapper>
                {product.variants.map((variant: Variant, i: any) => (
                  <div key={i}>
                    <RadioInput type="radio" checked={(variant === selectedVariant)} name="brand" id={variant.name} />
                    <RadioLabel onClick={() => { setSelectedVariant(variant); setSelectedProduct({ ...selectedProduct, selectedVariant: { id: variant.id, name: variant.name, stock: variant.stock }, price: variant.promotional ? variant.promotional : variant.price }) }} htmlFor={variant.name}>{variant.name}</RadioLabel>
                  </div>
                ))}
              </BrandWrapper>
              <PriceWrapper>
                {(selectedVariant.promotional) ? (
                  <>
                    <OldPrice>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(selectedVariant.price)}</OldPrice>
                    <Promotional>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(selectedVariant.promotional)}</Promotional>
                  </>
                ) : (
                  <Price>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(selectedVariant.price)}</Price>
                )}
              </PriceWrapper>
            </TextWrapper>
            {selectedVariant.stock > 0 && <DetailButton product={selectedProduct} />}
            {selectedVariant.stock === 0 && <span style={{ color: '#EE4B2B', fontSize: 14 }}>Produto esgotado</span>}
          </BigWrapper>
        </Wrapper>
      </Section>
      <ProductFeatures product={product} />
    </>
  );
}

export default ProductDetail;

const Section = styled.section`
  background-color: #F6F6F6;
  padding: 0 0 25px 0;
  min-height: 86vh;

  @media screen and (min-width: 768px) {
    padding: 25px 0;
  }
`
const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
	margin-left: auto;
	margin-right: auto;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
  gap: 8px;

  position: relative;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
`
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 550px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 20px 20px;
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
    transition: transform 0.5s ease-in-out;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      transform: scale(1.1);
    }
  }

  @media screen and (min-width: 768px) {
    border-radius: 20px;
  }
`
const BigWrapper = styled.div`
  width: 100%;
  padding: 0 12px;

  display: flex;
  flex-direction: column;
  gap: 8px;
`
const TextWrapper = styled.div`
  width: 100%;
  padding: 0 12px;

  display: flex;
  flex-direction: column;
  gap: 8px;
`
const SpaceBetween = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Brand = styled.h3`
  color: #13131A;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
`
const BrandWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
`
const RadioInput = styled.input`
  display: none;

  &:checked + label {
    background-color: #13131A;
    color: #FFFFFF;
    border: 1px solid #C4C4C4;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`
const RadioLabel = styled.label`
  position: relative;
  color: #13131A;
  font-family: "Montserrat";
  font-size: 16px;
  border: 2px solid #C4C4C4;
  border-radius: 5px;
  padding: 8px 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`
const Stock = styled.span`
  color: #EE4B2B;
  font-size: 14px;
  font-weight: 400;
`
const Title = styled.h2`
  color: #13131A;
  font-size: 16px;
  font-weight: 600;
`
const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
`
const Price = styled.h4`
  color: #13131A;
  font-size: 18px;
  font-weight: 500;
`
const OldPrice = styled.h4`
  color: #9c2305;
  font-size: 18px;
  font-weight: 500;
  text-decoration: line-through;
`
const Promotional = styled.h4`
  color: #13131A;
  font-size: 18px;
  font-weight: 500;
`