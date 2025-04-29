"use client";
import { Button } from "@/components/custom/custom-button";
import { FlexBox } from "@/components/custom/flex-box";
import { Heading } from "@/components/ui/heading";
import { colors } from "@/constants";
import { TicketWithProfile } from "@/types";
import { TicketFilter } from "./ticket-filter";
import { TicketTable } from "./ticket-table";
import { useRaiseTicketModalController } from "@/lib/nuqs/use-raise-ticket";

type Props = {
  tickets: TicketWithProfile[];
  total: number;
};

export const DisplayTicket = ({ tickets, total }: Props) => {
  const { open } = useRaiseTicketModalController();
  const data = tickets.map((ticket) => {
    return {
      label: ticket.assignee?.name || "Unassigned",
      value: ticket.assignee?.$id || "unassigned",
    };
  });

  console.log(data);
  // const allAssignees = [...new Set(data)];
    const allAssignees = [
        ...new Map(data.map(d => [d.value, d])).values()
    ];

    return (
    <div className="bg-white min-h-screen p-5">
      <Heading title="All tickets" subTitle="View all raised tickets" />
      <div className="mb-5 md:mb-10" />
      <FlexBox
        justifyContent={{ base: "start", md: "space-between" }}
        gap={2}
        flexDir={{ base: "column", md: "row" }}
        mt={3}
      >
        <TicketFilter allAssignees={allAssignees} />
        <Button
          color={colors.white}
          bg={colors.purple}
          variant={"solid"}
          px={2}
          width={{ base: "100%", md: "fit" }}
          onClick={open}
        >
          Raise ticket
        </Button>
      </FlexBox>
      <div className="mb-3 md:mb-5" />

      <TicketTable tickets={tickets} total={total} />
    </div>
  );
};
