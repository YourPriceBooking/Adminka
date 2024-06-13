import React from 'react';
import cash from 'assets/icons/cash.svg';
import visa from 'assets/icons/visa.svg';
import type { PaymentType } from 'types/apis/objectOnVerify';
import { DivPayment, DivPaymentComp } from './Components.styled';

type PaymentComponentProps = {
  payments: PaymentType[];
};

const PaymentComponent: React.FC<PaymentComponentProps> = ({ payments = [] }) => (
  <DivPayment>
    {payments.map(({ type, id }) => (
      <DivPaymentComp key={id}>
        <img style={{ marginRight: '10px' }} src={id === '1' ? cash : visa} alt="icon payment" />
        {type}
      </DivPaymentComp>
    ))}
  </DivPayment>
);

export default PaymentComponent;
