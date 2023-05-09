import { EmailCheckboxStyled } from "./EmailCheckbox.styled"

export const EmailCheckbox = () => (
  <EmailCheckboxStyled>
    <form>
      <label htmlFor="Objects">Objects<br/> Verification</label>
      <input className="custom-checkbox" id="Objects" type="checkbox" />
    </form>
    <form>
      <label htmlFor="languages">
        Adding a languages<br/> Adding a countrys<br/> Location registers: <br/>1, 2, 3
      </label>
      <input className="custom-checkbox" id="languages" type="checkbox" />
    </form>
    <form>
      <label htmlFor="Statistics">Statistics</label>
      <input className="custom-checkbox" id="Statistics" type="checkbox" />
    </form>
    <form>
      <label htmlFor="Finance">Finance</label>
      <input className="custom-checkbox" id="Finance" type="checkbox" />
    </form>
    <form>
      <label htmlFor="Blog">Blog</label>
      <input className="custom-checkbox" id="Blog" type="checkbox" />
    </form>
  </EmailCheckboxStyled>
);