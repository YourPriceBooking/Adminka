import type { EntityId } from '@reduxjs/toolkit';
import { selectActiveLangCode } from 'features/languages';
import {
  useGetAllObjectsHoteilerQuery
} from 'features/catalogForHotelier/addCatalogApi';
import { useAppSelector } from 'App';
import { DataObject } from 'types/addLocation';
import { AddDistrictForm } from './AddDistrictForm';
import { DistrictsStyled } from './Districts.styled';
import { DistrictsList } from './DistrictsList';

type DistrictsProps = {
  cityId: EntityId;
  stateId: EntityId;
};

export const Districts = ({ cityId, stateId }: DistrictsProps) => {
  const activeLangCode = useAppSelector(selectActiveLangCode);
  const { data } = useGetAllObjectsHoteilerQuery(`${activeLangCode?.toLowerCase()}`);

  const getIndexPage = (): DataObject => {
    let value = 'getAllEnPages';
    if (activeLangCode === 'UA') {
      value = 'getAllUaPages';
    } else if (activeLangCode === 'PL') {
      value = 'getAllPlPages';
    } else if (activeLangCode === 'RU') {
      value = 'getAllRuPages';
    }
    // @ts-ignore
    return data?.data?.[value] as DataObject;
  };
  return (
    <DistrictsStyled>
      <DistrictsList cityId={cityId} stateId={stateId} data={getIndexPage()} />

      <AddDistrictForm cityId={cityId} stateId={stateId} />
    </DistrictsStyled>
  );
}