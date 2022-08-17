import { createSelector } from '@reduxjs/toolkit';
import { logRender } from 'common/utils';

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
  logRender('selectItemsByCategory - output selector');
  return items.filter(item => item.category === category);
};

const makeSelectItemsByCategory = () =>
  createSelector([selectItems, selectCategory], selectByCategory);
const selector1 = makeSelectItemsByCategory();
logRender('selector1', selector1(smallState, 'food'));
