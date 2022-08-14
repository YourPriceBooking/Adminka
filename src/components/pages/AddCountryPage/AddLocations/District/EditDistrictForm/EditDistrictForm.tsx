import { useAppSelector } from 'components/App';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { selectIsEnglishActiveLang, selectActiveLang } from 'redux/slices';

import { EditButton } from '../../../AddCountries/EditButton/EditButton';
import { SubmitAddLocationButton } from '../../State/EditStateForm/EditStateForm.styled';
import type { EditDistrictItemType } from '../EditDistrictsList/EditDistrictItem';

import {
  EditDistrictFormStyled,
  DistrictInfo,
  EditDistrictPhotoURLInput,
} from './EditDistrictForm.styled';

export const EditDistrictForm = ({
  district: {
    stateId,
    cityId,
    cityInternational,

    _id,
    districtName,
    districtPhotoURL,
    districtInternational,
    districtCode,
    edited,
  },
}: EditDistrictItemType) => {
  const activeLang = useAppSelector(selectActiveLang);

  const [isEditingDistrict, setIsEditingDistrict] = useState(false);

  const [localDistrictName, setLocalDistrictName] = useState(districtName);
  const [localDistrictPhotoURL, setLocalDistrictPhotoURL] = useState(districtPhotoURL);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const setIsEditingDistrictTrue = useCallback(() => setIsEditingDistrict(true), []);

  const isInputDisabled = !isEditingDistrict;
  const isEditButtonDisabled = isEditingDistrict;
  const isSubmitDisabled =
    !localDistrictName?.trim() || !localDistrictPhotoURL?.trim() || !activeLang;
  const $isFirstEdit = !edited && !isEng;

  const handleSubmitEditDistrict = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    const districtPhotoURLTrimmed = localDistrictPhotoURL?.trim();
    const districtNameTrimmed = localDistrictName?.trim();

    if (!districtPhotoURLTrimmed || !districtNameTrimmed) {
      toast('Please provide photo url and District name');
      return;
    }

    // if (districtNames?.find(existingDistrictName => existingDistrictName === districtNameTrimmed)) {
    //   toast.info(`${districtNameTrimmed} exists. Try another 'name'`);
    //   return;
    // }

    const updatedDistrict = {
      stateId,
      cityId,

      _id,
      districtName: districtNameTrimmed,
      districtPhotoURL: districtPhotoURLTrimmed,
      districtInternational:
        !districtInternational && isEng ? districtNameTrimmed : districtInternational,
      districtCode,
      edited: Number(edited) + 1,

      cityInternational, // TODO: check if it arrives
      langCode: activeLang.code,
      dbLangCode: activeLang.dbLangCode,
    };

    try {
      // appDispatch(editDistrict(updatedDistrict));
      console.log('handleSubmitEditDistrict ~ updatedDistrict', updatedDistrict);
      setIsEditingDistrict(false);
      // toast.success('District updated');
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
            value={localDistrictName}
            onChange={e => setLocalDistrictName(e.currentTarget.value)}
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
            value={localDistrictPhotoURL}
            onChange={e => setLocalDistrictPhotoURL(e.currentTarget.value)}
            disabled={isInputDisabled}
            maxLength={300}
            minLength={8}
            required
            title={localDistrictPhotoURL}
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

      {isEditingDistrict && (
        <SubmitAddLocationButton type="submit" disabled={isSubmitDisabled}>
          Done
        </SubmitAddLocationButton>
      )}
    </EditDistrictFormStyled>
  );
};
