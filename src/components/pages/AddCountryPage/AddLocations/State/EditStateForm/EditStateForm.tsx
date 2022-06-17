import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { editState, selectIsEnglishActiveLang, selectStatesNames } from 'redux/slices';
import type { EditState } from 'types/apis';
import { EditButton } from '../../../AddCountries/EditButton/EditButton';

import { SubmitAddLocationButton, EditStateFormStyled, StateInfo } from './EditStateForm.styled';

export const EditStateForm = ({
  _id,
  stateName,
  statePhotoURL,
  stateInternational,
  stateCode,
  edited,
  cities,
}: EditState) => {
  const [isEditingState, setIsEditingState] = useState(false);
  const appDispatch = useAppDispatch();

  const [localStateName, setLocalStateName] = useState(stateName);
  const [localStatePhotoURL, setLocalStatePhotoURL] = useState(statePhotoURL);
  const isEng = useAppSelector(selectIsEnglishActiveLang);
  const statesNames = useAppSelector(selectStatesNames);

  const setIsEditingStateTrue = useCallback(() => setIsEditingState(true), []);

  const handleSubmitEditState = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;

      const content = new FormData(form);
      const statePhotoURL = content.get('statePhotoURL')?.toString().trim();
      const stateName = content.get('stateName')?.toString().trim();

      if (!statePhotoURL || !stateName) {
        return toast('Please provide photo url and State name');
      }

      if (statesNames.find(existingStateName => existingStateName === stateName)) {
        return toast.info(`${stateName} exists. Try another 'name'`);
      }

      const updatedState = {
        _id,
        stateName: localStateName,
        statePhotoURL: localStatePhotoURL,
        stateInternational: !stateInternational && isEng ? localStateName : stateInternational,
        stateCode,
        cities,
        edited: Number(edited) + 1,
      };

      try {
        appDispatch(editState(updatedState));
        setIsEditingState(false);
        // toast.success('State updated');
      } catch (error) {
        toast.error('State is not edited');
        console.log(error);
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
