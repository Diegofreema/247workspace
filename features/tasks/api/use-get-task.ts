import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { StatusEnum } from "@/types";

type GetTasks = {
  workspaceId: string;
  projectId?: string | null;
  status?: StatusEnum | null;
  assigneeId?: string | null;
  dueDate?: string | null;
  search?: string | null;
};

export const useGetTasks = ({
  workspaceId,
  projectId,
  assigneeId,
  status,
  dueDate,
  search,
}: GetTasks) => {
  return useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      assigneeId,
      status,
      dueDate,
      search,
    ],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          assigneeId: assigneeId ?? undefined,
          status: status ?? undefined,
          dueDate: dueDate ?? undefined,
          search: search ?? undefined,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to get tasks");
      }

      return await response.json();
    },
  });
};
