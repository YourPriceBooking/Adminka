import { useAppSelector } from 'App';
import { selectActiveCountryId } from 'features/countries';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import type { NewStateWithOutId } from 'types/apis';
import { SubmitAddLocationButton } from '../EditStateForm/EditStateForm.styled';

import { Row, AddLocationButton, AddStateFormStyled } from './AddStateForm.styled';

const emptyArr: never[] = [];

export const AddStateForm = () => {
  const activeCountryId = useAppSelector(selectActiveCountryId);
  const statesNames = emptyArr;
  const [isAddingState, setIsAddingState] = useState(false);
  const setAddingStateTrue = useCallback(() => setIsAddingState(true), []);

  const isLoading = false;
  const isSubmitDisabled = isLoading || !activeCountryId;

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

      if (statesNames.find(existingStateName => existingStateName === stateName)) {
        toast.info(`${stateName} exists. Fill new 'name'`);
        return;
      }

      const newState: NewStateWithOutId = {
        stateName,
        stateInternational: stateName,
        stateCode: stateName.slice(0, 5).toUpperCase(),
        international: '',
        langCode: 'EN',
        dbLangCode: 'EN',
        statePhotoURL,
        countryId: activeCountryId,
      };

      try {
        // appDispatch(addState(newState));
        console.log('newState', newState);
        setIsAddingState(false);
        // toast.success(`State ${stateName} added`);
      } catch (error) {
        toast.error('State not added');
      }
    },
    [activeCountryId, isSubmitDisabled, statesNames]
  );

  return (
    <AddStateFormStyled onSubmit={handleSubmitAddState}>
      {!isAddingState && (
        <AddLocationButton type="button" onClick={setAddingStateTrue}>
          +3
        </AddLocationButton>
      )}

      {isAddingState && (
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
      )}
    </AddStateFormStyled>
  );
};
