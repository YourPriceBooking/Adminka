import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { editState, selectIsEnglishActiveLang, makeSelectStatesNames } from 'redux/slices';
import type { EditState } from 'types/apis';
import { EditButton } from '../../../AddCountries/EditButton/EditButton';
import { AddDirButton } from '../../AddDirButton';

import {
  SubmitAddLocationButton,
  EditStateFormStyled,
  StateInfo,
  ButtonsOverlay,
} from './EditStateForm.styled';

type EditStateFormType = {
  stateItem: EditState;
};

export const EditStateForm = ({
  stateItem: {
    _id,
    stateName,
    stateInternational,
    statePhotoURL,
    stateCode,
    cities,
    edited,

    international,
    langCode,
    dbLangCode,
    countryId,
  },
}: EditStateFormType) => {
  const [isEditingState, setIsEditingState] = useState(false);

  const selectStatesNames = useMemo(makeSelectStatesNames, []);
  const appDispatch = useAppDispatch();

  const [localStateName, setLocalStateName] = useState(stateName);
  const [localStatePhotoURL, setLocalStatePhotoURL] = useState(statePhotoURL);
  const isEng = useAppSelector(selectIsEnglishActiveLang);
  const statesNames = useAppSelector(selectStatesNames);

  const setIsEditingStateTrue = useCallback(() => setIsEditingState(true), []);

  const handleSubmitEditState = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const stateNameTrimmed = localStateName?.trim();
      const statePhotoURLTrimmed = localStatePhotoURL?.trim();
      if (!stateNameTrimmed || !statePhotoURLTrimmed) {
        toast('Please provide photo url and State name');
        return;
      }
      if (statesNames.find(existingStateName => existingStateName === stateNameTrimmed)) {
        toast.info(`${stateNameTrimmed} exists. Try another 'name'`);
        return;
      }
      const updatedState = {
        _id,
        stateName: stateNameTrimmed,
        statePhotoURL: statePhotoURLTrimmed,
        stateInternational: !stateInternational && isEng ? stateNameTrimmed : stateInternational,
        stateCode,
        cities,
        edited: Number(edited) + 1,
        international,
        langCode,
        dbLangCode,
        countryId,
      };
      try {
        appDispatch(editState(updatedState));
        setIsEditingState(false);
      } catch (error) {
        toast.error('State is not edited');
      }
    },

    [
      _id,
      appDispatch,
      cities,
      countryId,
      dbLangCode,
      edited,
      international,
      isEng,
      langCode,
      localStateName,
      localStatePhotoURL,
      stateCode,
      stateInternational,
      statesNames,
    ]
  );

  const isInputDisabled = !isEditingState;
  const isEditButtonDisabled = isEditingState;
  const isSubmitDisabled = !localStateName?.trim() || !localStatePhotoURL?.trim();
  const $isFirstEdit = !edited && !isEng;

  const addDir = useCallback(() => {
    toast.success('TODO: Add Directory Fn');
  }, []);
  const addDirDisabled = isEditingState;

  const addLoc = useCallback(() => {
    toast.success('TODO: Add Location Fn');
  }, []);
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
