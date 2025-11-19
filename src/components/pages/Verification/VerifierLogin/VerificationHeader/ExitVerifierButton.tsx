import { useSelector, useDispatch } from 'react-redux';
// import type { Dispatch } from 'react';
import styled from 'styled-components/macro';
import axios from 'axios';
import type { AppDispatch } from 'App/store';
import { useNavigate } from 'react-router-dom';
import { logout } from 'features/common';
import { selectEmailSlice, setToken } from 'features/access/tokenSlice';

type ExitVerifierProps = {
    $isActive?: boolean;
};


const ExitButton = styled.button.attrs(({ $isActive = false }: ExitVerifierProps) => ({
    $isActive,
}))`
  font-style: normal;
  font-weight: 700;
  border-radius: 19px;
  border-color: transparent;
  outline: transparent;
  background-color: rgb(173, 196, 217);
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  font-size: 18px;
  padding: 16px 25px 16px 28px;
  line-height: 1.15;

  :hover {
    background-color: rgb(168, 213, 255);
  }
 
  :active {
    background-color: rgb(96, 176, 250);
  }
`;

export const ExitVerifierButton = () => {

    const dispatch = useDispatch<AppDispatch>();
    const nav = useNavigate();
    const token = useSelector(selectEmailSlice);

    const handleLogout = async () => {
        try {
            const response = await axios.get(
                'https://ypbooking.chost.com.ua/api/acsess-to-admin/log-out-admin',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.status === 'success') {
                dispatch(setToken(null));
                dispatch(logout());
                nav('/');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message === 'jwt expired') {
                dispatch(setToken(null));
                dispatch(logout());
                nav('/');
                return;
            }
            // eslint-disable-next-line no-console
            console.error(error);
            }
        };
        return (
            <ExitButton $isActive={false} onClick={handleLogout}>Exit verifier profile</ExitButton>
        );
    };
