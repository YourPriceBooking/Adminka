import { object, string } from 'yup';

export const addStateSchema = object({
  stateName: string()
    .min(1, 'stateName min 1 char')
    .max(1024, 'stateName max 1024 char')
    .required('stateName is required'),
  statePhotoUrl: string()
    .url()
    .min(12, 'statePhotoUrl min 12 char')
    .max(1024, 'statePhotoUrl max 1024 char')
    .required('statePhotoUrl is required'),
  // date: date()
  //   .min(new Date(2022, 8, 16), 'min 2000 year')
  //   .default(() => new Date()),
});
