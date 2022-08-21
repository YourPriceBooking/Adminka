import { useAppSelector } from 'App';
import { selectActiveCountryId, selectActiveCountryInternational } from 'features/countries';
import { useAddStateMutation } from 'features/states';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import type { AddState } from 'types/apis';
import { SubmitAddLocationButton } from '../EditStateForm/EditStateForm.styled';

import { Row, AddLocationButton, AddStateFormStyled } from './AddStateForm.styled';

// type AddStateFormProps = { countryId: EntityId };

export const AddStateForm = () => {
  const [addState, { isLoading }] = useAddStateMutation();

  const activeCountryId = useAppSelector(selectActiveCountryId);
  const activeCountryInternational = useAppSelector(selectActiveCountryInternational);
  //  const statesNames = useAppSelector(state => selectStateById(state, countryId));
  const [isAddingState, setIsAddingState] = useState(false);
  const setAddingStateTrue = useCallback(() => setIsAddingState(true), []);

  const isSubmitDisabled = isLoading || !activeCountryId || !activeCountryInternational;

  const handleSubmitAddState = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
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

      // if (statesNames.find(existingStateName => existingStateName === stateName)) {
      //   toast.info(`${stateName} exists. Fill new 'name'`);
      //   return;
      // }

      const newState: AddState = {
        countryId: activeCountryId,
        international: activeCountryInternational,

        stateName,
        stateInternational: stateName,
        stateCode: stateName.slice(0, 5).toUpperCase(),
        statePhotoURL,

        langCode: 'EN',
      };

      try {
        const addedState = await addState(newState).unwrap();
        console.log({ addedState });
        setIsAddingState(false);
        toast.success(
          `State ${
            addedState &&
            Object.values(addedState?.entities)?.find(
              state => state?.stateInternational === stateName
            )?.stateName
          } added`
        );
      } catch (error) {
        toast.error('State not added');
      }
    },
    [activeCountryId, activeCountryInternational, addState, isSubmitDisabled]
  );

  const showAddLocationButton = !isAddingState && (
    <AddLocationButton type="button" onClick={setAddingStateTrue}>
      +3
    </AddLocationButton>
  );

  const showAddStateForm = isAddingState && (
    <Row>
      <label>
        <input
          type="url"
          name="statePhotoURL"
          minLength={8}
          maxLength={300}
          required
          title="https://my-location.com/photo.jpg"
        />
        <p>add a link to the photo</p>
      </label>

      <label>
        <input type="text" name="stateName" minLength={3} maxLength={50} required />
        <p>add the name of the location</p>
      </label>

      <SubmitAddLocationButton type="submit" disabled={isSubmitDisabled}>
        Add Loc 3
      </SubmitAddLocationButton>
    </Row>
  );

  return (
    <AddStateFormStyled onSubmit={handleSubmitAddState}>
      {showAddLocationButton}

      {showAddStateForm}
    </AddStateFormStyled>
  );
};
