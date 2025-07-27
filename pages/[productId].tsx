import ProductDetail from "@/components/Product/ProductDetail";
import fireDB from "@/firebase/initFirebase";
import Layout from "@/layout/CustomLayout";
import { Product } from "@/types/productType";
import storeData from "@/utils/storeData";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";

export const getServerSideProps = async (context: any) => {
  const id = context.params.productId;
  const data = await getDoc(doc(fireDB, "products", id));
  const product = data.data()
  if (product !== undefined) {
    product.id = id
  }

  return {
    props: {
      product: product,
    }
  }
}

export default function DetailPage({ product }: { product: Product }) {
  return (
    <>
      <Head>
        <title>{product.title} - {product.brand} | {storeData.title}</title>
        <meta name="description" content={`Compre seu ${product.title} - ${product.brand} com as melhores condições na ${storeData.title} `} />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        <meta property="og:title" content={`${product.title} - ${product.brand} | ${storeData.title}`} />
        <meta property="og:description" content={`Compre seu ${product.title} - ${product.brand} com as melhores condições na ${storeData.title} `} />
        <meta property="og:image" content="/assets/icons/apple-touch-icon.png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta property="og:site_name" content={`${product.title} - ${product.brand} | ${storeData.title}`} />

        <meta property="twitter:title" content={`${product.title} - ${product.brand} | ${storeData.title}`} />
        <meta property="twitter:description" content={`Compre seu ${product.title} - ${product.brand} com as melhores condições na ${storeData.title}`} />
        <meta property="twitter:image" content="/assets/icons/apple-touch-icon.png" />
      </Head>

      <Layout>
        <ProductDetail product={product} />
      </Layout>
    </>
  )
}