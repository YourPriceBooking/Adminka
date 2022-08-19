import type { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from 'App';
import { selectIsEnglishActiveLang } from 'features/languages';
import { selectStateById, useEditStateMutation } from 'features/states';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { EditState } from 'types/apis';
import { EditButton } from '../../../AddCountries/EditButton/EditButton';
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
  const stateObj = useAppSelector(state => selectStateById(state, stateId));
  const isEng = useAppSelector(selectIsEnglishActiveLang);
  // const statesNames = emptyArr;

  const [isEditingState, setIsEditingState] = useState(false);
  const [localStateName, setLocalStateName] = useState(() => stateObj?.stateName);
  const [localStatePhotoURL, setLocalStatePhotoURL] = useState(() => stateObj?.statePhotoURL);

  const setIsEditingStateTrue = useCallback(() => setIsEditingState(true), []);

  const addDir = useCallback(() => {
    toast.success('TODO: Add Directory Fn');
  }, []);

  const addDirDisabled = isEditingState;

  const addLoc = useCallback(() => {
    toast.success('TODO: Add Location Fn');
  }, []);

  if (!stateObj) return null;

  const { _id: id, createdAt, updatedAt } = stateObj;

  const isInputDisabled = !isEditingState;
  const isEditButtonDisabled = isEditingState;
  const isSubmitDisabled =
    isLoading || !localStateName?.trim() || !localStatePhotoURL?.trim() || isLoading;
  const $isFirstEdit = new Date(updatedAt).getTime() > new Date(createdAt).getTime() && !isEng;

  const handleSubmitEditState = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    const stateNameTrimmed = localStateName?.trim();
    const statePhotoURLTrimmed = localStatePhotoURL?.trim();
    if (!stateNameTrimmed || !statePhotoURLTrimmed) {
      toast('Please provide photo url and State name');
      return;
    }
    // if (statesNames.find(existingStateName => existingStateName === stateNameTrimmed)) {
    //   toast.info(`${stateNameTrimmed} exists. Try another 'name'`);
    //   return;
    // }
    const updatedState: EditState = {
      _id: id,
      stateName: stateNameTrimmed,
      statePhotoURL: statePhotoURLTrimmed,
    };

    try {
      const a = await editState(updatedState).unwrap();

      toast.success(`${a?.entities[id]?.stateName} state updated!`);
      console.log('handleSubmitEditState ~ updatedState', updatedState);
      setIsEditingState(false);
    } catch (error) {
      toast.error('State is not edited');
    }
  };

  const addLocDisabled = isEditingState;

  return (
    <EditStateFormStyled onSubmit={handleSubmitEditState}>
      <StateInfo>
        <label>
          <p>State info</p>
          <input
            type="text"
            name="stateName"
            value={localStateName}
            onChange={e => setLocalStateName(e.currentTarget.value)}
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
            value={localStatePhotoURL}
            onChange={e => setLocalStatePhotoURL(e.currentTarget.value)}
            disabled={isInputDisabled}
            maxLength={300}
            minLength={8}
            required
            title={localStatePhotoURL}
          />
        </label>
      </StateInfo>

      {!isEditingState && (
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
        </ButtonsOverlay>
      )}

      {isEditingState && (
        <SubmitAddLocationButton type="submit" disabled={isSubmitDisabled}>
          Done
        </SubmitAddLocationButton>
      )}
    </EditStateFormStyled>
  );
};
