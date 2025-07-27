import styled from "styled-components"

export const InputWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 4px;
`
export const Label = styled.label`
  color: #13131A;
  font-size: 14px;
  font-weight: 500;
`
export const Input = styled.input`
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
export const InputDoubleWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`
export const Select = styled.select`
  background-color: #FFFFFF;
  width: 100%;
  padding: 12px 8px;
  border-radius: 4px;
  border: 0;
  outline: none;
  font-family: 'Montserrat';
  border-bottom: 1px solid #C4C4C4;
`
export const Option = styled.option`
  font-family: 'Montserrat';
`