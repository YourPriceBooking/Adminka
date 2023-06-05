import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Wrapper, Form, Input, Button, Label, Accent, Text, Error } from './VerifierLogin.styled';

export const VerifierLogin = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (evt: { currentTarget: { name: string; value: string } }) => {
    const { name, value } = evt.currentTarget;
    switch (name) {
      case 'id':
        setId(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();

    if (id === '333' && password === '333') {
      console.log({ id, password });
      // onSubmit(id, password);
      setId('');
      setPassword('');
      setIsActive(false);
    } else {
      setError(
        "HEY, WHAT'S WRONG WITH YOU!? COME ON! TRY AGAIN, BUT THIS TIME DO IT RIGHT - I BELIEVE IN YOU!"
      );
    }
  };

  const handleClick = (evt: { currentTarget: { value: string } }) => {
    setIsActive(true);

    if (evt.currentTarget.value.length === 0) {
      setIsActive(false);
    }
  };

  return (
    <Wrapper $error={error}>
      {error && <Error> {error} </Error>}

      <Form onSubmit={handleSubmit}>
        <Label>
          <Text>Verifier ID</Text>
          <Input type="text" name="id" value={id} required onChange={handleInputChange} />
        </Label>
        <Label>
          <Text>Password</Text>
          <Input
            type="password"
            name="password"
            value={password}
            required
            onChange={handleInputChange}
            onInput={handleClick}
          />
        </Label>
        <Link to={`/verification/${id}`}>
          <Button $isActive={isActive} type="submit" disabled={!id}>
            Start
            <Accent $isActive={isActive}>to work</Accent>
          </Button>
        </Link>
      </Form>
      <Outlet />
    </Wrapper>
  );
};
