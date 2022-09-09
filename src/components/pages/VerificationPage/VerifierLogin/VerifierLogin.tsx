
    import React, { useState } from 'react';
    import { Form, Input, Button, Label, Accent } from './VerifierLogin.styled';

    export const VerifierLogin = () => {
      const [id, setId] = useState('');
      const [password, setPassword] = useState('');
      const [isActive, setIsActive] = useState(false);
      const [isHovering, setIsHovering] = useState(false);
      
      const handleInputChange = (evt: { currentTarget: { name: string; value: string; }; }) => {
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
      const handleSubmit = (evt: { preventDefault: () => void; }) => {
        evt.preventDefault();
        console.log({id, password});
        // onSubmit(id, password);
        setId('');
        setPassword('');
        setIsActive(false);
      };
  const handleClick = () => {
 
    setIsActive(true);

  };
        const handleMouseEnter = () => {
          setIsHovering(true);
        };

        const handleMouseLeave = () => {
          setIsHovering(false);
        };
      
      return (
        <Form onSubmit={handleSubmit}>
          <Label>
            Verifier ID
            <Input type="text" name="id" value={id} required onChange={handleInputChange} />
          </Label>
          <Label>
            Password
            <Input
              type="password"
              name="password"
              value={password}
              required
              onChange={handleInputChange}
              onInput={handleClick}
            />
          </Label>
          <Button
            type="submit"
            disabled={!id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Start
            <Accent
              style={{
                // eslint-disable-next-line no-nested-ternary
                color: isActive ? (isHovering ? 'rgba(76, 76, 76, 0.69)' : '#4C4C4C') : '',
              }}
            >
              to work
            </Accent>
          </Button>
        </Form>
      );
    };
