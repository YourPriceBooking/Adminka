import type { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from 'App';
import { generateCityCode, logRender } from 'common/utils';
import { selectActiveLanguageId, selectIsEnglishActiveLang } from 'features/languages';
import { makeSelectStateInternational } from 'features/states';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import type { AddCity } from 'types/apis';
import { AddLocationButton } from '../../States/AddStateForm/AddStateForm.styled';
import { SubmitAddLocationButton } from '../../States/EditStateForm/EditStateForm.styled';
import { Row, AddCityFormStyled } from './AddCityForm.styled';

type AddCityFormProps = {
  stateId: EntityId;
};

export const AddCityForm = ({ stateId }: AddCityFormProps) => {
  const [isAddingCity, setIsAddingCity] = useState(false);
  const setAddingCityTrue = useCallback(() => setIsAddingCity(true), []);

  const selectStateInternational = useMemo(() => makeSelectStateInternational(stateId), [stateId]);
  const stateInternational = useAppSelector(selectStateInternational);
  const activeLangId = useAppSelector(selectActiveLanguageId);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const isLoading = false;
  const isSubmitDisabled = !activeLangId || !isEng || isLoading;

  const handleSubmitAddCity = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isSubmitDisabled || !stateInternational) return;
      const form = e.currentTarget;

      const content = new FormData(form);
      const cityPhotoURL = content.get('cityPhotoURL')?.toString().trim();
      const cityName = content.get('cityName')?.toString().trim();

      if (!cityPhotoURL || !cityName) {
        toast('Please provide photo url and City name');
        return;
      }

      // if (citiesNames?.find(existingCityName => existingCityName === cityName)) {
      //   toast.info(`${cityName} exists. Fill new 'name'`);
      //   return;
      // }

      const newCity: AddCity = {
        stateId,
        stateInternational,

        cityName,
        cityPhotoURL,
        cityInternational: cityName,
        cityCode: generateCityCode(cityName),

        langCode: 'EN',
      };

      try {
        // appDispatch(addCity(newCity));
        logRender('addCity', newCity);

        setIsAddingCity(false);
        toast.success(`City ${cityName} added`);
      } catch (error) {
        toast.error('City not added');
      }
    },
    [isSubmitDisabled, stateId, stateInternational]
  );

  const showAddLocationButton = isEng && !isAddingCity && (
    <AddLocationButton type="button" onClick={setAddingCityTrue}>
      +2
    </AddLocationButton>
  );

  const showAddLocationFormInterface = isAddingCity && (
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
  );

  return (
    <AddCityFormStyled onSubmit={handleSubmitAddCity}>
      {showAddLocationButton}

      {showAddLocationFormInterface}
    </AddCityFormStyled>
  );
};
