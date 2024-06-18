import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl, endpoints } from 'features/api';
import { Spinner } from 'components/shared/Loader';
import { useAppSelector } from 'App';
import { getObjectOnVerify } from 'features/objectOnVerify/objectOnVerifySelector';
import { toast } from 'react-toastify';
import { ModalWrapper, Text } from './ModalButton.styled';

type Props = {
  title: string;
  onClick: (data: { elTitle: string; elData?: any[]; type: string }) => void;
  data?: any[];
};

// const LocationRegister1 = [
//   'Київ',
//   'Харків',
//   'Одеса',
//   'Дніпро',
//   'Львів',
//   'Запоріжжя',
//   'Переяслав-Хмельницький Центр',
//   'Новоград-Волинський Вокзал',
//   'Чернівці',
//   'Хмельницький',
// ];

// const LocationRegister2 = [
//   'Житомир',
//   'Вінниця',
//   'Кропивницький (Кіровоград)',
//   'Луцьк',
//   'Рівне',
//   'Ужгород',
//   'Черкаси',
//   'Новоград-Волинський Вокзал',
//   "Кам'янець-Подільський",
//   'Суми',
//   'Полтава',
// ];

// const LocationRegister3 = [
//   'Кременчук',
//   'Миколаїв',
//   'Херсон',
//   'Чернігів',
//   'Біла Церква',
//   'Мукачево',
//   'Ізмаїл',
//   'Рівне',
//   'Львів',
// ];

type LocationRegisters = Record<string, { title: string; type: string; data?: any[] }[]>;

export const ModalButton: React.FC<Props> = ({ title, onClick, data }) => {
  const [locationRegisters, setLocationRegisters] = useState<LocationRegisters>({
    'Location Register 1': [],
    'Location Register 2': [],
    'Location Register 3': [],
  });

  const [loading, setLoading] = useState(false);

  const { data: hotelData } = useAppSelector(getObjectOnVerify);
  const {
    hotels: {
      location: { _id: locationId },
    },
  } = hotelData;

  useEffect(() => {
    async function fetch() {
      try {
        if (data && data.length > 0) {
          setLocationRegisters({ ...locationRegisters, [title]: data });
          return;
        }
        if (locationRegisters[title].length > 0) {
          return;
        }
        setLoading(true);
        switch (title) {
          case 'Location Register 1': {
            // const {
            //   data: {
            //     data: { states },
            //   },
            // } = await axios.get(`${baseUrl}${endpoints.locationState}`);

            // const statesByLangCode = states.filter((state: any) => state.langCode === 'EN');
            // const mappingStates: { title: string; type: string; data: any[] }[] =
            //   statesByLangCode.map((state: any) => ({
            //     title: state.stateName,
            //     type: title,
            //     data: state.cities,
            //   }));

            // setLocationRegisters({ ...locationRegisters, [title]: mappingStates });

            const {
              data: {
                data: { cities },
              },
            } = await axios.get(`${baseUrl}${endpoints.locationCity}`);

            const citiesByLocationId = cities.find((city: any) => city._id === locationId);
            const { cityInternational } = citiesByLocationId;

            const citiesByLangCode = cities.find(
              (city: any) => city.langCode === 'EN' && city.cityInternational === cityInternational
            );

            if (citiesByLangCode) {
              const districts = citiesByLangCode.districts.map((district: any) => ({
                title: district.districtName,
                type: title,
              }));
              setLocationRegisters({ ...locationRegisters, [title]: districts });
            }
            break;
          }
          default:
            break;
        }
        setLoading(false);
      } catch (error) {
        toast.error(error as string);
      }
    }

    fetch();
  }, [data, locationId, locationRegisters, title]);

  const locationRegister = locationRegisters[title];

  return (
    <div>
      {loading && <Spinner />}
      {locationRegister.length > 0 && (
        <ModalWrapper>
          {locationRegister.map(el => (
            <Text
              key={el.title}
              onClick={() => onClick({ elTitle: el.title, elData: el.data, type: title })}
            >
              {el.title}
            </Text>
          ))}
        </ModalWrapper>
      )}
    </div>
  );
};
