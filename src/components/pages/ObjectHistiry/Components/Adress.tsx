import { DidAdress, SpanAdress } from './Compinents.styled';

export const Adress = () => (
  <div style={{ paddingBottom: '25px' }}>
    <div>
      <SpanAdress>Country</SpanAdress>
      <DidAdress>Ukraine</DidAdress>
      <SpanAdress>State</SpanAdress>
      <DidAdress>Kyiv</DidAdress>
      <SpanAdress>City</SpanAdress>
      <DidAdress>Kyiv</DidAdress>
    </div>

    <div>
      <SpanAdress>Location Register 3</SpanAdress>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <DidAdress>Pechers'kyi district</DidAdress>
      <DidAdress>Location Register 3</DidAdress>
      <DidAdress>Location Register 3</DidAdress>
    </div>
  </div>
);
