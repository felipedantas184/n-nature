import { InputWrapper, Label, Option, Select } from "./styles";

const Payment = ({paymentMethod, setPaymentMethod}: any) => {
  return (
    <InputWrapper>
      <Label>Forma de Pagamento</Label>
      <Select onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod} required>
        <Option value={''} hidden >Escolha um método</Option>
        <Option value={'Pix'} >Pagar com Pix</Option>
      </Select>
    </InputWrapper>
  );
}

export default Payment;