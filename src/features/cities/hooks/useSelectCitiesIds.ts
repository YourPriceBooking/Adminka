import { useAppSelector } from 'App';
import { logRender } from 'common/utils';
import type { RootState } from 'App/store';
import type { State } from 'types/apis';

const stateItem: State = {
  countryId: '12345CountryId',
  international: 'Ukraine',

  _id: '12345StateId',
  stateName: 'Vinnytsia Region',
  stateInternational: 'Vinnytsia Region',
  stateCode: 'VINR',
  statePhotoURL: 'https://images.com/vinnytsia.jpg',

  cities: [],
  langCode: 'EN',
  dbLangCode: 'EN',

  createdAt: '202208160018',
  updatedAt: '202208160018',
};

/*
RTK Query -> language adapter -> country adapter -> state adapter:

- [ ] selectStatesIds(state: RootState)
- [ ] selectStateById(state: RootState, languageId: string, countryId: string, stateId:
      string)
*/

const selectStateById = (state: RootState, stateId: string) => {
  console.log('selectStateById ~ state', state);
  console.log('selectStateById ~ stateId', stateId);

  return stateItem; // TODO: add adapter for states
};

export const useSelectCitiesIds = (stateId: string) => {
  const region = useAppSelector(state => selectStateById(state, stateId));
  const citiesIds = region;

  logRender('useSelectCitiesIds');
  return citiesIds;
};
