import { FlexBox } from '@/components/custom/flex-box';
import { CustomText } from '@/components/custom/title';
import { ProfileAvatar } from '@/components/ui/profile-avatar';
import { colors } from '@/constants';
import { FeedbackWithProfile } from '@/types';
import { Button, Card } from '@chakra-ui/react';
import React from 'react';

type Props = {
  feedback: FeedbackWithProfile;
  loggedInUser: string;
};

export const FeedbackCards = ({ feedback, loggedInUser }: Props) => {
  const { feedback: feedbackText, profile, profileId } = feedback;

  const isFeedbackOwner = loggedInUser === profile.$id;
  return (
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
          <Button variant="outline">Edit</Button>
          <Button variant="outline" color={colors.red}>
            Delete
          </Button>
        </Card.Footer>
      )}
    </Card.Root>
  );
};
