import { useAppSelector } from 'App';
import { EditButton } from 'components/pages/CountryPage/Countries/EditButton';
import { selectDistrictById, useEditDistrictMutation } from 'features/districts';
import { selectActiveLangCode, selectIsEnglishActiveLang } from 'features/languages';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import type { EditDistrict } from 'types/apis';
import { SubmitAddLocationButton } from '../../States/EditStateForm/EditStateForm.styled';
import type { DistrictItemProps } from '../DistrictsList/DistrictItem';
import {
  EditDistrictFormStyled,
  DistrictInfo,
  EditDistrictPhotoURLInput,
} from './EditDistrictForm.styled';

export const EditDistrictForm = ({ districtId }: DistrictItemProps) => {
  const [editDistrict, { isLoading }] = useEditDistrictMutation();
  const district = useAppSelector(state => selectDistrictById(state, districtId));

  const activeLangCode = useAppSelector(selectActiveLangCode);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const [isEditingDistrict, setIsEditingDistrict] = useState(false);
  const setIsEditingDistrictTrue = useCallback(() => setIsEditingDistrict(true), []);

  if (!activeLangCode || !district) return null;

  const {
    cityId,
    cityInternational,

    _id: id,
    districtName,
    districtPhotoURL,
    districtInternational,
    districtCode,

    langCode,
  } = district;

  const isInputDisabled = !isEditingDistrict || isLoading;
  const isEditButtonDisabled = isEditingDistrict || isLoading;

  const $isFirstEdit = langCode === 'EN' && !isEng;

  const handleSubmitEditDistrict = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!activeLangCode) {
      toast('Please select language');
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const localDistrictName = formData.get('districtName')?.toString().trim();
    const localDistrictPhotoURL = formData.get('districtPhotoURL')?.toString().trim();

    const isSubmitDisabled = isLoading || !localDistrictName || !localDistrictPhotoURL;

    if (isSubmitDisabled) return;

    if (!localDistrictName || !localDistrictPhotoURL) {
      toast('Please provide photo url and District name');
      return;
    }

    // if (districtNames?.find(existingDistrictName => existingDistrictName === districtNameTrimmed)) {
    //   toast.info(`${districtNameTrimmed} exists. Try another 'name'`);
    //   return;
    // }

    const updatedDistrict: EditDistrict = {
      cityId,
      cityInternational, // TODO: check if it arrives

      _id: id,
      districtName: localDistrictName,
      districtPhotoURL: localDistrictPhotoURL,
      districtInternational,
      districtCode,

      langCode: activeLangCode,
    };

    try {
      const editedDistrictName = (await editDistrict(updatedDistrict).unwrap())?.entities[id]
        ?.districtName;

      if (editedDistrictName) {
        toast.success(`District ${editedDistrictName} updated`);
      }

      setIsEditingDistrict(false);
    } catch (error) {
      toast.error('District not updated');
    }
  };

  return (
    <EditDistrictFormStyled onSubmit={handleSubmitEditDistrict}>
      <DistrictInfo>
        <label>
          <span>District name</span>
          <input
            type="text"
            name="districtName"
            defaultValue={districtName}
            disabled={isInputDisabled}
            maxLength={30}
            minLength={2}
            required
          />
        </label>

        <label>
          <span>District photo URL</span>
          <EditDistrictPhotoURLInput
            type="url"
            name="districtPhotoURL"
            defaultValue={districtPhotoURL}
            disabled={isInputDisabled}
            maxLength={300}
            minLength={8}
            required
            title={districtPhotoURL}
          />
        </label>
      </DistrictInfo>

      {!isEditingDistrict && (
        <EditButton
          $isFirstEdit={$isFirstEdit}
          onClick={setIsEditingDistrictTrue}
          disabled={isEditButtonDisabled}
        />
      )}

      {isEditingDistrict && <SubmitAddLocationButton type="submit">Done</SubmitAddLocationButton>}
    </EditDistrictFormStyled>
  );
};
