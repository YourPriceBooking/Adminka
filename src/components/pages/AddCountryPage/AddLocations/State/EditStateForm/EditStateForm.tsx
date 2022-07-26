import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { editState, selectIsEnglishActiveLang, makeSelectStatesNames } from 'redux/slices';
import type { EditState } from 'types/apis';
import { EditButton } from '../../../AddCountries/EditButton/EditButton';

import { SubmitAddLocationButton, EditStateFormStyled, StateInfo } from './EditStateForm.styled';

type EditStateFormType = {
  stateItem: EditState;
};

export const EditStateForm = ({
  stateItem: { _id, stateName, stateInternational, statePhotoURL, stateCode, cities, edited },
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
      edited,
      isEng,
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

  return (
    <EditStateFormStyled onSubmit={handleSubmitEditState}>
      <StateInfo>
        <label>
          <span>State info</span>
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
          <span>State photo URL</span>
          <input
            type="url"
            name="statePhotoURL"
            value={localStatePhotoURL}
            onChange={e => setLocalStatePhotoURL(e.currentTarget.value)}
            disabled={isInputDisabled}
            maxLength={300}
            minLength={8}
            required
          />
        </label>
      </StateInfo>

      {!isEditingState && (
        <EditButton
          $isFirstEdit={$isFirstEdit}
          onClick={setIsEditingStateTrue}
          disabled={isEditButtonDisabled}
        />
      )}

      {isEditingState && (
        <SubmitAddLocationButton type="submit" disabled={isSubmitDisabled}>
          Done
        </SubmitAddLocationButton>
      )}
    </EditStateFormStyled>
  );
};
