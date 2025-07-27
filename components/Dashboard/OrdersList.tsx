import styled from "styled-components";
import OrdersCard from "./OrdersCard";
import { Order } from "@/types/productType";

const OrdersList = ({orders, getProductName} : {orders : Order[], getProductName : (productId : string) => string}) => {
  return ( 
    <Wrapper>
      <Title>Pedidos</Title>
      {orders.map((order : Order) => (
        <OrdersCard key={order.id} order={order} getProductName={getProductName} />
      ))}
    </Wrapper>
   );
}
 
export default OrdersList;



const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  padding: 16px;
	margin-left: auto;
	margin-right: auto;

	display: flex;
	flex-direction: column;
	align-items: center;
  gap: 16px;

  background-color: #FFF;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  @media screen and (max-width: 768px) {
    padding: 8px;
  }
`
const Title = styled.h1`
  color: #13131A;
  font-size: 20px;
  font-weight: 700;
`