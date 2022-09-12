import type { FormEvent } from 'react';
import { useRef, useCallback, useMemo, useState } from 'react';
import type { EntityId } from '@reduxjs/toolkit';
import type { AddCity } from 'types/apis';
import { toast } from 'react-toastify';
import { useAppSelector } from 'App';
import { generateCityCode, wait } from 'common/utils';
import { Spinner } from 'components/shared/Loader';
import { useAddCityMutation, useLazyGetCitiesQuery } from 'features/cities';
import { selectActiveLanguageId, selectIsEnglishActiveLang } from 'features/languages';
import { makeSelectStateInternational, useLazyGetStatesQuery } from 'features/states';
import { SubmitAddLocationButton } from 'components/shared/Buttons';
import { useCloseOnOutsideClick } from 'common/hooks';
import { selectActiveCountryInternational } from 'features/countries';
import { AddLocationButton } from '../../States/AddStateForm/AddStateForm.styled';
import {
  Row,
  AddCityFormStyled,
  AddCityPhotoLabel,
  AddCityPhotoInput,
  AddCityNameLabel,
  AddCityNameInput,
} from './AddCityForm.styled';

type AddCityFormProps = {
  stateId: EntityId;
};

export const AddCityForm = ({ stateId }: AddCityFormProps) => {
  const [addCity, { isLoading: isAddingL2 }] = useAddCityMutation();
  const [getStates, { isLoading: isRefetchingStates }] = useLazyGetStatesQuery();
  const [getCities, { isLoading: isRefetchingCities }] = useLazyGetCitiesQuery();

  const activeCountryInternational = useAppSelector(selectActiveCountryInternational);
  const selectStateInternational = useMemo(() => makeSelectStateInternational(stateId), [stateId]);
  const stateInternational = useAppSelector(selectStateInternational);
  const activeLangId = useAppSelector(selectActiveLanguageId);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const [isAddingCity, setIsAddingCity] = useState(false);
  const startAdding = useCallback(() => setIsAddingCity(true), []);
  const stopAdding = useCallback(() => setIsAddingCity(false), []);

  const isPending = isAddingL2 || isRefetchingStates || isRefetchingCities;
  const isSubmitDisabled = !activeLangId || !isEng || isPending;

  const formRef = useRef<HTMLFormElement>(null);

  useCloseOnOutsideClick({
    isEditing: isAddingCity,
    stopEditing: stopAdding,
    formRef,
  });

  const handleSubmitAddCity = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitDisabled || !stateInternational) return;
    const form = e.currentTarget;

    const content = new FormData(form);
    const cityPhotoURL = content.get('cityPhotoURL')?.toString().trim();
    const cityName = content.get('cityName')?.toString().trim();

    if (!activeCountryInternational || !cityPhotoURL || !cityName) {
      toast('Please provide photo url and City name');
      return;
    }

    const newCity: AddCity = {
      stateId,
      stateInternational,

      cityName,
      cityInternational: cityName,
      cityCode: generateCityCode(cityName),
      cityPhotoURL,
      cityPhotoAlt: `${cityName}, ${stateInternational}, ${activeCountryInternational}`,

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
      <AddCityPhotoLabel>
        <AddCityPhotoInput
          type="url"
          name="cityPhotoURL"
          minLength={8}
          maxLength={300}
          required
          title="https://my-location.com/photo.jpg"
        />
        <span>Add photo link</span>
      </AddCityPhotoLabel>

      <AddCityNameLabel>
        <AddCityNameInput type="text" name="cityName" minLength={3} maxLength={50} required />
        <span>
          Add <b>city</b> name
        </span>
      </AddCityNameLabel>

      <SubmitAddLocationButton type="submit" disabled={isPending}>
        {submitAddCityButtonLabel}
      </SubmitAddLocationButton>
    </Row>
  );

  const addLocationButtonLabel = isPending ? <Spinner /> : '+2';
  const showAddLocationButton = isEng && !isAddingCity && !isPending && stateId && (
    <AddLocationButton type="button" onClick={startAdding}>
      {addLocationButtonLabel}
    </AddLocationButton>
  );

  return (
    <AddCityFormStyled onSubmit={handleSubmitAddCity} ref={formRef}>
      {showAddLocationFormInterface}

      {showAddLocationButton}
    </AddCityFormStyled>
  );
};
