import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { addRegion, selectRegions } from 'redux/slices';
import type { NewRegionWithOutId } from 'types/apis';
import {
  AddLocationsWrapper,
  AddLocationsContent,
  Row,
  AddLocationButton,
  AddRegionForm,
} from './AddLocations.styled';
import { HeadingsList } from './HeadingsList/HeadingsList';

import { EditRegionList } from './EditRegionList/EditRegionList';
import { SubmitAddLocationButton } from './EditRegionList/EditRegionList.styled';

export default function AddLocations() {
  const regions = useAppSelector(selectRegions);
  const appDispatch = useAppDispatch();

  const [isAddingRegion, setIsAddingRegion] = useState(false);
  // const [isAddingCity, setIsAddingCity] = useState(false);
  // const [isAddingDistrict, setIsAddingDistrict] = useState(false);

  const setAddingRegionTrue = useCallback(() => setIsAddingRegion(true), []);
  // const addCity = useCallback(() => setIsAddingCity(true), []);
  // const addDistrict = useCallback(() => setIsAddingDistrict(true), []);

  const handleSubmitAddRegion = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.currentTarget;

      const content = new FormData(form);
      const regionPhotoURL = content.get('regionPhotoURL')?.toString().trim();
      const regionName = content.get('regionName')?.toString().trim();

      if (!regionPhotoURL || !regionName) {
        return toast('Please provide photo url and Region name');
      }

      const newRegion: NewRegionWithOutId = {
        regionName,
        regionPhotoURL,
        regionInternational: regionName,
        regionCode: regionName.slice(0, 4).toUpperCase(),
        edited: 0,
        cities: [],
      };

      try {
        appDispatch(addRegion(newRegion));
        setIsAddingRegion(false);
        // toast.success('Region added');
        console.log({ regionPhotoURL });
      } catch (error) {
        toast.error('Region not added');
        console.log(error);
      }
    },
    [appDispatch]
  );

  return (
    <AddLocationsWrapper>
      <HeadingsList />

      <AddLocationsContent>
        <EditRegionList editLocationsList={regions} />

        <AddRegionForm onSubmit={handleSubmitAddRegion}>
          {!isAddingRegion && (
            <AddLocationButton type="button" onClick={setAddingRegionTrue}>
              +3
            </AddLocationButton>
          )}

          {isAddingRegion && (
            <Row>
              <label>
                <input
                  type="url"
                  name="regionPhotoURL"
                  minLength={8}
                  maxLength={300}
                  required
                  title="https://my-location.com/photo.jpg"
                />
                <p>add a link to the photo</p>
              </label>

              <label>
                <input type="text" name="regionName" minLength={3} maxLength={50} required />
                <p>add the name of the location</p>
              </label>

              <SubmitAddLocationButton type="submit">Add Loc 3</SubmitAddLocationButton>
            </Row>
          )}
        </AddRegionForm>
      </AddLocationsContent>
    </AddLocationsWrapper>
  );
}
