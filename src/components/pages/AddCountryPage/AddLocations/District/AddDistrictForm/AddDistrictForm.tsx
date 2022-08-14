import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import type { NewDistrictWithOutId } from 'types/apis';
import { AddLocationButton } from '../../State/AddStateForm/AddStateForm.styled';
import { SubmitAddLocationButton } from '../../State/EditStateForm/EditStateForm.styled';
import { Row, AddDistrictFormStyled } from './AddDistrictForm.styled';

export const AddDistrictForm = ({ stateId, cityId }: { stateId: string; cityId: string }) => {
  // const selectMemoizedDistrictNames = useMemo(selectDistrictNamesForActiveStateAndCity, []);

  // const districtsNames = useAppSelector(state => selectMemoizedDistrictNames(state, stateId, cityId));

  const [isAddingDistrict, setIsAddingDistrict] = useState(false);
  const setAddingDistrictTrue = useCallback(() => setIsAddingDistrict(true), []);

  const isLoading = false;
  const isSubmitDisabled = isLoading;

  const handleSubmitAddDistrict = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isSubmitDisabled) return;
      const form = e.currentTarget;

      const content = new FormData(form);
      const districtPhotoURL = content.get('districtPhotoURL')?.toString().trim();
      const districtName = content.get('districtName')?.toString().trim();

      if (!districtPhotoURL || !districtName) {
        toast('Please provide photo url and District name');
        return;
      }

      // if (districtsNames?.find(existingDistrictName => existingDistrictName === districtName)) {
      //   toast.info(`${districtName} exists. Fill new 'name'`);
      //   return;
      // }

      const newDistrict: NewDistrictWithOutId = {
        stateId,
        cityId,

        districtName,
        districtPhotoURL,
        districtInternational: districtName,
        districtCode: districtName.slice(0, 4).toUpperCase(),
        edited: 0,

        cityInternational: '',
        langCode: 'EN',
        dbLangCode: 'EN',
      };

      try {
        // appDispatch(addDistrict(newDistrict));
        console.log('newDistrict', newDistrict);
        setAddingDistrictTrue();
        toast.success(`District ${districtName} added`);
      } catch (error) {
        toast.error('District not added');
      }
    },
    [isSubmitDisabled, stateId, cityId, setAddingDistrictTrue]
  );

  return (
    <AddDistrictFormStyled onSubmit={handleSubmitAddDistrict}>
      {!isAddingDistrict && (
        <AddLocationButton type="button" onClick={setAddingDistrictTrue}>
          +1
        </AddLocationButton>
      )}

      {isAddingDistrict && (
        <Row>
          <label>
            <input
              type="url"
              name="districtPhotoURL"
              minLength={8}
              maxLength={300}
              required
              title="https://my-location.com/photo.jpg"
            />
            <p>add a link to the photo</p>
          </label>

          <label>
            <input type="text" name="districtName" minLength={3} maxLength={50} required />
            <p>add the name of the district</p>
          </label>

          <SubmitAddLocationButton type="submit">Add Loc 1</SubmitAddLocationButton>
        </Row>
      )}
    </AddDistrictFormStyled>
  );
};
