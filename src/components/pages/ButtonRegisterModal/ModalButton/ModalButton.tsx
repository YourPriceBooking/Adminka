import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl, endpoints } from 'features/api';
import { Spinner } from 'components/shared/Loader';
import { ModalWrapper, Text } from './ModalButton.styled';

type Props = {
  title: string;
  onClick: (el: string) => void;
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

type LocationRegisters = Record<string, string[]>;

export const ModalButton: React.FC<Props> = ({ title, onClick }) => {
  const [locationRegisters, setLocationRegisters] = useState<LocationRegisters>({
    'Location Register 1': [],
    'Location Register 2': [],
    'Location Register 3': [],
  });
  const [loading, setLoading] = useState(false);

  const locationRegister = locationRegisters[title];

  useEffect(() => {
    async function fetch() {
      try {
        if (locationRegisters[title].length > 0) {
          return;
        }
        setLoading(true);
        switch (title) {
          case 'Location Register 1': {
            const {
              data: {
                data: { states },
              },
            } = await axios.get(`${baseUrl}${endpoints.locationState}`);

            const statesByLangCode = states.filter((city: any) => city.langCode === 'EN');
            const statesNames: string[] = statesByLangCode.map((city: any) => city.stateName);
            setLocationRegisters({ ...locationRegisters, [title]: statesNames });
            break;
          }
          case 'Location Register 2': {
            const {
              data: {
                data: { cities },
              },
            } = await axios.get(`${baseUrl}${endpoints.locationCity}`);

            const citiesByLangCode = cities.filter((city: any) => city.langCode === 'EN');
            const citiesNames: string[] = citiesByLangCode.map((city: any) => city.cityName);
            setLocationRegisters({ ...locationRegisters, [title]: citiesNames });
            break;
          }
          case 'Location Register 3': {
            const {
              data: {
                data: { districts },
              },
            } = await axios.get(`${baseUrl}${endpoints.locationDistrict}`);

            const districtsByLangCode = districts.filter((city: any) => city.langCode === 'EN');
            const districtsNames: string[] = districtsByLangCode.map(
              (city: any) => city.districtName
            );
            setLocationRegisters({ ...locationRegisters, [title]: districtsNames });
            break;
          }

          default:
            break;
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetch();
  }, [locationRegisters]);

  return (
    <div>
      {loading && <Spinner />}
      {locationRegister.length > 0 && (
        <ModalWrapper>
          {locationRegister.map(el => (
            <Text key={el} onClick={() => onClick(el)}>
              {el}
            </Text>
          ))}
        </ModalWrapper>
      )}
    </div>
  );
};
