import ProductForm from "@/components/Register/ProductForm";
import DashboardLayout from "@/layout/DashLayout";
import Head from "next/head";
import styled from "styled-components";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Cadastro de Produto</title>
        <meta name="description" content="Cadastre o seu novo produto!" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        <meta property="og:title" content="Cadastro de Produto" />
        <meta property="og:description" content="Cadastre o seu novo produto!" />
        <meta property="og:image" content="/assets/icons/apple-touch-icon.png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta property="og:site_name" content="Cadastro de Produto" />

        <meta property="twitter:title" content="Cadastro de Produto" />
        <meta property="twitter:description" content="Cadastre o seu novo produto!" />
        <meta property="twitter:image" content="/assets/icons/apple-touch-icon.png" />
      </Head>

      <DashboardLayout>
        <Section>
          <Wrapper>
            <Title>Cadastrar novo produto</Title>
            <ProductForm />
          </Wrapper>
        </Section>
      </DashboardLayout>
    </>
  );
}


export const Section = styled.section`
  height: 100%;
  background-color: #F6F6F6;
  padding: 25px 0;
  overflow-y: scroll;
`
export const Wrapper = styled.div`
  width: 100%;
  padding: 0 16px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;

  @media screen and (max-width: 768px) {
    padding: 0 8px;
  }
`
export const Title = styled.h1`
  color: #13131A;
  font-size: 20px;
  font-weight: 600;
  align-self: flex-start;
  margin-bottom: 8px;
`