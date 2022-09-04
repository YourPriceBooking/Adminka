import type { FormEvent } from 'react';
import { useRef, useCallback, useState } from 'react';
import type { EntityId } from '@reduxjs/toolkit';
import type { EditState } from 'types/apis';
import { toast } from 'react-toastify';
import { useAppSelector } from 'App';
import { ButtonsOverlay, EditButton, SubmitAddLocationButton } from 'components/shared/Buttons';
import { selectActiveLangCode, selectIsEnglishActiveLang } from 'features/languages';
import { selectStateById, useEditStateMutation } from 'features/states';
import { useCloseOnOutsideClick } from 'common/hooks';
import {
  EditStateFormStyled,
  EditStatePhotoLabel,
  EditStatePhotoURLInput,
  StateInfo,
  StateNameInput,
  StateNameLabel,
} from './EditStateForm.styled';

type EditStateFormProps = {
  stateId: EntityId;
};

export const EditStateForm = ({ stateId }: EditStateFormProps) => {
  const [editState, { isLoading }] = useEditStateMutation();
  const stateObj = useAppSelector(state => selectStateById(state, stateId));
  const activeLangCode = useAppSelector(selectActiveLangCode);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const [isEditing, setIsEditing] = useState(false);

  const startEditing = useCallback(() => setIsEditing(true), []);
  const stopEditing = useCallback(() => setIsEditing(false), []);

  const formRef = useRef<HTMLFormElement>(null);

  useCloseOnOutsideClick({
    isEditing,
    stopEditing,
    formRef,
  });

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

  const isInputDisabled = !isEditing;
  const isEditButtonDisabled = isEditing || isLoading;

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
    } catch (error) {
      toast.error('Cannot save the State now');
    } finally {
      setIsEditing(false);
    }
  };

  const showEditStateFormInterface = (
    <StateInfo>
      <StateNameLabel>
        <span>State &nbsp;</span>
        <StateNameInput
          type="text"
          name="stateName"
          defaultValue={stateName}
          disabled={isInputDisabled}
          maxLength={30}
          minLength={2}
          required
        />
      </StateNameLabel>

      <EditStatePhotoLabel>
        <span>Photo</span>
        <EditStatePhotoURLInput
          type="url"
          name="statePhotoURL"
          defaultValue={statePhotoURL}
          disabled={isInputDisabled}
          maxLength={300}
          minLength={8}
          required
          title={statePhotoURL}
        />
      </EditStatePhotoLabel>
    </StateInfo>
  );

  const showEditButtons = !isEditing && (
    <EditButton
      $isFirstEdit={$isFirstEdit}
      onClick={startEditing}
      disabled={isEditButtonDisabled}
    />
  );

  const showSubmitButton = isEditing && (
    <SubmitAddLocationButton type="submit" disabled={isSubmitDisabled}>
      Done
    </SubmitAddLocationButton>
  );

  const showButtonsOverlay = (
    <ButtonsOverlay $isEditing={isEditing}>
      {showEditButtons}

      {showSubmitButton}
    </ButtonsOverlay>
  );

  return (
    <EditStateFormStyled onSubmit={handleSubmitEditState} ref={formRef}>
      {showEditStateFormInterface}

      {showButtonsOverlay}
    </EditStateFormStyled>
  );
};
