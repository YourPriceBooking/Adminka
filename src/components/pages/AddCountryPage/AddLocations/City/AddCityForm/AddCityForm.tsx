import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import type { AddCity } from 'types/apis';
import { AddLocationButton } from '../../State/AddStateForm/AddStateForm.styled';
import { SubmitAddLocationButton } from '../../State/EditStateForm/EditStateForm.styled';
import { Row, AddCityFormStyled } from './AddCityForm.styled';

type AddCityFormProps = {
  stateId: string;
  stateInternational: string;
};

export const AddCityForm = ({ stateId, stateInternational }: AddCityFormProps) => {
  const [isAddingCity, setIsAddingCity] = useState(false);
  const setAddingCityTrue = useCallback(() => setIsAddingCity(true), []);

  const isLoading = false;
  const isSubmitDisabled = isLoading;

  const handleSubmitAddCity = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isSubmitDisabled) return;
      const form = e.currentTarget;

      const content = new FormData(form);
      const cityPhotoURL = content.get('cityPhotoURL')?.toString().trim();
      const cityName = content.get('cityName')?.toString().trim();

      if (!cityPhotoURL || !cityName) {
        toast('Please provide photo url and City name');
        return;
      }

      // if (citiesNames?.find(existingCityName => existingCityName === cityName)) {
      //   toast.info(`${cityName} exists. Fill new 'name'`);
      //   return;
      // }

      const newCity: AddCity = {
        stateId,
        cityName,
        cityPhotoURL,
        cityInternational: cityName,
        cityCode: cityName.slice(0, 4).toUpperCase(),

        langCode: 'EN',
        stateInternational,
      };

      try {
        // appDispatch(addCity(newCity));
        console.log('newCity', newCity);
        setIsAddingCity(false);
        toast.success(`City ${cityName} added`);
      } catch (error) {
        toast.error('City not added');
      }
    },
    [isSubmitDisabled, stateId, stateInternational]
  );

  return (
    <AddCityFormStyled onSubmit={handleSubmitAddCity}>
      {!isAddingCity && (
        <AddLocationButton type="button" onClick={setAddingCityTrue}>
          +2
        </AddLocationButton>
      )}

      {isAddingCity && (
        <Row>
          <label>
            <input
              type="url"
              name="cityPhotoURL"
              minLength={8}
              maxLength={300}
              required
              title="https://my-location.com/photo.jpg"
            />
            <span>add a link to the photo</span>
          </label>

          <label>
            <input type="text" name="cityName" minLength={3} maxLength={50} required />
            <span>add the name of the city</span>
          </label>

          <SubmitAddLocationButton type="submit">Add Loc 2</SubmitAddLocationButton>
        </Row>
      )}
    </AddCityFormStyled>
  );
};
