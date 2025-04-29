import { TicketsType } from "@/types";
import { Card, Stack } from "@chakra-ui/react";
import { colors } from "@/constants";
import { FlexBox } from "@/components/custom/flex-box";
import { TicketStatusSelector } from "@/features/tickets/components/ticket-status-selector";
import { CustomText } from "@/components/custom/title";
import { format } from "date-fns";
import { IconGitPullRequest, IconMenu3 } from "@tabler/icons-react";

type Props = {
  ticket: TicketsType;
  profileId: string;
};

export const TicketInfoCard = ({ ticket, profileId }: Props) => {
  return (
    <Card.Root width="100%" bg={colors.white}>
      <Card.Body gap="2">
        <FlexBox
          justifyContent={{ md: "space-between" }}
          alignItems={{ md: "center" }}
          gap={2}
          flexDir={{ base: "column", md: "row" }}
          mb={5}
          width={"100%"}
        >
          <div>
            <Card.Title
              mt="2"
              color={colors.black}
              fontWeight={"bold"}
              fontSize={{ base: 20, md: 25, lg: 30 }}
            >
              {ticket.subject}
            </Card.Title>
            <CustomText
              color={colors.grey}
              mt={2}
              fontWeight={"bold"}
              fontSize={"sm"}
            >
              Created: {format(ticket.$createdAt, "PPP")}
            </CustomText>
          </div>

          <TicketStatusSelector
            id={ticket.$id}
            status={ticket.status}
            profileId={profileId}
          />
        </FlexBox>
        <Stack gap={3} mb={3}>
          <FlexBox alignItems={"center"} gap={2}>
            <IconGitPullRequest color={colors.iconGrey} size={30} />
            <CustomText
              color={colors.iconGrey}
              fontWeight={"bold"}
              fontSize={20}
            >
              Title
            </CustomText>
          </FlexBox>

          <Card.Description>{ticket.subject}</Card.Description>
        </Stack>
        <Stack gap={3}>
          <FlexBox alignItems={"center"} gap={2}>
            <IconMenu3 color={colors.iconGrey} size={30} />
            <CustomText
              color={colors.iconGrey}
              fontWeight={"bold"}
              fontSize={20}
            >
              Description
            </CustomText>
          </FlexBox>

          <Card.Description>{ticket.description}</Card.Description>
        </Stack>
      </Card.Body>
      <Card.Footer justifyContent="flex-end"></Card.Footer>
    </Card.Root>
  );
};
