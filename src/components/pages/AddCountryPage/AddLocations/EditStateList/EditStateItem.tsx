import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import { Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { editState, selectIsEnglishActiveLang } from 'redux/slices';
import type { EditState } from 'types/apis';
import { EditButton } from '../../AddCountries/EditButton/EditButton';

import {
  SubmitAddLocationButton,
  EditLocationsItemStyled,
  EditStateFormStyled,
  StateInfo,
} from './EditStateList.styled';

type EditStateItemType = EditState & {
  setVisibleStatesCount: Dispatch<SetStateAction<number>>;
};

export const EditStateItem = ({
  _id,
  stateName,
  statePhotoURL,
  stateInternational,
  stateCode,
  edited,
  cities,

  setVisibleStatesCount,
}: EditStateItemType) => {
  const [isEditingState, setIsEditingState] = useState(false);
  const appDispatch = useAppDispatch();

  const [localStateName, setLocalStateName] = useState(stateName);
  const [localStatePhotoURL, setLocalStatePhotoURL] = useState(statePhotoURL);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

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
    ]
  );

  const isInputDisabled = !isEditingState;
  const isEditButtonDisabled = isEditingState;
  const isSubmitDisabled = !localStateName?.trim() || !localStatePhotoURL?.trim();
  const $isFirstEdit = !edited && !isEng;

  useEffect(() => {
    setVisibleStatesCount(count => count + 1);

    return () => setVisibleStatesCount(count => count - 1);
  }, [setVisibleStatesCount]);

  return (
    <EditLocationsItemStyled>
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
    </EditLocationsItemStyled>
  );
};
