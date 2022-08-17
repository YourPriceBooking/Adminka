import { useAppSelector } from 'App';
import { isEdited, logRender } from 'common/utils';
import {
  selectActiveDBLangCode,
  selectActiveLangCode,
  selectIsEnglishActiveLang,
} from 'features/languages';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import type { EditDistrict } from 'types/apis';

import { EditButton } from '../../../AddCountries/EditButton/EditButton';
import { SubmitAddLocationButton } from '../../States/EditStateForm/EditStateForm.styled';
import type { DistrictItemProps } from '../DistrictsList/DistrictItem';

import {
  EditDistrictFormStyled,
  DistrictInfo,
  EditDistrictPhotoURLInput,
} from './EditDistrictForm.styled';

const districtItem: EditDistrict = {
  cityId: '12345SCityId',
  cityInternational: 'test',

  _id: 'test',
  districtName: 'test',
  districtPhotoURL: 'test',
  districtInternational: 'test',
  districtCode: 'test',

  langCode: 'test',
  dbLangCode: 'test',

  createdAt: 'test',
  updatedAt: 'test',
};

const useSelectDistrict = (districtId: string) => {
  logRender('useSelectDistrict ~ districtId', districtId);
  return districtItem;
};

export const EditDistrictForm = ({ districtId }: DistrictItemProps) => {
  const {
    cityId,
    cityInternational,

    _id: id,
    districtName,
    districtPhotoURL,
    districtInternational,
    districtCode,
    createdAt,
    updatedAt,
  } = useSelectDistrict(districtId);

  const activeLangCode = useAppSelector(selectActiveLangCode);
  const activeDBLangCode = useAppSelector(selectActiveDBLangCode);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const [isEditingDistrict, setIsEditingDistrict] = useState(false);

  const [localDistrictName, setLocalDistrictName] = useState(districtName);
  const [localDistrictPhotoURL, setLocalDistrictPhotoURL] = useState(districtPhotoURL);

  const setIsEditingDistrictTrue = useCallback(() => setIsEditingDistrict(true), []);

  const isInputDisabled = !isEditingDistrict;
  const isEditButtonDisabled = isEditingDistrict;
  const isSubmitDisabled =
    !localDistrictName?.trim() ||
    !localDistrictPhotoURL?.trim() ||
    !activeLangCode ||
    !activeDBLangCode;
  const $isFirstEdit = !isEdited(createdAt, updatedAt) && !isEng;

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

    const updatedDistrict: EditDistrict = {
      cityId,
      cityInternational, // TODO: check if it arrives

      _id: id,
      districtName: districtNameTrimmed,
      districtPhotoURL: districtPhotoURLTrimmed,
      districtInternational:
        !districtInternational && isEng ? districtNameTrimmed : districtInternational,
      districtCode,

      langCode: activeLangCode,
      dbLangCode: activeDBLangCode,

      createdAt,
      updatedAt,
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
