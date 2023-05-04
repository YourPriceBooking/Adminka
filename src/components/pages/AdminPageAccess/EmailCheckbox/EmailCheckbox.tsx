import { EmailCheckboxStyled } from "./EmailCheckbox.styled"

export const EmailCheckbox = () => (
  <EmailCheckboxStyled>
    <form>
      <input id="Objects" type="checkbox" />
      <label htmlFor="Objects">Objects Verification</label>
    </form>
    <form>
      <input id="languages" type="checkbox" />
      <label htmlFor="languages">
        Adding a languages  Adding a countrys  Location registers: 1, 2, 3
      </label>
    </form>
    <form>
      <input id="Statistics" type="checkbox" />
      <label htmlFor="Statistics">Statistics</label>
    </form>
    <form>
      <input id="Finance" type="checkbox" />
      <label htmlFor="Finance">Finance</label>
    </form>
    <form>
      <input id="Blog" type="checkbox" />
      <label htmlFor="Blog">Blog</label>
    </form>
  </EmailCheckboxStyled>
);