import type { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from 'App';
import { EditButton } from 'components/pages/CountryPage/Countries/EditButton';
import { selectDev } from 'features/countries';
import { selectActiveLangCode, selectIsEnglishActiveLang } from 'features/languages';
import { selectStateById, useDeleteStateMutation, useEditStateMutation } from 'features/states';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { EditState } from 'types/apis';
import { AddDirButton } from '../../AddDirButton';
import {
  SubmitAddLocationButton,
  EditStateFormStyled,
  StateInfo,
  ButtonsOverlay,
} from './EditStateForm.styled';

type EditStateFormProps = {
  stateId: EntityId;
};

export const EditStateForm = ({ stateId }: EditStateFormProps) => {
  const [editState, { isLoading }] = useEditStateMutation();
  const [deleteState, { isLoading: isDeleting }] = useDeleteStateMutation();
  const stateObj = useAppSelector(state => selectStateById(state, stateId));
  const activeLangCode = useAppSelector(selectActiveLangCode);
  const isEng = useAppSelector(selectIsEnglishActiveLang);
  const showDev = useAppSelector(selectDev);

  // const statesNames = emptyArr;

  const [isEditingState, setIsEditingState] = useState(false);

  const setIsEditingStateTrue = useCallback(() => setIsEditingState(true), []);

  const addDir = useCallback(() => {
    toast.success('TODO: Add Directory Fn');
  }, []);

  const addDirDisabled = isEditingState;

  const addLoc = useCallback(() => {
    toast.success('TODO: Add Location Fn');
  }, []);

  if (!stateObj) return null;

  const {
    countryId,
    _id: id,
    international,
    // createdAt,
    // updatedAt,
    stateName,
    stateInternational,
    stateCode,
    statePhotoURL,
    langCode,
  } = stateObj;

  const isInputDisabled = !isEditingState;
  const isEditButtonDisabled = isEditingState || isLoading || isDeleting;
  const addLocDisabled = isEditingState || isLoading || isDeleting;

  const isSubmitDisabled = isLoading || isDeleting;
  const $isFirstEdit = langCode === 'EN' && !isEng;

  const onDeleteState = async () => {
    if (!id) return;

    try {
      const deleteStateName = (await deleteState(id).unwrap())?.entities[id]?.stateName;
      if (deleteStateName) {
        toast.success(`State ${deleteStateName} deleted`);
      }
    } catch (error) {
      toast.error(`Error while deleting state with _id: ${id}`);
    }
  };

  const handleSubmitEditState = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    if (!activeLangCode) {
      toast('Please select language');
      return;
    }
    const form = e.currentTarget;

    const formData = new FormData(form);
    const stateNameTrimmed = formData.get('stateName')?.toString()?.trim();
    const statePhotoURLTrimmed = formData.get('statePhotoURL')?.toString()?.trim();
    if (!stateNameTrimmed || !statePhotoURLTrimmed) {
      toast('Please provide photo url and State name');
      return;
    }
    // if (statesNames.find(existingStateName => existingStateName === stateNameTrimmed)) {
    //   toast.info(`${stateNameTrimmed} exists. Try another 'name'`);
    //   return;
    // }

    const updatedState: EditState = {
      countryId,

      _id: id,
      international,

      stateName: stateNameTrimmed,
      statePhotoURL: statePhotoURLTrimmed,
      langCode: activeLangCode,
      stateInternational,
      stateCode,
    };

    try {
      const edited = await editState(updatedState).unwrap();

      toast.success(`${edited?.entities[id]?.stateName} state updated!`);
      setIsEditingState(false);
    } catch (error) {
      toast.error('Cannot save the State now');
    }
  };

  const showEditStateFormInterface = (
    <StateInfo>
      <label>
        <p>State info</p>
        <input
          type="text"
          name="stateName"
          defaultValue={stateName}
          disabled={isInputDisabled}
          maxLength={30}
          minLength={2}
          required
        />
      </label>

      <label>
        <p>State photo URL</p>
        <input
          type="url"
          name="statePhotoURL"
          defaultValue={statePhotoURL}
          disabled={isInputDisabled}
          maxLength={300}
          minLength={8}
          required
          title={statePhotoURL}
        />
      </label>
    </StateInfo>
  );

  const showButtonsOverlay = !isEditingState && (
    <ButtonsOverlay>
      <EditButton
        $isFirstEdit={$isFirstEdit}
        onClick={setIsEditingStateTrue}
        disabled={isEditButtonDisabled}
      />

      <AddDirButton onClick={addDir} disabled={addDirDisabled}>
        Add Dir
      </AddDirButton>

      <AddDirButton onClick={addLoc} disabled={addLocDisabled}>
        Add Loc
      </AddDirButton>

      {showDev && (
        <button type="button" style={{ borderRadius: '50%' }} onClick={onDeleteState}>
          X
        </button>
      )}
    </ButtonsOverlay>
  );

  const showSubmitButton = isEditingState && (
    <SubmitAddLocationButton type="submit" disabled={isSubmitDisabled}>
      Done
    </SubmitAddLocationButton>
  );

  return (
    <EditStateFormStyled onSubmit={handleSubmitEditState}>
      {showEditStateFormInterface}
      {showButtonsOverlay}
      {showSubmitButton}
    </EditStateFormStyled>
  );
};
