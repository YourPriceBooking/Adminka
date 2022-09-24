import { ObjectCard } from "./ObjectCard";
import { CardsWrapper } from "./ObjectCard/ObjectCard.styled";

const defaultObjects = 777;
export const PendingObjects = () => (
  <CardsWrapper>
    <ObjectCard country="Ukraine" objects={defaultObjects} />
    <ObjectCard country="Poland" objects={defaultObjects} />
    <ObjectCard country="USA" objects={defaultObjects} />
  </CardsWrapper>
);