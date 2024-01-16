import React from 'react';
import styled from "styled-components";

export default function Register() {
  
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>

        </form>
      </FormContainer>
    </>
  )
}

const FormContainer = styled.div`
`;