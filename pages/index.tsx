import ProductList from "@/components/Product/ProductList";
import fireDB from "@/firebase/initFirebase";
import Layout from "@/layout/CustomLayout";
import { Product } from "@/types/productType";
import storeData from "@/utils/storeData";
import { collection, getDocs } from "firebase/firestore";
import { NextSeo } from "next-seo";
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
      <NextSeo
        title={storeData.title}
        description={storeData.description}
        openGraph={{
          url: 'https://agprata.vercel.app/',
          title: storeData.title,
          description: storeData.description,
          images: [
            {
              url: 'https://agprata.vercel.app/assets/icons/apple-touch-icon.png',
              width: 400,
              height: 400,
              alt: 'Ag Prata 925',
            },
          ],
          site_name: 'Ag Prata 925',
        }}
        twitter={{
          handle: '@prataag_', // se quiser colocar seu Twitter
          site: '@prataag_',
          cardType: 'summary_large_image',
        }}
      />

      <Layout>
        <ProductList products={products} />
      </Layout>
    </>
  );
}