import type { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from 'App';
import { generateDistrictCode } from 'common/utils';
import { useAddDistrictMutation } from 'features/districts';
import { selectIsEnglishActiveLang } from 'features/languages';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import type { AddDistrict } from 'types/apis';
import { AddLocationButton } from '../../States/AddStateForm/AddStateForm.styled';
import { SubmitAddLocationButton } from '../../States/EditStateForm/EditStateForm.styled';
import { Row, AddDistrictFormStyled } from './AddDistrictForm.styled';

export const AddDistrictForm = ({ cityId }: { cityId: EntityId }) => {
  const [addDistrict, { isLoading: isAddingL1 }] = useAddDistrictMutation();

  const isEng = useAppSelector(selectIsEnglishActiveLang);
  const [isAddingDistrict, setIsAddingDistrict] = useState(false);
  // const districtsNames = useAppSelector(state => selectMemoizedDistrictNames(state, stateId, cityId));

  const setAddingDistrictTrue = useCallback(() => setIsAddingDistrict(true), []);

  const isLoading = isAddingL1;
  const isSubmitDisabled = !isEng || isLoading;

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
      cityId,
      cityInternational: '',

      districtName,
      districtPhotoURL,
      districtInternational: districtName,
      districtCode: generateDistrictCode(districtName),

      langCode: 'EN',
      dbLangCode: 'EN',
    };

    try {
      const addedDistrict = await addDistrict(newDistrict).unwrap();
      const addedDistrictName = addedDistrict?.entities?.[addedDistrict?.ids?.[0]]?.districtName;

      if (addedDistrictName) {
        toast.success(`District ${districtName} added`);
      }

      setAddingDistrictTrue();
    } catch (error) {
      toast.error('District not added');
    }
  };

  const showSubmitButton = isEng && !isAddingDistrict && cityId && (
    <AddLocationButton type="button" onClick={setAddingDistrictTrue}>
      +1
    </AddLocationButton>
  );

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

      <SubmitAddLocationButton type="submit">Add Loc 1</SubmitAddLocationButton>
    </Row>
  );

  return (
    <AddDistrictFormStyled onSubmit={handleSubmitAddDistrict}>
      {showSubmitButton}

      {showAddDistrictForm}
    </AddDistrictFormStyled>
  );
};
