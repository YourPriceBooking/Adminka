import React from 'react';
import { PDescription } from './Components.styled';

type DescriptionComponentProps = {
  hasCard: boolean;
};
export const Description: React.FC<DescriptionComponentProps> = ({ hasCard }) => (
  <div>
    <PDescription hasStyle={hasCard}>
      <p> Здесь мы пишем про объект - описание объекта. </p>
      Commons-logo.svg Медиафайлы на Викискладе Па́бло Эми́лио Эскоба́р Гави́рия (исп. Pablo Emilio
      Escobar Gaviria; 1 декабря 1949 — 2 декабря 1993) — колумбийский наркобарон и террорист.
      Эскобара называют «Королем кокаина», поскольку он был лидером Медельинского картеля,
      контролировавшего к концу 1980 года 80 % от мирового рынка кокаина[4].
    </PDescription>
  </div>
);
