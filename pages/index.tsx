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
        <title>{storeData.title}</title>
        <meta name="description" content={storeData.description} />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Head>

      <Layout>
        <ProductList products={products} />
      </Layout>
    </>
  );
}