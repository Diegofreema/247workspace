"use client";

import {colors} from "@/constants";
import {Card, For, Stack} from "@chakra-ui/react";
import {CommentForm} from "./comment-form";
import {useGetComments} from "@/features/comments/api/use-get-comments";
import {ErrorComponent} from "@/components/ui/error-component";
import {SmallerLoader} from "@/components/ui/small-loader";
import {Comment} from "./comment";
import {CustomText} from "@/components/custom/title";

type Props = {
  ticketId: string;
  profileId: string;
};

export const Comments = ({ profileId, ticketId }: Props) => {
  const { data, isPending, isError, refetch, error } = useGetComments({
    ticketId,
  });

  if (isError) {
    return (
      <ErrorComponent
        message={error.message}
        reset={refetch}
        className="mt-5"
      />
    );
  }

  if (isPending) {
    return <SmallerLoader />;
  }
  return (
    <Card.Root width="100%" bg={colors.white}>
      <Card.Body gap="2">
        <Stack gap={5}>
          <For
            each={data.documents}
            fallback={
              <CustomText
                color={colors.black}
                fontWeight={"bold"}
                textAlign={"center"}
                width={"100%"}
              >
                No comments yet
              </CustomText>
            }
          >
            {(item, index) => (
              <Comment key={index} item={item} profileId={profileId} />
            )}
          </For>
        </Stack>
      </Card.Body>
      <Card.Footer>
        <CommentForm profileId={profileId} ticketId={ticketId} />
      </Card.Footer>
    </Card.Root>
  );
};
