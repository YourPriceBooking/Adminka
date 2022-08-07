import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { addCity, makeSelectCitiesNamesForState } from 'redux/slices';
import type { NewCityWithOutId } from 'types/apis';
import { AddLocationButton } from '../../State/AddStateForm/AddStateForm.styled';
import { SubmitAddLocationButton } from '../../State/EditStateForm/EditStateForm.styled';
import { Row, AddCityFormStyled } from './AddCityForm.styled';

export const AddCityForm = ({
  stateId,
  stateInternational,
  state,
}: {
  stateId: string;
  stateInternational: string;
  state: string;
}) => {
  const appDispatch = useAppDispatch();
  const selectCitiesNamesForState = useMemo(makeSelectCitiesNamesForState, []);
  const citiesNames = useAppSelector(rootState =>
    selectCitiesNamesForState(rootState, { stateId })
  );

  const [isAddingCity, setIsAddingCity] = useState(false);
  const setAddingCityTrue = useCallback(() => setIsAddingCity(true), []);

  const handleSubmitAddCity = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.currentTarget;

      const content = new FormData(form);
      const cityPhotoURL = content.get('cityPhotoURL')?.toString().trim();
      const cityName = content.get('cityName')?.toString().trim();

      if (!cityPhotoURL || !cityName) {
        toast('Please provide photo url and City name');
        return;
      }

      if (citiesNames?.find(existingCityName => existingCityName === cityName)) {
        toast.info(`${cityName} exists. Fill new 'name'`);
        return;
      }

      const newCity: NewCityWithOutId = {
        stateId,
        cityName,
        cityPhotoURL,
        cityInternational: cityName,
        cityCode: cityName.slice(0, 4).toUpperCase(),
        edited: 0,
        districts: [],

        langCode: 'EN',
        stateInternational,
        state,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      try {
        appDispatch(addCity(newCity));
        setIsAddingCity(false);
        toast.success(`City ${cityName} added`);
      } catch (error) {
        toast.error('City not added');
      }
    },
    [appDispatch, citiesNames, state, stateId, stateInternational]
  );

  return (
    <AddCityFormStyled onSubmit={handleSubmitAddCity}>
      {!isAddingCity && (
        <AddLocationButton type="button" onClick={setAddingCityTrue}>
          +2
        </AddLocationButton>
      )}

      {isAddingCity && (
        <Row>
          <label>
            <input
              type="url"
              name="cityPhotoURL"
              minLength={8}
              maxLength={300}
              required
              title="https://my-location.com/photo.jpg"
            />
            <span>add a link to the photo</span>
          </label>

          <label>
            <input type="text" name="cityName" minLength={3} maxLength={50} required />
            <span>add the name of the city</span>
          </label>

          <SubmitAddLocationButton type="submit">Add Loc 2</SubmitAddLocationButton>
        </Row>
      )}
    </AddCityFormStyled>
  );
};
