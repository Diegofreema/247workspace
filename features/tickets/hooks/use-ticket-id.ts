"use client";

import { useParams } from "next/navigation";

export const useTicketId = () => {
  const { ticketId } = useParams();
  return ticketId as string;
};
