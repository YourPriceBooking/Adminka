export interface Language {
  _id: string;
  lang: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export type LanguagesResponse = Language[];

export interface AddLanguage {
  lang: string;
  code: string;
  // edited: number;
}

export interface EditLanguage {
  _id: string;
  lang: string;
  code: string;
  // edited: number;
}

// console.log(LanguagesResponse);

/*
{
  "name": "Jacob Mercer",
  "number": "761-23-96"
}

  {
    lang: en // no need edited
  countries :{
    {id: 1, name : 'Ukraine'}
  }
  }

{

  lang: poland // no need edited
  countries :{
    {id: 1, name : 'Ukraine', edited: 0} // orange
  }
}
*/
