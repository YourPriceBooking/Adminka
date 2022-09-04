import type { FormEvent } from 'react';
import { useRef, useCallback, useState } from 'react';
import type { AddState } from 'types/apis';
import { useAppSelector } from 'App';
import { toast } from 'react-toastify';
import { generateStateCode, wait } from 'common/utils';
import { SubmitAddLocationButton } from 'components/shared/Buttons';
import { Spinner } from 'components/shared/Loader';
import {
  selectActiveCountryId,
  selectActiveCountryInternational,
  useLazyGetCountriesQuery,
} from 'features/countries';
import { selectIsEnglishActiveLang } from 'features/languages';
import { useAddStateMutation, useLazyGetStatesQuery } from 'features/states';
import { useCloseOnOutsideClick } from 'common/hooks';
import {
  Row,
  AddLocationButton,
  AddStateFormStyled,
  AddStatePhotoLabel,
  AddStatePhotoInput,
  AddStateNameLabel,
  AddStateNameInput,
} from './AddStateForm.styled';

export const AddStateForm = () => {
  const [addState, { isLoading: isAddingLoc3 }] = useAddStateMutation();
  const [getCountries, { isLoading: isLoadingStates }] = useLazyGetStatesQuery();
  const [getStates, { isLoading: isLoadingCountries }] = useLazyGetCountriesQuery();

  const activeCountryId = useAppSelector(selectActiveCountryId);
  const activeCountryInternational = useAppSelector(selectActiveCountryInternational);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const [isRefetchingCountries, setIsRefetchingCountries] = useState(false);
  const [isAddingState, setIsAddingState] = useState(false);
  const startAdding = useCallback(() => setIsAddingState(true), []);
  const stopAdding = useCallback(() => setIsAddingState(false), []);

  const isPending = isLoadingStates || isAddingLoc3 || isLoadingCountries || isRefetchingCountries;

  const isSubmitDisabled = !isEng || isPending || !activeCountryId || !activeCountryInternational;

  const formRef = useRef<HTMLFormElement>(null);

  useCloseOnOutsideClick({
    isEditing: isAddingState,
    stopEditing: stopAdding,
    formRef,
  });

  const handleSubmitAddState = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    const form = e.currentTarget;

    const content = new FormData(form);
    const statePhotoURL = content.get('statePhotoURL')?.toString().trim();
    const stateName = content.get('stateName')?.toString().trim();

    if (!statePhotoURL || !stateName) {
      toast('Please provide photo url and State name');
      return;
    }

    const newState: AddState = {
      countryId: activeCountryId,
      international: activeCountryInternational,

      stateName,
      stateInternational: stateName,
      stateCode: generateStateCode(stateName),
      statePhotoURL,

      langCode: 'EN',
    };

    try {
      const addedStateEntities = (await addState(newState).unwrap())?.entities;
      if (!addedStateEntities) return;

      const addedStateName = Object.values(addedStateEntities).find(
        state => state?.stateInternational === stateName
      )?.stateName;
      if (!addedStateName) return;

      toast.success(`State ${addedStateName} added`);

      setIsRefetchingCountries(true);
      await wait(1500);
      await getCountries();
      await getStates();
      setIsRefetchingCountries(false);
    } catch (error) {
      toast.error('State not added');
    } finally {
      setIsAddingState(false);
    }
  };

  const addLocationButtonLabel = isPending ? <Spinner /> : '+3';
  const submitAddLocationButtonLabel = isPending ? <Spinner /> : 'Add Loc 3';

  const showAddStateButton = isEng && !isAddingState && activeCountryId && (
    <AddLocationButton type="button" onClick={startAdding}>
      {addLocationButtonLabel}
    </AddLocationButton>
  );
  //
  const showAddStateForm = isAddingState && (
    <Row>
      <AddStatePhotoLabel>
        <AddStatePhotoInput
          type="url"
          name="statePhotoURL"
          minLength={8}
          maxLength={300}
          required
          title="https://my-location.com/photo.jpg"
        />
        <p>Add photo link</p>
      </AddStatePhotoLabel>

      <AddStateNameLabel>
        <AddStateNameInput type="text" name="stateName" minLength={3} maxLength={50} required />
        <p>
          Add <b>state</b> name
        </p>
      </AddStateNameLabel>

      <SubmitAddLocationButton type="submit" disabled={isSubmitDisabled}>
        {submitAddLocationButtonLabel}
      </SubmitAddLocationButton>
    </Row>
  );

  return (
    <AddStateFormStyled onSubmit={handleSubmitAddState} ref={formRef}>
      {showAddStateButton}

      {showAddStateForm}
    </AddStateFormStyled>
  );
};
