import { useState } from "react";
import { AddAccessButton } from "../AddAccessButton";
import { CloseButton } from "../CloseButton";
import { AdminAccessMainStyled } from "./AdminPageAccessMain.styled";
import { AddEmailAccess } from "../AddEmailAccess";

export const AdminPageAccessMain = () => {
   const [showAddEmail, setShowAddEmail] = useState<boolean>(false);
   const [showAddEmailButton, setShowAddEmailButton] = useState<boolean>(true);


  const handleAddEmailButtonClick = () => {
    setShowAddEmail(true);
    setShowAddEmailButton(false);
  };

  const handleCloseClick = () => {
    setShowAddEmail(false);
    setShowAddEmailButton(true);
  };

  return (
    <div>
      <AdminAccessMainStyled>
        {showAddEmailButton && <AddAccessButton onClick={handleAddEmailButtonClick} />}
        {!showAddEmail && (
          <CloseButton
            src="CloseButton.png"
            onClick={handleCloseClick}
            direction="/admin-page-access"
          />
        )}
        {showAddEmail && <AddEmailAccess onClick={handleCloseClick} />}
      </AdminAccessMainStyled>
    </div>
  );
};




