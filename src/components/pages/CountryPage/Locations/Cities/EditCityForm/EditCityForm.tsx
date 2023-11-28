import { useAppDispatch, useAppSelector } from 'App';
import { useCloseOnOutsideClick } from 'common/hooks';
import {
  EditButton,
  UrlDirButton,
  AddDirButton,
  SubmitAddLocationButton,
  ButtonsOverlay,
} from 'components/shared/Buttons';
import { useEditCityMutation, selectCityById } from 'features/cities';
import {
  selectActiveCountryInternational,
  selectActiveCountryName,
  setAddDirHotelier,
} from 'features/countries';
import { selectActiveLangCode, selectIsEnglishActiveLang } from 'features/languages';
import { selectStateById, useAddDirHotelierMutation } from 'features/states';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import type { FormEvent } from 'react';
import type { EditCity } from 'types/apis';
import type { EntityId } from '@reduxjs/toolkit';
import { changeUKToUA } from 'utils/api';
import {
  CityInfo,
  CityNameLabel,
  CityNameInput,
  EditCityPhotoLabel,
  EditCityPhotoURLInput,
  EditCityFormStyled,
} from './EditCityForm.styled';

type EditCityFormProps = {
  cityId: EntityId;
  stateId: EntityId;
};

export const EditCityForm = ({ cityId, stateId }: EditCityFormProps) => {
  const dispatch = useAppDispatch();

  const [editCity, { isLoading }] = useEditCityMutation();
  const [addDirHotelier] = useAddDirHotelierMutation();
  const city = useAppSelector(state => selectCityById(state, cityId));
  const stateName = useAppSelector(state => selectStateById(state, stateId)?.stateName);
  const countryInternational = useAppSelector(selectActiveCountryInternational);

  const activeLanguageCode = useAppSelector(selectActiveLangCode);
  const activeCountryName = useAppSelector(selectActiveCountryName);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const [isEditingCity, setIsEditingCity] = useState(false);
  const [colorAddDirButton, setColorAddDirButton] = useState<string>('green');

  const startEditing = () => setIsEditingCity(true);
  const stopEditing = () => setIsEditingCity(false);

  const formRef = useRef<HTMLFormElement>(null);

  if (!city || !stateName) return null;

  const { stateInternational, langCode, cityName, cityInternational, cityCode, cityPhotoURL } =
    city;

  const addDir = async () => {
    try {
      await addDirHotelier({
        language: changeUKToUA(city.langCode.toLowerCase()),
        idLocation: city._id,
        city: city.cityName,
        state: stateName,
        country: activeCountryName,
        linkOnPhoto: city.cityPhotoURL,
        cityInternational,
        stateInternational,
        countryInternational,
      }).unwrap();
      dispatch(setAddDirHotelier({ lang: activeLanguageCode, status: true }));

      const addDirHotelierList = localStorage.getItem('addDirHotelier');

      if (addDirHotelierList) {
        const parseAddDir = JSON.parse(addDirHotelierList);

        localStorage.setItem(
          'addDirHotelier',
          JSON.stringify([
            ...parseAddDir,
            { lang: activeLanguageCode, status: true, country: activeCountryName },
          ])
        );
      } else {
        localStorage.setItem(
          'addDirHotelier',
          JSON.stringify([{ lang: activeLanguageCode, status: true, country: activeCountryName }])
        );
      }
      setColorAddDirButton('white');
      toast.success('Successfully Adding a Directory');
    } catch (err: any) {
      toast.error(`${err.data.message}`);
      setColorAddDirButton('green');
    }
  };

  const addLoc = () => {
    toast.success('TODO: Add Location Fn');
  };

  useCloseOnOutsideClick({
    isEditing: isEditingCity,
    stopEditing,
    formRef,
  });

  useEffect(() => {
    const addDirHotelierList = localStorage.getItem('addDirHotelier');

    if (addDirHotelierList) {
      const parseAddDir: any[] = JSON.parse(addDirHotelierList);

      parseAddDir.forEach(({ lang, country }) => {
        if (lang === activeLanguageCode && country === activeCountryName) {
          setColorAddDirButton('white');
        }
      });
    }
  }, [activeLanguageCode, activeCountryName]);

  const isInputDisabled = !isEditingCity;
  const isEditButtonDisabled = isEditingCity;

  const isSubmitDisabled = isLoading;
  const $isFirstEdit = langCode === 'EN' && !isEng;

  const handleSubmitEditCity = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitDisabled) {
      toast.info('Loading');
      return;
    }

    if (!activeLanguageCode || !activeCountryName) {
      toast.info('Please select language and country');
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const cityPhotoURLTrimmed = formData.get('cityPhotoURL')?.toString().trim();
    const cityNameTrimmed = formData.get('cityName')?.toString().trim();

    if (!cityPhotoURLTrimmed || !cityNameTrimmed) {
      toast.info('Please provide photo url and City name');
      return;
    }

    const updatedCity: EditCity = {
      stateId,
      stateInternational,
      _id: cityId,
      cityName: cityNameTrimmed,
      cityInternational,
      cityCode,
      cityPhotoURL: cityPhotoURLTrimmed,
      cityPhotoAlt: `${cityNameTrimmed}, ${stateName}, ${activeCountryName}`,
      langCode: activeLanguageCode,
    };

    try {
      const editedCityName = (await editCity(updatedCity).unwrap())?.entities[cityId]?.cityName;

      if (editedCityName) {
        toast.success(`City ${editedCityName} updated`);
      }

      setIsEditingCity(false);
    } catch (error) {
      toast.error('City not updated');
    }
  };

  const showEditCityFormInterface = (
    <CityInfo>
      <CityNameLabel>
        <span>City &nbsp;</span>
        <CityNameInput
          type="text"
          name="cityName"
          defaultValue={cityName}
          disabled={isInputDisabled}
          maxLength={30}
          minLength={2}
          required
        />
      </CityNameLabel>
      <EditCityPhotoLabel>
        <span>Photo</span>
        <EditCityPhotoURLInput
          type="url"
          name="cityPhotoURL"
          defaultValue={cityPhotoURL}
          disabled={isInputDisabled}
          maxLength={300}
          minLength={8}
          required
          title={cityPhotoURL}
        />
      </EditCityPhotoLabel>
    </CityInfo>
  );

  const addDirHotelierDisabled = colorAddDirButton === 'white';
  const addDirUsersDisabled = true;

  const showEditButtons = !isEditingCity && (
    <>
      <EditButton
        $isFirstEdit={$isFirstEdit}
        onClick={startEditing}
        disabled={isEditButtonDisabled}
      />
      <UrlDirButton
        onClick={addDir}
        disabled={addDirHotelierDisabled}
        $isEnabled
        variable={colorAddDirButton}
        color={colorAddDirButton === 'white' && '#0046e9'}
      >
        Add Dir <br />
        Hotelier
      </UrlDirButton>
      <AddDirButton onClick={addLoc} disabled={addDirUsersDisabled}>
        Add Dir <br />
        for Users
      </AddDirButton>
    </>
  );

  const showSubmitButton = isEditingCity && (
    <SubmitAddLocationButton type="submit" disabled={isSubmitDisabled}>
      Done
    </SubmitAddLocationButton>
  );

  const showButtonsOverlay = (
    <ButtonsOverlay $isEditing={isEditingCity}>
      {showEditButtons}
      {showSubmitButton}
    </ButtonsOverlay>
  );

  return (
    <EditCityFormStyled onSubmit={handleSubmitEditCity} ref={formRef}>
      {showEditCityFormInterface}
      {showButtonsOverlay}
    </EditCityFormStyled>
  );
};
