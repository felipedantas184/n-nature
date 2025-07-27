import styled from "styled-components";
import ProductCard from "./ProductCard";
import { Product } from "@/types/productType";
import { useState } from "react";
import Banner from "./Banner";

const ProductList = ({ products }: { products: Product[] }) => {
  const [brandFilter, setBrandFilter] = useState('')

  function byName(a: Product, b: Product) {
    if (a.title < b.title) { return -1; }
    if (a.title > b.title) { return 1; }
    return 0;
  }
  function byBrandName(a: string, b: string) {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
  }

  return (
    <Wrapper>
      <Banner />
      <TextWrapper>
        <Title>Nossos Produtos</Title>
        {(brandFilter) ? (
          <Subtitle>{products.filter((product: Product) => product.brand == brandFilter).length} produtos encontrados</Subtitle>
        ) : (
          <Subtitle>{products.length} produtos encontrados</Subtitle>
        )}
      </TextWrapper>

      <BrandWrapper>
        <RadioInput type="radio" name="brand" id='todos' defaultChecked />
        <RadioLabel onClick={() => setBrandFilter('')} htmlFor="todos" >Todos</RadioLabel>
        {products.map((product: Product) => product.brand).filter((brand: any, index: any, current_value: any) => current_value.indexOf(brand) === index).sort(byBrandName).map((brand: string) => (
          <div key={brand}>
            <RadioInput type="radio" name="brand" id={brand} />
            <RadioLabel onClick={() => setBrandFilter(brand)} htmlFor={brand}>{brand}</RadioLabel>
          </div>
        ))}
      </BrandWrapper>

      <GridList>
        {(brandFilter) ? (
          products.sort(byName).filter((product: Product) => product.brand == brandFilter).map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          products.sort(byName).map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </GridList>
    </Wrapper>
  );
}

export default ProductList;


const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  padding: 8px;
	margin-left: auto;
	margin-right: auto;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
  gap: 8px;
`
const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`
const Title = styled.h1`
  color: #13131A;
  font-size: 20px;
  font-weight: 600;
`
const Subtitle = styled.span`
  color: #C4C4C4;
  font-size: 14px;
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
const GridList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`