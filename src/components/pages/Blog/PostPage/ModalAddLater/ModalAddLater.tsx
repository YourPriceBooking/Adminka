import { ModalContainer } from './ModalAddLater.styled';

const ModalAddLater = () => (
    <ModalContainer>
      <ul>
        <li>
          Post 1<span>22.12.24</span>
        </li>
        <li>
          Post 2<span>23.12.24</span>
        </li>
        <li>
          Post 3<span>24.12.24</span>
        </li>
      </ul>
      <div className="add-later">
        <input type="date" />
        <button type="button">Submit</button>
      </div>
    </ModalContainer>
  )

export default ModalAddLater;
