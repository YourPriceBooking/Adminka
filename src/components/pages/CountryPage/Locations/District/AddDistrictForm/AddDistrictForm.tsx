import type { FormEvent } from 'react';
import { useRef, useCallback, useState } from 'react';
import type { EntityId } from '@reduxjs/toolkit';
import type { AddDistrict } from 'types/apis';
import { toast } from 'react-toastify';
import { useAppSelector } from 'App';
import { generateDistrictCode, wait } from 'common/utils';
import { SubmitAddLocationButton } from 'components/shared/Buttons';
import { Spinner } from 'components/shared/Loader';
import { selectCityById, useLazyGetCitiesQuery } from 'features/cities';
import { useAddDistrictMutation, useLazyGetDistrictsQuery } from 'features/districts';
import { selectIsEnglishActiveLang } from 'features/languages';
import { useCloseOnOutsideClick } from 'common/hooks';
import { AddLocationButton } from '../../States/AddStateForm/AddStateForm.styled';
import {
  Row,
  AddDistrictFormStyled,
  AddDistrictPhotoLabel,
  AddDistrictPhotoInput,
  AddDistrictNameLabel,
  AddDistrictNameInput,
} from './AddDistrictForm.styled';

export const AddDistrictForm = ({ cityId }: { cityId: EntityId }) => {
  const [addDistrict, { isLoading: isAddingL1 }] = useAddDistrictMutation();
  const [getCities, { isLoading: isRefetchingCities }] = useLazyGetCitiesQuery();
  const [getDistricts, { isLoading: isRefetchingDistricts }] = useLazyGetDistrictsQuery();

  const city = useAppSelector(state => selectCityById(state, cityId));

  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const [isAddingDistrict, setIsAddingDistrict] = useState(false);
  const startAdding = useCallback(() => setIsAddingDistrict(true), []);
  const stopAdding = useCallback(() => setIsAddingDistrict(false), []);

  const formRef = useRef<HTMLFormElement>(null);

  useCloseOnOutsideClick({
    isEditing: isAddingDistrict,
    stopEditing: stopAdding,
    formRef,
  });

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
      if (!addedDistrict) return;

      const addedDistrictName =
        addedDistrict.entities[addedDistrict.ids[0]]?.districtName === districtName;
      if (!addedDistrictName) return;

      toast.success(`District ${districtName} added`);

      await wait(1500);
      await getCities();
      await getDistricts();
    } catch (error) {
      toast.error('District not added');
    } finally {
      stopAdding();
    }
  };

  const submitAddLocationButtonLabel = isPending ? <Spinner /> : 'Add Loc 1';
  const addLocationButtonLabel = isPending ? <Spinner /> : '+1';

  const showAddDistrictForm = isAddingDistrict && (
    <Row>
      <AddDistrictPhotoLabel>
        <AddDistrictPhotoInput
          type="url"
          name="districtPhotoURL"
          minLength={8}
          maxLength={300}
          required
          title="https://my-location.com/photo.jpg"
        />
        <p>Add photo link</p>
      </AddDistrictPhotoLabel>

      <AddDistrictNameLabel>
        <AddDistrictNameInput
          type="text"
          name="districtName"
          minLength={3}
          maxLength={50}
          required
        />

        <p>
          Add <b>district</b> name
        </p>
      </AddDistrictNameLabel>

      <SubmitAddLocationButton type="submit" disabled={isPending}>
        {submitAddLocationButtonLabel}
      </SubmitAddLocationButton>
    </Row>
  );

  const showAddDistrictButton = isEng && !isAddingDistrict && cityId && (
    <AddLocationButton type="button" onClick={startAdding} disabled={isPending}>
      {addLocationButtonLabel}
    </AddLocationButton>
  );

  return (
    <AddDistrictFormStyled onSubmit={handleSubmitAddDistrict} ref={formRef}>
      {showAddDistrictForm}
      {showAddDistrictButton}
    </AddDistrictFormStyled>
  );
};
