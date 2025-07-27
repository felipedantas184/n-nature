import fireDB from "@/firebase/initFirebase";
import { doc, getDoc } from "firebase/firestore";

export const getProduct = async (productId: string) => {
  try {
    const data = await getDoc(doc(fireDB, "products", productId));
    const product = data.data()

    if (product !== undefined) {
      return product
    }
  } catch (error) {
    alert(error)
  }
}