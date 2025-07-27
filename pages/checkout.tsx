import CheckoutList from "@/components/Checkout/CheckoutList";
import EmptyCart from "@/components/Checkout/EmptyCart";
import CheckoutForm from "@/components/Form/CheckoutForm";
import Layout from "@/layout/CustomLayout";
import storeData from "@/utils/storeData";
import Head from "next/head";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function CheckoutPage() {
  const cart = useSelector((state: any) => state.cart);

  return (
    <>
      <Head>
        <title>Checkout {storeData.title}</title>
        <meta name="description" content="Confirme seus dados para enviar seu pedido!" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        <meta property="og:title" content={`Checkout ${storeData.title}`} />
        <meta property="og:description" content="Confirme seus dados para enviar seu pedido!" />
        <meta property="og:image" content="/assets/icons/apple-touch-icon.png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta property="og:site_name" content={`Checkout ${storeData.title}`} />

        <meta property="twitter:title" content={`Checkout ${storeData.title}`} />
        <meta property="twitter:description" content="Confirme seus dados para enviar seu pedido!" />
        <meta property="twitter:image" content="/assets/icons/apple-touch-icon.png" />
      </Head>

      <Layout>
        {(cart.length === 0) ? (
          <EmptyCart />
        ) : (
          <>
            <BackWrapper href={'/'} >
              <FaArrowLeft size={16} color="#5A5A5A" />
              <Span>Página inicial</Span>
            </BackWrapper>
            <CheckoutList />
            <CheckoutForm />
          </>
        )}
      </Layout>
    </>
  );
}

const BackWrapper = styled(Link)`
  margin-left: auto;
  margin-right: auto;
  padding: 8px 16px 0 16px;

  align-self: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
  -webkit-tap-highlight-color: transparent;
`
const Span = styled.span`
  color: #5A5A5A;
  font-size: 14px;
  text-align: center;
  font-weight: 500;
`