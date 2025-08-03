import fireDB from "@/firebase/initFirebase";
import { NewProduct, Product, Variant } from "@/types/productType";
import storeData from "@/utils/storeData";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import styled from "styled-components";
import { v4 } from "uuid";

const ProductUpdate = ({ product, setSelectedProduct }: { product: Product, setSelectedProduct: any }) => {
  const [newProduct, setNewProduct] = useState<NewProduct>({
    title: product.title,
    brand: product.brand,
    category: product.category,
    description: product.description,
  })
  const [variants, setVariants] = useState<any>(product.variants);

  const promotionals: any = []
  product.variants.filter((variant: Variant) => variant.promotional != null).forEach((variant) => {
    promotionals.push(variant.id)
  });
  const [promoPrice, setPromoPrice] = useState<any>(promotionals);


  async function updateData(product: Product) {
    try {
      await updateDoc(doc(fireDB, "products", product.id), {
        title: newProduct.title,
        brand: newProduct.brand,
        category: newProduct.category,
        description: newProduct.description,
        variants: variants
      })
      alert('atualizado')
      setSelectedProduct('')
    } catch (error) {
      alert(error)
    }
  }


  const handleAdd = (e: any) => {
    e.preventDefault()
    const abc = [...variants, { id: v4().slice(-12) }]
    setVariants(abc)
  }
  const handleChangeName = (onChangeValue: any, i: any) => {
    const inputData = [...variants]
    inputData[i].name = onChangeValue.target.value;
    setVariants(inputData)
  }
  const handleChangePrice = (onChangeValue: any, i: any) => {
    const inputData = [...variants]
    inputData[i].price = Number(onChangeValue.target.value);
    setVariants(inputData)
  }
  const handleChangePromotional = (onChangeValue: any, i: any) => {
    const inputData = [...variants]
    inputData[i].promotional = Number(onChangeValue.target.value);
    setVariants(inputData)
  }
  const handleDeletePromotional = (i: any) => {
    const inputData = [...variants]
    inputData[i].promotional = null;
    setVariants(inputData)
  }
  const handleChangeStock = (onChangeValue: any, i: any) => {
    const inputData = [...variants]
    inputData[i].stock = Number(onChangeValue.target.value);
    setVariants(inputData)
  }
  const handleDelete = (i: any) => {
    const deletVariante = [...variants]
    deletVariante.splice(i, 1)
    setVariants(deletVariante)
  }


  console.log(variants)


  return (
    <UpdateWrapper>
      <InputDoubleWrapper>
        <InputWrapper>
          <Label>Nome</Label>
          <Input type="text" value={newProduct.title} onChange={(e: any) => setNewProduct({ ...newProduct, title: e.target.value })} />
        </InputWrapper>
        <InputWrapper>
          <Label>Marca</Label>
          <Input type="text" value={newProduct.brand} onChange={(e: any) => setNewProduct({ ...newProduct, brand: e.target.value })} />
        </InputWrapper>
        <InputWrapper>
          <Label>Categoria</Label>
          <Input type="text" value={newProduct.category} onChange={(e: any) => setNewProduct({ ...newProduct, category: e.target.value })} />
        </InputWrapper>
      </InputDoubleWrapper>
      <InputWrapper>
        <Label>Descrição</Label>
        <TextArea value={newProduct.description} onChange={(e: any) => setNewProduct({ ...newProduct, description: e.target.value })} />
      </InputWrapper>
      {(variants.map((variant: Variant, i: any) => (
        <VariantWrapper key={variant.id} >
          <SpaceBetween>
            <Label style={{ alignSelf: 'flex-start', fontWeight: 600 }} >Variante {i + 1}</Label>
            {variants.length > 1 && <FaTrash size={16} color="#F1AAAA" onClick={() => handleDelete(i)} />}
          </SpaceBetween>
          <InputDoubleWrapper>
            <InputWrapper>
              <Label>Nome</Label>
              <Input type="text" value={variant.name} onChange={e => handleChangeName(e, i)} />
            </InputWrapper>
            <InputWrapper>
              <Label>Estoque</Label>
              <Input type="number" value={variant.stock} onChange={e => handleChangeStock(e, i)} />
            </InputWrapper>
            <InputWrapper>
              <Label>Preço</Label>
              <Input type="number" value={variant.price} onChange={e => handleChangePrice(e, i)} />
            </InputWrapper>
            {(promoPrice.includes(variant.id)) ? (
              <InputDoubleWrapper>
                <InputWrapper>
                  <Label>Promocional</Label>
                  <Input type="number" value={variant.promotional} onChange={e => handleChangePromotional(e, i)} />
                </InputWrapper>
                <button onClick={() => { setPromoPrice(promoPrice.filter((item: any) => item !== variant.id)); handleDeletePromotional(i) }}>Remover Promoção</button>
              </InputDoubleWrapper>
            ) : (<>
              <button onClick={() => { setPromoPrice([...promoPrice, variant.id]) }}>Adicionar Promoção</button>
            </>)}
          </InputDoubleWrapper>
        </VariantWrapper>
      )))}
      <SpaceBetween>
        <AddVariantButton onClick={(e) => handleAdd(e)}>Adiconar variante</AddVariantButton>
        <UpdateButton onClick={() => updateData(product)}>Atualizar Produto</UpdateButton>
      </SpaceBetween>
    </UpdateWrapper>
  );
}

export default ProductUpdate;



const UpdateWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 4px;
`
const InputWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`
const SpaceBetween = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`
const Label = styled.label`
  color: #13131A;
  font-size: 14px;
  font-weight: 500;
`
const Input = styled.input`
  width: 100%;
  padding: 6px 4px;
  border-radius: 4px;
  border: none;
  outline: none;
  font-family: 'Montserrat';
  border: 1px solid #C4C4C4;
  

  ::placeholder {
    color: #C4C4C4;
    font-size: 14px;
    font-weight: 600;
  }
`
const TextArea = styled.textarea`
  width: 100%;
  padding: 6px 4px;
  border-radius: 4px;
  border: none;
  outline: none;
  font-family: 'Montserrat';
  border: 1px solid #C4C4C4;
  

  ::placeholder {
    color: #C4C4C4;
    font-size: 14px;
    font-weight: 600;
  }
`
const InputDoubleWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`
const VariantWrapper = styled.div`
  width: 100%;
  padding: 4px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-top: 1px dotted gray;
  border-bottom: 1px dotted gray;
  border-radius: 4px;
`
const AddVariantButton = styled.button`
  width: 100%;
  margin: 0;
  padding: 8px;

  background-color: ${storeData.secondaryColor};
  background-clip: padding-box;

  border: none;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;

  color: #fff;
  font-family: "Montserrat";
  font-size: 14px;
  font-weight: 500;
  line-height: 1.25;
  text-decoration: none;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;

  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  -webkit-tap-highlight-color: transparent;

  &:hover, &:focus {
    background-color: #13131A;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: ${storeData.primaryColor};
    box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
    transform: translateY(0);
  }
`
const UpdateButton = styled.button`
  width: 100%;
  margin: 0;
  padding: 8px;

  background-color: #01cc65;
  background-clip: padding-box;

  border: none;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;

  color: #fff;
  font-family: "Montserrat";
  font-size: 14px;
  font-weight: 500;
  line-height: 1.25;
  text-decoration: none;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;

  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  -webkit-tap-highlight-color: transparent;

  &:hover, &:focus {
    background-color: #13131A;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: ${storeData.primaryColor};
    box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
    transform: translateY(0);
  }
`