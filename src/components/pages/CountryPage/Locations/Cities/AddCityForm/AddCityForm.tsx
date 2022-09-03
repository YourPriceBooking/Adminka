import type { FormEvent } from 'react';
import type { EntityId } from '@reduxjs/toolkit';
import type { AddCity } from 'types/apis';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from 'App';
import { generateCityCode, wait } from 'common/utils';
import { Spinner } from 'components/shared/Loader';
import { useAddCityMutation, useLazyGetCitiesQuery } from 'features/cities';
import { selectActiveLanguageId, selectIsEnglishActiveLang } from 'features/languages';
import { makeSelectStateInternational, useLazyGetStatesQuery } from 'features/states';
import { SubmitAddLocationButton } from 'components/shared/Buttons';
import { AddLocationButton } from '../../States/AddStateForm/AddStateForm.styled';
import { Row, AddCityFormStyled } from './AddCityForm.styled';

type AddCityFormProps = {
  stateId: EntityId;
};

export const AddCityForm = ({ stateId }: AddCityFormProps) => {
  const [addCity, { isLoading: isAddingL2 }] = useAddCityMutation();
  const [getStates, { isLoading: isRefetchingStates }] = useLazyGetStatesQuery();
  const [getCities, { isLoading: isRefetchingCities }] = useLazyGetCitiesQuery();

  const selectStateInternational = useMemo(() => makeSelectStateInternational(stateId), [stateId]);
  const stateInternational = useAppSelector(selectStateInternational);
  const activeLangId = useAppSelector(selectActiveLanguageId);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const [isAddingCity, setIsAddingCity] = useState(false);
  const setAddingCityTrue = useCallback(() => setIsAddingCity(true), []);

  const isPending = isAddingL2 || isRefetchingStates || isRefetchingCities;
  const isSubmitDisabled = !activeLangId || !isEng || isPending;

  const handleSubmitAddCity = async (e: FormEvent<HTMLFormElement>) => {
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
      const addedCity = await addCity(newCity).unwrap();
      if (!addedCity) return;

      const addedName = addedCity.entities[addedCity.ids[0]]?.cityName === cityName;
      if (!addedName) return;

      toast.success(`City ${cityName} added`);

      await wait(1500);
      await getStates();
      await getCities();
    } catch (error) {
      toast.error('City not added');
    } finally {
      setIsAddingCity(false);
    }
  };

  const submitAddCityButtonLabel = isPending ? <Spinner /> : 'Add Loc 2';
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

      <SubmitAddLocationButton type="submit" disabled={isPending}>
        {submitAddCityButtonLabel}
      </SubmitAddLocationButton>
    </Row>
  );

  const addLocationButtonLabel = isPending ? <Spinner /> : '+2';
  const showAddLocationButton = isEng && !isAddingCity && !isPending && stateId && (
    <AddLocationButton type="button" onClick={setAddingCityTrue}>
      {addLocationButtonLabel}
    </AddLocationButton>
  );

  return (
    <AddCityFormStyled onSubmit={handleSubmitAddCity}>
      {showAddLocationFormInterface}
      {showAddLocationButton}
    </AddCityFormStyled>
  );
};
