import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toaster } from "@/components/ui/toaster";
import { client } from "@/lib/rpc";
import { ApiResponse } from "@/types";

type ResponseType = InferResponseType<
  (typeof client.api.comments)[":ticketId"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.comments)[":ticketId"]["$post"]
>;

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const res = await client.api.comments[":ticketId"].$post({ json, param });
      if (!res.ok) {
        const error = (await res.json()) as ApiResponse;
        console.log(error);
        throw new Error(error.error || "Failed to create comment");
      }

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });

      toaster.create({
        title: "Success",
        description: "Your comment has been created successfully",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Something went wrong",
        description: error.message || "Please try again",
        type: "error",
      });
    },
  });
};
