import type { FormEvent } from 'react';
import type { EntityId } from '@reduxjs/toolkit';
import type { EditState } from 'types/apis';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from 'App';
import { ButtonsOverlay, EditButton, SubmitAddLocationButton } from 'components/shared/Buttons';
import { selectActiveLangCode, selectIsEnglishActiveLang } from 'features/languages';
import { selectStateById, useEditStateMutation } from 'features/states';
import { EditStateFormStyled, StateInfo } from './EditStateForm.styled';

type EditStateFormProps = {
  stateId: EntityId;
};

export const EditStateForm = ({ stateId }: EditStateFormProps) => {
  const [editState, { isLoading }] = useEditStateMutation();
  const stateObj = useAppSelector(state => selectStateById(state, stateId));
  const activeLangCode = useAppSelector(selectActiveLangCode);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const [isEditingState, setIsEditingState] = useState(false);

  const setIsEditingStateTrue = useCallback(() => setIsEditingState(true), []);

  if (!stateObj) return null;

  const {
    countryId,
    _id: id,
    international,
    stateName,
    stateInternational,
    stateCode,
    statePhotoURL,
    langCode,
  } = stateObj;

  const isInputDisabled = !isEditingState;
  const isEditButtonDisabled = isEditingState || isLoading;

  const isSubmitDisabled = isLoading;
  const $isFirstEdit = langCode === 'EN' && !isEng;

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
      const editedStateName = edited?.entities[id]?.stateName;
      if (editedStateName) {
        toast.success(`${editedStateName} state updated!`);
      }

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
