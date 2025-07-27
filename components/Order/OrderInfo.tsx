import { Order } from "@/types/productType";
import { FaCreditCard, FaPix } from "react-icons/fa6";
import styled from "styled-components";

const OrderInfo = ({ order }: { order: Order }) => {

  return (
    <Wrapper>
      <Summary>
        <SummaryTitle>Resumo da Entrega</SummaryTitle>
        {(order.deliveryType === "pickup") ? (
          <InfoWrapper>
            <Topic>Retirada na Loja</Topic>
            <Span>Clique para ver a localização da Loja</Span>
          </InfoWrapper>
        ) : (
          <>
            <InfoWrapper>
              <Topic>Cidade</Topic>
              <Span>{order.delivery?.city} - {order.delivery?.state}</Span>
            </InfoWrapper>
            <InfoWrapper>
              <Topic>Endereço</Topic>
              <Span>{order.delivery?.address}, {order.delivery?.number} - {order.delivery?.district}</Span>
            </InfoWrapper>
            <InfoWrapper>
              <Topic>CEP</Topic>
              <Span>{order.delivery?.zipCode.replace(/(\d{5})(\d{3})/, '$1-$2')}</Span>
            </InfoWrapper>
            {(order.delivery?.complement) ? (
              <InfoWrapper>
              <Topic>Complemento</Topic>
              <Span>{order.delivery?.complement}</Span>
            </InfoWrapper>
            ) : (<></>)}
          </>
        )}
      </Summary>
      <Summary>
        <SummaryTitle>Resumo do Pagamento</SummaryTitle>
        <PaymentWrapper>
          {(order.paymentMethod === 'Pix - A combinar') ? (
            <FaPix size={32} color="#32BCAD" />
          ) : (
            <FaCreditCard size={24} color="#32BCAD" />
          )}
          <Span>{order.paymentMethod}</Span>
        </PaymentWrapper>
      </Summary>
    </Wrapper>
  );
}

export default OrderInfo;


const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  padding: 0 16px;
	margin-left: auto;
	margin-right: auto;

	display: flex;
	flex-direction: column;
	align-items: center;
  gap: 8px;

  @media screen and (max-width: 768px) {
    padding: 0 8px;
  }
`
const InfoWrapper = styled.div`
  width: 100%;
  padding: 0 8px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const Topic = styled.span`
  color: #13131A;
  font-size: 14px;
  font-weight: 600;
`
const Span = styled.span`
  color: #13131A;
  font-size: 14px;
  font-weight: 500;
`
const Summary = styled.div`
  width: 100%;
  padding: 16px 12px;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

	display: flex;
	flex-direction: column;
	align-items: center;
  gap: 8px;
`
const SummaryTitle = styled.h5`
  color: #13131A;
  font-size: 18px;
  font-weight: 600;
  align-self: flex-start;
  margin-bottom: 8px;
`
const PaymentWrapper = styled.div`
  width: 100%;
  padding: 0 8px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`