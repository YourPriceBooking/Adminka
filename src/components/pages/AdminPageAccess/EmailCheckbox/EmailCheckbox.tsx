import { EmailCheckboxStyled } from './EmailCheckbox.styled';

export const EmailCheckbox = () => (
  <EmailCheckboxStyled>
    <form>
    <div className="labels">
      <label htmlFor="Objects">
        Objects
        <br /> Verification
      </label>
      <label htmlFor="languages">
        Adding a languages
        <br /> Adding a countrys
        <br /> Location registers: <br />
        1, 2, 3
      </label>
      <label htmlFor="Statistics">Statistics</label>
      <label htmlFor="Finance">Finance</label>
      <label htmlFor="Blog">Blog</label>
      </div>
      <div className="inputs">
        <input  id="Objects" type="checkbox" />
        <input  id="languages" type="checkbox" />
        <input  id="Statistics" type="checkbox" />
        <input  id="Finance" type="checkbox" />
        <input  id="Blog" type="checkbox" />
        </div>
    </form>
  </EmailCheckboxStyled>
);
