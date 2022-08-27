import type { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from 'App';
import { generateDistrictCode } from 'common/utils';
import { Spinner } from 'components/shared/Loader';
import { selectCityById, useLazyGetCitiesQuery } from 'features/cities';
import { useAddDistrictMutation, useLazyGetDistrictsQuery } from 'features/districts';
import { selectIsEnglishActiveLang } from 'features/languages';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import type { AddDistrict } from 'types/apis';
import { AddLocationButton } from '../../States/AddStateForm/AddStateForm.styled';
import { SubmitAddLocationButton } from '../../States/EditStateForm/EditStateForm.styled';
import { Row, AddDistrictFormStyled } from './AddDistrictForm.styled';

export const AddDistrictForm = ({ cityId }: { cityId: EntityId }) => {
  const [addDistrict, { isLoading: isAddingL1 }] = useAddDistrictMutation();
  const [getCities, { isLoading: isRefetchingCities }] = useLazyGetCitiesQuery();
  const [getDistricts, { isLoading: isRefetchingDistricts }] = useLazyGetDistrictsQuery();

  const city = useAppSelector(state => selectCityById(state, cityId));

  const isEng = useAppSelector(selectIsEnglishActiveLang);
  const [isAddingDistrict, setIsAddingDistrict] = useState(false);
  // const districtsNames = useAppSelector(state => selectMemoizedDistrictNames(state, stateId, cityId));

  const setAddingDistrictTrue = useCallback(() => setIsAddingDistrict(true), []);
  const setAddingDistrictFalse = useCallback(() => setIsAddingDistrict(false), []);

  if (!city) return null;

  const { stateId, cityInternational } = city;

  const isPending = isAddingL1 || isRefetchingCities || isRefetchingDistricts;
  const isSubmitDisabled = !isEng || !isAddingDistrict || isPending;

  const handleSubmitAddDistrict = async (e: FormEvent<HTMLFormElement>) => {
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

    const newDistrict: AddDistrict = {
      stateId,
      cityId,
      cityInternational,

      districtName,
      districtPhotoURL,
      districtInternational: districtName,
      districtCode: generateDistrictCode(districtName),

      langCode: 'EN',
      dbLangCode: 'EN',
    };

    try {
      const addedDistrict = await addDistrict(newDistrict).unwrap();
      const addedDistrictName =
        addedDistrict?.entities?.[addedDistrict?.ids?.[0]]?.districtName === districtName;

      if (addedDistrictName) {
        toast.success(`District ${addedDistrictName} added`);
      }

      setTimeout(async () => {
        await getCities();
        await getDistricts();
      }, 1500);
    } catch (error) {
      toast.error('District not added');
    } finally {
      setAddingDistrictFalse();
    }
  };

  const submitAddLocationButtonLabel = isPending ? <Spinner /> : 'Add Loc 1';
  const addLocationButtonLabel = isPending ? <Spinner /> : '+1';

  const showAddDistrictForm = isAddingDistrict && (
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

      <SubmitAddLocationButton type="submit" disabled={isPending}>
        {submitAddLocationButtonLabel}
      </SubmitAddLocationButton>
    </Row>
  );

  const showAddDistrictButton = isEng && !isAddingDistrict && cityId && (
    <AddLocationButton type="button" onClick={setAddingDistrictTrue} disabled={isPending}>
      {addLocationButtonLabel}
    </AddLocationButton>
  );

  return (
    <AddDistrictFormStyled onSubmit={handleSubmitAddDistrict}>
      {showAddDistrictForm}
      {showAddDistrictButton}
    </AddDistrictFormStyled>
  );
};
