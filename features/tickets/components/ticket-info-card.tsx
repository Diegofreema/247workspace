import { TicketsType } from "@/types";
import { Card } from "@chakra-ui/react";
import { colors } from "@/constants";

type Props = {
  ticket: TicketsType;
};

export const TicketInfoCard = ({ ticket }: Props) => {
  return (
    <Card.Root width="100%" bg={colors.white}>
      <Card.Body gap="2">
        <Card.Title mt="2">{ticket.subject}</Card.Title>
        <Card.Description>
          This is the card body. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
          Curabitur nec odio vel dui euismod fermentum.
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end"></Card.Footer>
    </Card.Root>
  );
};
