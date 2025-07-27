import { Order } from "@/types/productType";
{/**import { deleteOrder } from "@/utils/functions"; */}
import { FaCreditCard, FaLocationPin, FaTruck, FaUser, FaWhatsapp } from "react-icons/fa6";
import styled from "styled-components";

const OrdersCard = ({ order, getProductName }: { order: Order, getProductName: (productId: string) => string }) => {
  return (
    <Card>
      <SpaceBetween>
        <MainText><FaUser size={10} color="#13313a" /> {order.personal.name}</MainText>
        <DoubleIcon>
          <a href={`https://wa.me//55${order.personal.phone.replace('-','').replace(')','').replace('(','').replace(' ','')}`} >
            <FaWhatsapp size={16} color="#01cc65" />
          </a>
          {/**<FaTrash size={16} color="#F1AAAA" onClick={() => deleteOrder(order)} />*/}
        </DoubleIcon>
      </SpaceBetween>
      <SpaceBetween>
        <SText><FaCreditCard size={10} color="#A4A4A4" /> {order.paymentMethod}</SText>
        <MainText>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(order.amount)}</MainText>
      </SpaceBetween>
      <SpaceBetween>
        {(order.deliveryType === 'pickup') ? (
          <SText><FaLocationPin size={10} color="#A4A4A4" />Retirar na Loja</SText>
        ) : (
          <TextWrapper>
            <SText><FaTruck size={10} color="#A4A4A4" /> {order.delivery?.address}, {order.delivery?.number} - {order.delivery?.district}</SText>
            <SText>{order.delivery?.zipCode}, {order.delivery?.city}-{order.delivery?.state}</SText>
          </TextWrapper>
        )}
        <SText>{order.timeStamp.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$4:$5:$6 $3/$2/$1')}</SText>
      </SpaceBetween>
      <TextWrapper>
        {order.cart.map((product: any) => (
          <SText key={product.id} >- {getProductName(product.productId)} - {product.variantName} (x{product.quantity})</SText>
        ))}
      </TextWrapper>
    </Card>
  );
}

export default OrdersCard;




const Card = styled.div`
 width: 100%;
 padding: 0 8px;

 display: flex;
 flex-direction: column;
 align-items: flex-start;
 justify-content: center;
 gap: 4px;
`
const SpaceBetween = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const MainText = styled.h2`
  color: #13131A;
  font-size: 13px;
  font-weight: 600;
  align-self: flex-start;
`
const SText = styled.span`
  color: #13131A;
  font-size: 12px;
  font-weight: 500;
  align-self: flex-start;
`
const DoubleIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`