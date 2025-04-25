import { FlexBox } from '@/components/custom/flex-box';
import { CustomText } from '@/components/custom/title';
import { ConfirmDialog } from '@/components/modals/confirm-dialog';
import { ProfileAvatar } from '@/components/ui/profile-avatar';
import { colors } from '@/constants';
import { FeedbackWithProfile } from '@/types';
import { Button, Card } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDeleteFeedback } from '../api/use-delete-feedback';
import { useEditFeedback } from '../api/use-update-feedback';
import { EditFeedbackModal } from '@/components/modals/edit-feedback-modal';

type Props = {
  feedback: FeedbackWithProfile;
  loggedInUser: string;
};

export const FeedbackCards = ({ feedback, loggedInUser }: Props) => {
  const { feedback: feedbackText, profile } = feedback;
  const { mutateAsync, isPending } = useDeleteFeedback();
  const { mutateAsync: updateFeedback, isPending: isPendingFeedback } =
    useEditFeedback();
  const [value, setValue] = useState(feedbackText);
  const [editing, setEditing] = useState(false);
  const isFeedbackOwner = loggedInUser === profile.$id;
  const [open, setOpen] = useState(false);
  const onDelete = async () => {
    mutateAsync(
      { param: { feedbackId: feedback.$id } },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  const onUpdate = async () => {
    await updateFeedback(
      { json: { feedback: value }, param: { feedbackId: feedback.$id } },
      {
        onSuccess: () => {
          setEditing(false);
        },
      }
    );
  };
  return (
    <>
      <EditFeedbackModal
        value={value}
        isOpen={editing}
        onClose={() => setEditing(false)}
        onSubmit={onUpdate}
        isPending={isPendingFeedback}
        setValue={setValue}
      />
      <ConfirmDialog
        title="Delete feedback"
        subtitle="Are you sure you want to delete this feedback"
        btnColor={colors.red}
        confirmButtonText="Delete"
        isSubmitting={isPending}
        isOpen={open}
        onCancel={() => setOpen(false)}
        setIsOpen={setOpen}
        onConfirm={onDelete}
      />
      <Card.Root bg={colors.white} color={colors.black} width="100%">
        <Card.Body gap="2">
          <FlexBox alignItems={'center'} gap={2}>
            <ProfileAvatar name={profile.name} imageUrl={profile.avatarUrl} />
            <Card.Title mt="2">{profile.name}</Card.Title>
          </FlexBox>

          <Card.Description>{feedbackText}</Card.Description>
        </Card.Body>
        {isFeedbackOwner && (
          <Card.Footer justifyContent="flex-end">
            <Button
              variant="outline"
              disabled={isPending}
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              color={colors.red}
              disabled={isPending}
              loading={isPending}
              loadingText="Deleting..."
              onClick={() => setOpen(true)}
            >
              Delete
            </Button>
          </Card.Footer>
        )}
      </Card.Root>
    </>
  );
};
