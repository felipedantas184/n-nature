import fireDB, { storage } from "@/firebase/initFirebase"
import { NewProduct, Order } from "@/types/productType"
import { addDoc, collection, deleteDoc, doc, getDoc, increment, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"

export async function deleteOrder(order: Order) {
  try {
    if (confirm("Você tem certeza de que deseja cancelar este pedido?") == true) {
      await deleteDoc(doc(fireDB, "orders", order.id)).then(function () {
        order.cart.map((product: any) => (
          updateDoc(doc(fireDB, "products", product.id), {
            stock: increment(product.quantity)
          })
        ))
      })
      alert("Pedido excluído e estoque atualizado!")
    }
  } catch (error) {
    alert(error)
  }
}

export async function deleteProduct(productId: string) {
  try {
    if (confirm("Você tem certeza de que deseja excluir este produto?") == true) {
      await deleteDoc(doc(fireDB, "products", productId)).then(function () {
        alert("Produto excluído!")
      })
    }
  } catch (error) {
    alert(error)
  }
}

export const addProduct = async (imageUpload: any, newProduct: NewProduct, variants: any, router: any) => {
  try {
    if (imageUpload == null) return;
    var imagesUrls: any = []

    const cleanVariants = variants.map(({ formattedPrice, formattedPromotional, ...rest }: any) => rest);

    await addDoc(collection(fireDB, "products"), {
      title: newProduct.title,
      brand: newProduct.brand,
      category: newProduct.category,
      description: newProduct.description,
      variants: cleanVariants
    }).then(async (docRef) => {
      for (let i = 0; i < imageUpload.length; i++) {
        const imageRef = ref(storage, `images/${docRef.id}/${imageUpload[i].name + v4()}`);
        await uploadBytes(imageRef, imageUpload[i]).then(async (snapshot) => {
          await getDownloadURL(snapshot.ref).then((url) => {
            imagesUrls.push(url)
          })
        })
      }
      updateDoc(doc(fireDB, "products", docRef.id), {
        imageUrl: imagesUrls,
      })
    })
    alert("Produto adicionado com sucesso!")
    router.push({ pathname: '/auth/register' })
  } catch (error) {
    alert(error)
  }
}

export async function updateStockAfterPurchase(cart: any) {
  try {
    for (const item of cart) {
      const { id, quantity, selectedVariant } = item;
      const variantId = selectedVariant.id;

      const productRef = doc(fireDB, "products", id);
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) {
        console.log(`Produto com ID ${id} não encontrado.`);
        continue;
      }

      const productData = productSnap.data();
      const variants = productData.variants;

      const variantIndex = variants.findIndex((variant : any) => variant.id === variantId);
      if (variantIndex === -1) {
        console.log(`Variante ${variantId} não encontrada.`);
        continue;
      }

      // Subtrai a quantidade comprada do estoque
      variants[variantIndex].stock -= quantity;

      // Adiciona a atualização ao batch
      await updateDoc(productRef, { variants });
    }

    console.log("Estoque atualizado com sucesso para todos os produtos no carrinho!");
  } catch (error) {
    console.error("Erro ao processar o pedido:", error);
  }
}