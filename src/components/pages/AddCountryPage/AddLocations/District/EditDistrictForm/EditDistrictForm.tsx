import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import {
  editDistrict,
  selectIsEnglishActiveLang,
  makeSelectDistrictNamesForStateAndCity,
} from 'redux/slices';

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

    _id,
    districtName,
    districtPhotoURL,
    districtInternational,
    districtCode,
    edited,
  },
}: EditDistrictItemType) => {
  const appDispatch = useAppDispatch();

  const [isEditingDistrict, setIsEditingDistrict] = useState(false);
  const selectDistrictNamesForStateAndCity = useMemo(makeSelectDistrictNamesForStateAndCity, []);

  const districtNames = useAppSelector(state =>
    selectDistrictNamesForStateAndCity(state, { stateId, cityId })
  );

  const [localDistrictName, setLocalDistrictName] = useState(districtName);
  const [localDistrictPhotoURL, setLocalDistrictPhotoURL] = useState(districtPhotoURL);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const setIsEditingDistrictTrue = useCallback(() => setIsEditingDistrict(true), []);

  const handleSubmitEditDistrict = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const districtPhotoURLTrimmed = localDistrictPhotoURL?.trim();
      const districtNameTrimmed = localDistrictName?.trim();

      if (!districtPhotoURLTrimmed || !districtNameTrimmed) {
        toast('Please provide photo url and District name');
        return;
      }

      if (
        districtNames?.find(existingDistrictName => existingDistrictName === districtNameTrimmed)
      ) {
        toast.info(`${districtNameTrimmed} exists. Try another 'name'`);
        return;
      }

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
      };

      try {
        appDispatch(editDistrict(updatedDistrict));
        setIsEditingDistrict(false);
        // toast.success('District updated');
      } catch (error) {
        toast.error('District not updated');
      }
    },

    [
      stateId,
      cityId,

      _id,
      localDistrictName,
      localDistrictPhotoURL,
      districtInternational,
      isEng,
      districtCode,
      edited,
      appDispatch,
      districtNames,
    ]
  );

  const isInputDisabled = !isEditingDistrict;
  const isEditButtonDisabled = isEditingDistrict;
  const isSubmitDisabled = !localDistrictName?.trim() || !localDistrictPhotoURL?.trim();
  const $isFirstEdit = !edited && !isEng;

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
