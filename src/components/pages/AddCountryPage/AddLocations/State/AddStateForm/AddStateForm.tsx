import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { addState, makeSelectStatesNames } from 'redux/slices';
import type { NewStateWithOutId } from 'types/apis';
import { SubmitAddLocationButton } from '../EditStateForm/EditStateForm.styled';

import { Row, AddLocationButton, AddStateFormStyled } from './AddStateForm.styled';

export const AddStateForm = () => {
  const appDispatch = useAppDispatch();
  const selectStatesNames = useMemo(makeSelectStatesNames, []);
  const statesNames = useAppSelector(selectStatesNames);

  const [isAddingState, setIsAddingState] = useState(false);
  const setAddingStateTrue = useCallback(() => setIsAddingState(true), []);

  const handleSubmitAddState = useCallback(
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
        return toast.info(`${stateName} exists. Fill new 'name'`);
      }

      const newState: NewStateWithOutId = {
        stateName,
        statePhotoURL,
        stateInternational: stateName,
        stateCode: stateName.slice(0, 4).toUpperCase(),
        edited: 0,
        cities: [],
      };

      try {
        appDispatch(addState(newState));
        setIsAddingState(false);
        // toast.success(`State ${stateName} added`);
      } catch (error) {
        toast.error('State not added');
        console.log(error);
      }
    },
    [appDispatch, statesNames]
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

          <SubmitAddLocationButton type="submit">Add Loc 3</SubmitAddLocationButton>
        </Row>
      )}
    </AddStateFormStyled>
  );
};
