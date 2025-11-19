import type { FormEvent } from 'react';
import type { EntityId } from '@reduxjs/toolkit';
import type { EditDistrict } from 'types/apis';
import { useRef, useCallback, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from 'App';
import {
  selectDistrictById,
  useEditDistrictMutation,
  useLazyGetDistrictsQuery,
} from 'features/districts';
import { selectActiveLangCode, selectIsEnglishActiveLang } from 'features/languages';
import { useCloseOnOutsideClick } from 'common/hooks';
import { selectActiveCountryInternational, selectActiveCountryName } from 'features/countries';
import { makeSelectStateInternational, selectStateById } from 'features/states';
import { selectCityById } from 'features/cities';
import { wait } from 'common/utils';
import { useAddCityToHoteilerMutation } from 'features/catalogForHotelier/addCatalogApi';
import Modal from 'components/pages/CountryPage/Locations/District/EditDistrictForm/ui';
import type { DataObject, Location } from 'types/addLocation';
import {
  AddDirButton,
  ButtonsOverlay,
  EditButton,
  SubmitAddLocationButton,
  UrlDirButton,
} from 'components/shared/Buttons';
import { changeUKToUA } from 'utils/api';
import {
  EditDistrictFormStyled,
  DistrictInfo,
  EditDistrictPhotoURLInput,
  DistrictNameLabel,
  DistrictNameInput,
  EditDistrictPhotoLabel,
} from './EditDistrictForm.styled';

type EditDistrictFormProps = {
  districtId: EntityId;
  cityId: EntityId;
  stateId: EntityId;
  data: DataObject;
};

export const EditDistrictForm = ({ districtId, cityId, stateId, data }: EditDistrictFormProps) => {
  const [editDistrict, { isLoading: isEditingL1 }] = useEditDistrictMutation();
  const [getDistricts, { isLoading: isRefetchingDistricts }] = useLazyGetDistrictsQuery();

  const district = useAppSelector(state => selectDistrictById(state, districtId));
  const activeCountryName = useAppSelector(selectActiveCountryName);
  const countryInternational = useAppSelector(selectActiveCountryInternational);
  const selectStateInternational = useMemo(() => makeSelectStateInternational(stateId), [stateId]);
  const stateInternational = useAppSelector(selectStateInternational);
  const stateName = useAppSelector(state => selectStateById(state, stateId)?.stateName);
  const cityName = useAppSelector(state => selectCityById(state, cityId)?.cityName);

  const activeLangCode = useAppSelector(selectActiveLangCode);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const [isEditing, setIsEditing] = useState(false);
  const [colorAddDirButton, setColorAddDirButton] = useState<string>('green');
  const startEditing = useCallback(() => setIsEditing(true), []);
  const stopEditing = useCallback(() => setIsEditing(false), []);

  const formRef = useRef<HTMLFormElement>(null);

  const [addCityToHoteiler] = useAddCityToHoteilerMutation();

  const [modalActive, setModalActive] = useState(false);

  /*   const addDir = useCallback(() => {
    toast.success('TODO: Add Directory Fn');
    setButtonDisabled(true);
  }, []); */

  const addLoc = useCallback(() => {
    toast.success('TODO: Add Location Fn');
  }, []);

  useCloseOnOutsideClick({
    isEditing,
    stopEditing,
    formRef,
  });

  if (!district || !activeLangCode || !cityName || !stateName) return null;

  const {
    cityInternational,
    districtName,
    districtInternational,
    districtCode,
    districtPhotoURL,
    langCode,
    page,
  } = district;

  const isPending = isEditingL1 || isRefetchingDistricts;

  const isInputDisabled = !isEditing || isPending;
  const isEditButtonDisabled = isEditing || isPending;

  const $isFirstEdit = langCode === 'EN' && !isEng;

  const handleSubmitEditDistrict = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!activeLangCode) {
      toast.info('Please select language');
      return;
    }

    if (!activeCountryName) {
      toast.info('Please select country');
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const localDistrictName = formData.get('districtName')?.toString().trim();
    const localDistrictPhotoURL = formData.get('districtPhotoURL')?.toString().trim();

    const isSubmitDisabled = isEditingL1 || !localDistrictName || !localDistrictPhotoURL;

    if (isSubmitDisabled) return;

    if (!localDistrictName || !localDistrictPhotoURL) {
      toast('Please provide photo url and District name');
      return;
    }

    const updatedDistrict: EditDistrict = {
      stateId,
      cityId,
      cityInternational,

      _id: districtId,
      districtName: localDistrictName,
      districtInternational,
      districtCode,
      districtPhotoURL: localDistrictPhotoURL,
      districtPhotoAlt: `${localDistrictName}, ${cityName}, ${stateName}, ${activeCountryName}`,

      langCode: activeLangCode,
    };

    try {
      const editedDistrictName = (await editDistrict(updatedDistrict).unwrap())?.entities[
        districtId
      ]?.districtName;

      if (editedDistrictName) {
        toast.success(`District ${editedDistrictName} updated`);
      }

      await wait(1500);
      if (countryInternational && activeLangCode) {
        await getDistricts({
          international: countryInternational,
          dbLangCode: activeLangCode.toLowerCase(),
        });
      } else {
        await getDistricts();
      }
    } catch (error) {
      toast.error('District not updated');
    } finally {
      stopEditing();
    }
  };

  const handleAdd = async () => {
    try {
      const body = {
        language: changeUKToUA(activeLangCode.toLowerCase()),
        idLocation: districtId,
        district: districtName,
        city: cityName,
        state: stateName,
        country: activeCountryName,
        linkOnPhoto: districtPhotoURL,
        districtInternational,
        cityInternational,
        stateInternational,
        countryInternational,
      };
      await addCityToHoteiler(body);
      setColorAddDirButton('white');
      if (countryInternational && activeLangCode) {
        await getDistricts({
          international: countryInternational,
          dbLangCode: activeLangCode.toLowerCase(),
        });
      } else {
        await getDistricts();
      }
      toast.success(`District added`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      setColorAddDirButton('green');

      toast.error(`Error: adding a distinct`);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const saveLocation = Object.values<Location>(data || {}).filter(
    location => location.district === districtName
  );

  const showEditDistrictFormInterface = (
    <DistrictInfo>
      <DistrictNameLabel>
        <span>District &nbsp;</span>
        <DistrictNameInput
          type="text"
          name="districtName"
          defaultValue={districtName}
          disabled={isInputDisabled}
          maxLength={30}
          minLength={2}
          required
        />
      </DistrictNameLabel>
      <EditDistrictPhotoLabel>
        <span>Photo</span>
        <EditDistrictPhotoURLInput
          type="url"
          name="districtPhotoURL"
          defaultValue={districtPhotoURL}
          disabled={isInputDisabled}
          maxLength={300}
          minLength={8}
          required
          title={districtPhotoURL}
        />
      </EditDistrictPhotoLabel>
    </DistrictInfo>
  );

  const addDirHotelierDisabled = colorAddDirButton === 'white' || page;
  const addDirUsersDisabled = true;

  const showEditButtons = !isEditing && (
    <>
      <EditButton
        $isFirstEdit={$isFirstEdit}
        onClick={startEditing}
        disabled={isEditButtonDisabled}
      />

      <UrlDirButton
        onClick={handleAdd}
        disabled={addDirHotelierDisabled}
        $isEnabled
        variable={addDirHotelierDisabled ? 'white' : 'green'}
        color={!addDirHotelierDisabled ? 'white' : '#0046e9'}
      >
        URL Dir <br />
        Hotelier
      </UrlDirButton>

      <AddDirButton onClick={addLoc} disabled={addDirUsersDisabled}>
        Add Dir <br />
        for Users
      </AddDirButton>
    </>
  );

  const showSubmitButton = isEditing && (
    <SubmitAddLocationButton type="submit">Done</SubmitAddLocationButton>
  );

  const showButtonsOverlay = (
    <ButtonsOverlay $isEditing={isEditing}>
      {showEditButtons}

      {showSubmitButton}
    </ButtonsOverlay>
  );
  return (
    <>
      {modalActive && <Modal setActive={setModalActive} name={districtName} urls={saveLocation} />}
      <EditDistrictFormStyled onSubmit={handleSubmitEditDistrict} ref={formRef}>
        {showEditDistrictFormInterface}

        {showButtonsOverlay}
      </EditDistrictFormStyled>
    </>
  );
};
