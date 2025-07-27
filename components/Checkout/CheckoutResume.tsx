import styled from "styled-components";

const CheckoutResume = ({cart}:any) => {
  return ( 
    <>
      <TopicWrapper>
        <Topic>Frete</Topic>
        <Span>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(0)}</Span>
      </TopicWrapper>
      <TopicWrapper>
        <Topic>Total de itens</Topic>
        <Span>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(cart.reduce((acc:any, curr:any) => acc + curr.price*curr.quantity, 0))}</Span>
      </TopicWrapper>
      <TopicWrapper>
        <TopicBold>Valor Total</TopicBold>
        <SpanBold>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(cart.reduce((acc:any, curr:any) => acc + curr.price*curr.quantity, 0))}</SpanBold>
      </TopicWrapper>
    </>
   );
}
 
export default CheckoutResume;



const TopicWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Topic = styled.span`
  color: #13131A;
  font-size: 14px;
  font-weight: 500;
`
const Span = styled.span`
  color: #13131A;
  font-size: 14px;
  font-weight: 400;
`
const TopicBold = styled.span`
  color: #13131A;
  font-size: 16px;
  font-weight: 600;
`
const SpanBold = styled.span`
  color: #13131A;
  font-size: 16px;
  font-weight: 500;
`