import React, { useState } from 'react';
import { ButtonTranslation } from './Compinents.styled';

export const AddTranslationButton: React.FC<{ handleTranslate?: any }> = ({ handleTranslate }) => {
  const [disable, setDisable] = useState(false);

  return (
    <div>
      <ButtonTranslation
        disabled={disable}
        type="submit"
        onClick={() => {
          if (handleTranslate) {
            handleTranslate();
            setDisable(true);
          }
        }}
      >
        Add a translation of the property description and booking options and determine the original
        language.
      </ButtonTranslation>
    </div>
  );
};
