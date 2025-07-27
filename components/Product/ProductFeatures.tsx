import { Product } from "@/types/productType";
import styled from "styled-components";

const ProductFeatures = ({product} : {product : Product}) => {
  return ( 
    <Section>
      <Wrapper>
      <TextWrapper>
          <Topic>Modelo</Topic>
          <Span>{product.title}</Span>
        </TextWrapper>
        <TextWrapper>
          <Topic>Marca</Topic>
          <Span>{product.brand}</Span>
        </TextWrapper>
        <TextWrapper>
          <Topic>Descrição</Topic>
          <Paragraph>{product.description}</Paragraph>
        </TextWrapper>
      </Wrapper>
    </Section>
   );
}
 
export default ProductFeatures;


const Section = styled.section`
  background-color: #F6F6F6;
  padding: 25px 0;
  border-top: 1px solid #D4D4D4;
`
const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  padding: 0 16px;
	margin-left: auto;
	margin-right: auto;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
  gap: 8px;

  @media screen and (max-width: 768px) {
    padding: 0 8px;
  }
`
const TextWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
`
const Topic = styled.span`
  color: #13131A;
  font-size: 16px;
  font-weight: 500;
`
const Paragraph = styled.p`
  color: #13131A;
  font-size: 14px;
  font-weight: 400;
`
const Span = styled.span`
  color: #13131A;
  font-size: 16px;
  font-weight: 400;
`