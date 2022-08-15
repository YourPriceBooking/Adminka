import { createSelector } from '@reduxjs/toolkit';

type Item = { _id: string; category: string };
type State = { items: Item[] };

const smallState: State = {
  items: [
    { _id: '0', category: 'food' },
    { _id: '1', category: 'electric' },
    { _id: '2', category: 'grocery' },
    { _id: '3', category: 'food' },
  ],
};

const selectItems = (state: State) => state.items;
const selectCategory = (_: State, category: string) => category;
const selectByCategory = (items: Item[], category: string) => {
  console.log('selectItemsByCategory - output selector running');
  return items.filter(item => item.category === category);
};

const makeSelectItemsByCategory = () =>
  createSelector([selectItems, selectCategory], selectByCategory);

const selector1 = makeSelectItemsByCategory();
const r3s1 = selector1(smallState, 'food');
console.log({ r3s1 });

const r4s1 = selector1(smallState, 'food');
console.log({ r4s1 });

const selector2 = makeSelectItemsByCategory();
const r5s2 = selector2(smallState, 'food');
console.log({ r5s2 });
