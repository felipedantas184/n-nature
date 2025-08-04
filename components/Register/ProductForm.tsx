import { NewProduct } from "@/types/productType";
import { addProduct } from "@/utils/functions";
import storeData from "@/utils/storeData";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";

const ProductForm = () => {
  const router = useRouter()
  const [imageUpload, setImageUpload] = useState<any>([]);
  const [variant, setVariant] = useState<boolean>(false);
  const [promoPrice, setPromoPrice] = useState<any>([]);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    title: '',
    brand: '',
    category: '',
    description: '',
  })
  const variantsInitialState = [{
    id: v4().slice(-12),
    name: 'Único',
    price: null,
    promotional: null,
    stock: null
  }]
  const [variants, setVariants] = useState<any>(variantsInitialState);
  console.log(variants)

  const handleNewProduct = async (e: any) => {
    e.preventDefault()
    addProduct(imageUpload, newProduct, variants, router)
  }

  const handleAdd = (e: any) => {
    e.preventDefault()
    const abc = [...variants, {
      id: v4().slice(-12),
      promotional: null,
    }]
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
  const handleUnicName = () => {
    const inputData = [variants[0]]
    inputData[0].name = "Único";
    setVariants(inputData)
  }

  const handleFormattedPrice = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const numericValue = parseInt(rawValue, 10) || 0; // Converte para número (em centavos)

    const formattedValue = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numericValue / 100); // Formata para Real

    // Atualiza a exibição do valor formatado sem alterar a lógica do preço
    const updatedVariants = [...variants];
    updatedVariants[i].formattedPrice = formattedValue; // Atualiza apenas a exibição
    setVariants(updatedVariants);

    // Chama a função original passando o valor numérico bruto (em centavos convertido para reais)
    e.target.value = (numericValue / 100).toString(); // Ajusta o valor do evento
    handleChangePrice(e, i);
  };

  const handleFormattedPromotional = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const numericValue = parseInt(rawValue, 10) || 0; // Converte para número (em centavos)

    const formattedValue = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numericValue / 100); // Formata para Real

    // Atualiza a exibição do valor formatado sem alterar a lógica do preço
    const updatedVariants = [...variants];
    updatedVariants[i].formattedPromotional = formattedValue; // Atualiza apenas a exibição
    setVariants(updatedVariants);

    // Chama a função original passando o valor numérico bruto (em centavos convertido para reais)
    e.target.value = (numericValue / 100).toString(); // Ajusta o valor do evento
    handleChangePromotional(e, i);
  };

  return (
    <Form onSubmit={handleNewProduct}>
      <Half>
        <InputWrapper>
          <Label>Produto</Label>
          <Input type='text' placeholder="Nome do produto" required
            value={newProduct.title} onChange={(e: any) => setNewProduct({ ...newProduct, title: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Marca</Label>
          <Input type='text' placeholder="Marca do produto" required
            value={newProduct.brand} onChange={(e: any) => setNewProduct({ ...newProduct, brand: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Categoria</Label>
          <Input type='text' placeholder="Categoria do produto" required
            value={newProduct.category} onChange={(e: any) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Descrição</Label>
          <TextArea placeholder="Descreva o produto" required
            value={newProduct.description} onChange={(e: any) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
        </InputWrapper>
        <RadioButtons>
          <RadioInput type="radio" name="size" id="big" checked={!variant} onClick={() => { setVariant(false); handleUnicName() }} />
          <RadioLabel htmlFor="big">Produto sem variante</RadioLabel>

          <RadioInput type="radio" name="size" id="small" checked={variant} onClick={() => setVariant(true)} />
          <RadioLabel htmlFor="small">Definir variantes</RadioLabel>
        </RadioButtons>

        {variants.map((data: any, i: any) => {
          return (
            <div key={i} style={{ width: '100%' }}>
              <InputDoubleWrapper>
                {(variant) ? (
                  <InputWrapper>
                    <Label>Variante</Label>
                    <Input type='text' placeholder="Nome" required
                      value={data.name} onChange={e => handleChangeName(e, i)}
                    />
                  </InputWrapper>
                ) : (<></>)}
                <InputWrapper>
                  <Label>Preço</Label>
                  <Input type="text"
                    placeholder="Preço"
                    required
                    value={variants[i]?.formattedPrice || ''} // Exibe o valor formatado
                    onChange={e => handleFormattedPrice(e, i)}
                  />
                </InputWrapper>
                {(promoPrice.includes(i)) ? (
                  <InputWrapper>
                    <Label>Promocional</Label>
                    <Input type='text'
                      placeholder="Preço Promocional"
                      required
                      value={variants[i]?.formattedPromotional || ''} // Exibe o valor formatado
                      onChange={e => handleFormattedPromotional(e, i)}
                    />
                  </InputWrapper>
                ) : (<></>)}
                <InputWrapper>
                  <Label>Estoque</Label>
                  <Input type='number' placeholder="Estoque" required
                    value={data.stock} onChange={e => handleChangeStock(e, i)}
                  />
                </InputWrapper>
                <DeleteVariantButton disabled={variants.length <= 1} onClick={() => handleDelete(i)}>x</DeleteVariantButton>
              </InputDoubleWrapper>
              <div style={{ width: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 24, paddingLeft: 8, marginTop: 8 }} >
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start' }} >
                  <input type="radio" id={`promo${i}`} checked={promoPrice.includes(i)} name={`promo${i}`} onClick={() => { setPromoPrice([...promoPrice, i]) }} />
                  <label htmlFor={`promo${i}`} style={{ fontSize: 12 }}>Definir preço promocional</label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start' }} >
                  <input type="radio" id={`noPromo${i}`} checked={!promoPrice.includes(i)} name={`promo${i}`} onClick={() => { setPromoPrice(promoPrice.filter((item: { item: any }) => item != i)); handleDeletePromotional(i) }} />
                  <label htmlFor={`noPromo${i}`} style={{ fontSize: 12 }}>Não definir preço promocional</label>
                </div>
              </div>
            </div>
          )
        })}
        {(variant) ? (
          <RegistertButton onClick={(e) => handleAdd(e)}>Adicionar Variante</RegistertButton>
        ) : (<></>)}
      </Half>
      <Half>
        {(imageUpload.length >= 1) ? (
          <Image style={{ alignSelf: 'flex-start', borderRadius: 8 }} src={URL.createObjectURL(imageUpload[0])} alt={''} width={300} height={300} />
        ) : (
          <></>
        )}
        <InputWrapper>
          <Label>Foto</Label>
          <Input type='file' accept="image/*" onChange={(e) => (setImageUpload(e.target.files))} required />
        </InputWrapper>
        <RegistertButton type="submit" >Adicionar Produto</RegistertButton>
      </Half>
    </Form>
  );
}

export default ProductForm;


const Form = styled.form`
  width: 100%;
  padding: 8px;

	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
  gap: 12px;

  @media screen and (max-width: 768px) {
  flex-direction: column;
  align-items: center;
}`
const Half = styled.div`
  width: 100%;
  flex: 1;
  padding: 8px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
  gap: 12px;
`
const InputWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`
const Label = styled.label`
  color: #13131A;
  font-size: 14px;
  font-weight: 500;
`
const Input = styled.input`
  width: 100%;
  padding: 12px 8px;
  border-radius: 4px;
  border: none;
  outline: none;
  font-family: 'Montserrat';
  border-bottom: 1px solid #C4C4C4;
  

  ::placeholder {
    color: #C4C4C4;
    font-size: 14px;
    font-weight: 600;
  }
`
const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 8px;
  border-radius: 4px;
  border: none;
  outline: none;
  font-family: 'Montserrat';
  border-bottom: 1px solid #C4C4C4;
  resize: vertical;
  max-height: 120px;
  min-height: 60px;
  

  ::placeholder {
    color: #C4C4C4;
    font-size: 14px;
    font-weight: 600;
  }
`
const RadioButtons = styled.div`
  align-self: flex-start;
  padding: 4px; 
   
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`
const RadioInput = styled.input`
  display: none;

  &:checked + label {
    background-color: ${storeData.secondaryColor};
    color: #FFFFFF;
  }
`
const RadioLabel = styled.label`
  position: relative;
  color: ${storeData.secondaryColor};
  font-family: "Montserrat";
  font-size: 16px;
  border: 2px solid ${storeData.secondaryColor};
  border-radius: 5px;
  padding: 8px 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`
const InputDoubleWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`
const DeleteVariantButton = styled.button`
  padding: 12px 8px;
  align-self: flex-end;
  background-color: #a72f26;
  background-clip: padding-box;

  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;

  color: #fff;
  font-family: "Montserrat";
  font-size: 12px;
  font-weight: 600;
  line-height: 1.25;
  text-decoration: none;
  cursor: pointer;

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
    background-color: #a72f26;
    box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
    transform: translateY(0);
  }

  &:disabled {
    background-color: grey;
  }
`
const RegistertButton = styled.button`
  width: 100%;
  min-height: 3rem;
  margin: 0;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);

  background-color: ${storeData.secondaryColor};
  background-clip: padding-box;

  border: 1px solid transparent;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;

  color: #fff;
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: 600;
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
    background-color: ${storeData.secondaryColor};
    box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
    transform: translateY(0);
  }
`