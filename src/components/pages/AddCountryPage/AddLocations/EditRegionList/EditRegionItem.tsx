import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { editRegion, selectIsEnglishActiveLang } from 'redux/slices';
import type { EditRegion } from 'types/apis';
import { EditButton } from '../../AddCountries/EditButton/EditButton';

import {
  SubmitAddLocationButton,
  EditLocationsItemStyled,
  EditRegionFormStyled,
  RegionInfo,
} from './EditRegionList.styled';

type EditRegionItemType = EditRegion;

export const EditRegionItem = ({
  _id,
  regionName,
  regionPhotoURL,
  regionInternational,
  regionCode,
  edited,
}: EditRegionItemType) => {
  const [isEditingRegion, setIsEditingRegion] = useState(false);
  const appDispatch = useAppDispatch();

  const [localRegionName, setLocalRegionName] = useState(regionName);
  const [localRegionPhotoURL, setLocalRegionPhotoURL] = useState(regionPhotoURL);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const setIsEditingRegionTrue = useCallback(() => setIsEditingRegion(true), []);

  const handleSubmitEditRegion = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;

      const content = new FormData(form);
      const regionPhotoURL = content.get('regionPhotoURL')?.toString().trim();
      const regionName = content.get('regionName')?.toString().trim();

      if (!regionPhotoURL || !regionName) {
        return toast('Please provide photo url and Region name');
      }

      const updatedRegion = {
        _id,
        regionName: localRegionName,
        regionPhotoURL: localRegionPhotoURL,
        regionInternational: !regionInternational && isEng ? localRegionName : regionInternational,
        regionCode,
        edited: Number(edited) + 1,
      };

      try {
        appDispatch(editRegion(updatedRegion));
        setIsEditingRegion(false);
        // toast.success('Region updated');
      } catch (error) {
        toast.error('Region is not edited');
        console.log(error);
      }
    },

    [
      _id,
      appDispatch,
      edited,
      isEng,
      localRegionName,
      localRegionPhotoURL,
      regionCode,
      regionInternational,
    ]
  );

  const isInputDisabled = !isEditingRegion;
  const isEditButtonDisabled = isEditingRegion;
  const isSubmitDisabled = !localRegionName?.trim() || !localRegionPhotoURL?.trim();
  const $isFirstEdit = !edited && !isEng;

  return (
    <EditLocationsItemStyled>
      <EditRegionFormStyled onSubmit={handleSubmitEditRegion}>
        <RegionInfo>
          <label>
            <input
              type="text"
              name="regionName"
              value={localRegionName}
              onChange={e => setLocalRegionName(e.currentTarget.value)}
              disabled={isInputDisabled}
              maxLength={100}
              minLength={2}
              required
            />
          </label>

          <label>
            <input
              type="url"
              name="regionPhotoURL"
              value={localRegionPhotoURL}
              onChange={e => setLocalRegionPhotoURL(e.currentTarget.value)}
              disabled={isInputDisabled}
              maxLength={300}
              minLength={8}
              required
            />
          </label>
        </RegionInfo>

        {!isEditingRegion && (
          <EditButton
            $isFirstEdit={$isFirstEdit}
            onClick={setIsEditingRegionTrue}
            disabled={isEditButtonDisabled}
          />
        )}

        {isEditingRegion && (
          <SubmitAddLocationButton type="submit" disabled={isSubmitDisabled}>
            Done
          </SubmitAddLocationButton>
        )}
      </EditRegionFormStyled>
    </EditLocationsItemStyled>
  );
};
