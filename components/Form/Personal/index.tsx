import { Input, InputDoubleWrapper, InputWrapper, Label } from "./styles";

type Personal = {
  name: string,
  email: string,
  phone: string,
  cpf: string,
}

const Personal = ({personal, setPersonal} : {personal : Personal, setPersonal : any}) => {
  return (
    <>
      <InputWrapper>
        <Label>Nome</Label>
        <Input type='text' placeholder="Digite seu nome completo" required 
          value={personal.name} onChange={(e: any) => setPersonal({ ...personal, name: e.target.value})}        
          />
      </InputWrapper>
      <InputWrapper>
        <Label>E-mail</Label>
        <Input type='email' placeholder="Digite seu e-mail" required 
          value={personal.email} onChange={(e: any) => setPersonal({ ...personal, email: e.target.value})}        
        />
      </InputWrapper>
      <InputDoubleWrapper>
        <InputWrapper>
          <Label>WhatsApp</Label>
          <Input type='tel' placeholder="Digite seu telefone" required minLength={11}
            value={personal.phone} onChange={(e: any) => setPersonal({ ...personal, phone: e.target.value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')})}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>CPF</Label>
          <Input type='tel' placeholder="Digite seu CPF (somente números)" required minLength={11}
            value={personal.cpf} onChange={(e: any) => setPersonal({ ...personal, cpf: e.target.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')})}
          />
        </InputWrapper>
      </InputDoubleWrapper>
    </>
  );
}

export default Personal;