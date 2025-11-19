import React from 'react';
import { ObjectHistoryInfo } from './ObjectHistoryInfo';
import { DivObjectHistoryMain, HObject } from './ObjectHistory.styled';
import { VerifInfo } from './Components/VerifInfo';
import { ObjectHistoryOption } from './ObjectHistoryOption';
import { SalesHistory } from './Components/SalesHistory';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ObjectHistory: React.FC<{ handleTranslate: any }> = ({ handleTranslate }) => {
  const verifValues = ['Object ID 45454454 added', '00:12 22/12/2023', 'Hotelier ID 435473'];
  const verifValuesStart = [
    'First verification Object ID 45454454 started  ',
    '07:59 22/12/2023',
    'Verifier ID 435473',
  ];
  const verifValuesFinish = [
    'First verification Object ID 45454454 finished ',
    '07:59 22/12/2023',
    'Verifier ID 435473',
  ];

  const verifValuesStartNext = [
    'Next verification Object ID 45454454 started ',
    '07:59 22/12/2023',
    'Verifier ID 435473',
  ];
  const verifValuesFinishNext = [
    'Next verification Object ID 45454454 finished   ',
    '07:59 22/12/2023',
    'Verifier ID 435473',
  ];

  const verifObjectDelete = [
    'Object ID 45454454 deleted ',
    '07:59 22/12/2023',
    'Verifier ID 435473',
  ];
  const verifObjectRestore = [
    'Object ID 45454454 restored',
    '07:59 22/12/2023',
    'Verifier ID 435473',
  ];

  const verifObjectOptionAdd = [
    'Booking option 357RT  ID 45454454 added        ',
    '07:59 22/12/2023',
    'Verifier ID 435473',
  ];
  const verifObjectOptionDelete = [
    'Booking option 357RT ID 45454454 deleted  ',
    '07:59 22/12/2023',
    'Verifier ID 435473',
  ];

  const verifOptionStart = [
    'First verification Booking option  357RT  ID 45454454 started',
    '07:59 22/12/2023',
    'Verifier ID 435473',
  ];
  const verifOptionFinish = [
    'First verification Booking option 357RT  ID 45454454 finished',
    '07:59 22/12/2023',
    'Verifier ID 435473',
  ];

  return (
    <div>
      <DivObjectHistoryMain>
        <SalesHistory />
        <HObject>Object’s History</HObject>

        <VerifInfo values={verifValues} />

        <ObjectHistoryInfo
          handleTranslate={handleTranslate}
          verifInfoStart={verifValuesStart}
          verifInfoFinish={verifValuesFinish}
          isFirst
        />
        <ObjectHistoryInfo
          verifInfoStart={verifValuesStartNext}
          verifInfoFinish={verifValuesFinishNext}
        />

        <VerifInfo values={verifObjectDelete} />
        <VerifInfo values={verifObjectRestore} />

        <VerifInfo values={verifObjectOptionAdd} />
        <VerifInfo values={verifObjectOptionDelete} />

        <ObjectHistoryOption
          handleTranslate={handleTranslate}
          verifInfoStart={verifOptionStart}
          verifInfoFinish={verifOptionFinish}
        />
      </DivObjectHistoryMain>
    </div>
  );
};

export default ObjectHistory;
