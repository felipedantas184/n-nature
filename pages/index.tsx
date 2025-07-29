import ProductList from "@/components/Product/ProductList";
import fireDB from "@/firebase/initFirebase";
import Layout from "@/layout/CustomLayout";
import { Product } from "@/types/productType";
import storeData from "@/utils/storeData";
import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";

export async function getServerSideProps() {
  const DBProducts = await getDocs(collection(fireDB, "products"));
  const products: any = []
  DBProducts.forEach((doc) => {
    const obj = {
      id: doc.id,
      ...doc.data()
    }

    products.push(obj)
  });

  return {
    props: {
      products
    }
  }
}


export default function StorePage({ products }: { products: Product[] }) {
  return (
    <>
      <Head>
        <title>Ag Prata 925 | Você Sempre Linda</title>
        <meta name="description" content="Joias confeccionadas em Prata 925 com garantia vitalícia sobre a autenticidade do metal." />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://agprata.vercel.app/" />
        <meta property="og:title" content="Ag Prata 925 | Você Sempre Linda" />
        <meta property="og:description" content="Joias confeccionadas em Prata 925 com garantia vitalícia sobre a autenticidade do metal." />
        <meta property="og:image" content="https://agprata.vercel.app/assets/icons/apple-touch-icon.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Ag Prata 925" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ag Prata 925 | Você Sempre Linda" />
        <meta name="twitter:description" content="Joias confeccionadas em Prata 925 com garantia vitalícia sobre a autenticidade do metal." />
        <meta name="twitter:image" content="https://agprata.vercel.app/assets/icons/apple-touch-icon.png" />
      </Head>

      <Layout>
        <ProductList products={products} />
      </Layout>
    </>
  );
}