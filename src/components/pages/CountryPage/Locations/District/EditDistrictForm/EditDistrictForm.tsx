import type { FormEvent } from 'react';
import type { EntityId } from '@reduxjs/toolkit';
import type { EditDistrict } from 'types/apis';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from 'App';
import {
  AddDirButton,
  ButtonsOverlay,
  EditButton,
  SubmitAddLocationButton,
} from 'components/shared/Buttons';
import { selectDistrictById, useEditDistrictMutation } from 'features/districts';
import { selectActiveLangCode, selectIsEnglishActiveLang } from 'features/languages';
import {
  EditDistrictFormStyled,
  DistrictInfo,
  EditDistrictPhotoURLInput,
} from './EditDistrictForm.styled';

type EditDistrictFormProps = {
  districtId: EntityId;
};

export const EditDistrictForm = ({ districtId }: EditDistrictFormProps) => {
  const [editDistrict, { isLoading: isEditingL1 }] = useEditDistrictMutation();

  const district = useAppSelector(state => selectDistrictById(state, districtId));

  const activeLangCode = useAppSelector(selectActiveLangCode);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const [isEditingDistrict, setIsEditingDistrict] = useState(false);
  const setIsEditingDistrictTrue = useCallback(() => setIsEditingDistrict(true), []);

  const addDir = useCallback(() => {
    toast.success('TODO: Add Directory Fn');
  }, []);

  const addLoc = useCallback(() => {
    toast.success('TODO: Add Location Fn');
  }, []);

  if (!activeLangCode || !district) return null;

  const {
    stateId,
    cityId,
    cityInternational,

    _id: id,
    districtName,
    districtPhotoURL,
    districtInternational,
    districtCode,

    langCode,
  } = district;

  const isPending = isEditingL1;

  const isInputDisabled = !isEditingDistrict || isPending;
  const isEditButtonDisabled = isEditingDistrict || isPending;

  const $isFirstEdit = langCode === 'EN' && !isEng;

  const handleSubmitEditDistrict = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!activeLangCode) {
      toast('Please select language');
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

      _id: id,
      districtName: localDistrictName,
      districtPhotoURL: localDistrictPhotoURL,
      districtInternational,
      districtCode,

      langCode: activeLangCode,
    };

    try {
      const editedDistrictName = (await editDistrict(updatedDistrict).unwrap())?.entities[id]
        ?.districtName;

      if (editedDistrictName) {
        toast.success(`District ${editedDistrictName} updated`);
      }

      setIsEditingDistrict(false);
    } catch (error) {
      toast.error('District not updated');
    }
  };

  const showEditDistrictFormInterface = (
    <DistrictInfo>
      <label>
        <span>District name</span>
        <input
          type="text"
          name="districtName"
          defaultValue={districtName}
          disabled={isInputDisabled}
          maxLength={30}
          minLength={2}
          required
        />
      </label>

      <label>
        <span>District photo URL</span>
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
      </label>
    </DistrictInfo>
  );

  const addDirHotelierDisabled = false;
  const addDirUsersDisabled = true;

  const showButtonsOverlay = !isEditingDistrict && (
    <ButtonsOverlay>
      <EditButton
        $isFirstEdit={$isFirstEdit}
        onClick={setIsEditingDistrictTrue}
        disabled={isEditButtonDisabled}
      />

      <AddDirButton onClick={addDir} disabled={addDirHotelierDisabled} $isEnabled>
        Add Dir <br />
        Hotelier
      </AddDirButton>

      <AddDirButton onClick={addLoc} disabled={addDirUsersDisabled}>
        Add Dir <br />
        for Users
      </AddDirButton>
    </ButtonsOverlay>
  );

  const showSubmitButton = isEditingDistrict && (
    <SubmitAddLocationButton type="submit">Done</SubmitAddLocationButton>
  );

  return (
    <EditDistrictFormStyled onSubmit={handleSubmitEditDistrict}>
      {showEditDistrictFormInterface}
      {showButtonsOverlay}
      {showSubmitButton}
    </EditDistrictFormStyled>
  );
};
