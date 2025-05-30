import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toaster } from "@/components/ui/toaster";
import { client } from "@/lib/rpc";
import { ApiResponse } from "@/types";

type ResponseType = InferResponseType<
  (typeof client.api.comments)[":commentId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.comments)[":commentId"]["$delete"]
>;

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const res = await client.api.comments[":commentId"].$delete({
        param,
        json,
      });
      if (!res.ok) {
        const errorResponse = (await res.json()) as ApiResponse;
        console.log(errorResponse);
        throw new Error(errorResponse.error || "Failed to delete comment");
      }
      return await res.json();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["comments"] });

      toaster.create({
        title: "Success",
        description: "Comment has been deleted",
        type: "success",
      });
    },
    onError: (error) => {
      console.log(error.message);
      toaster.create({
        title: "Something went wrong",
        description: error.message || "Failed to delete comment",
        type: "error",
      });
    },
  });
};
