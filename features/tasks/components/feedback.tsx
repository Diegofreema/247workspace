import { CreateButton } from '@/components/buttons/create-button';
import { FlexBox } from '@/components/custom/flex-box';
import { CustomText } from '@/components/custom/title';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { colors } from '@/constants';
import { FeedbackCards } from '@/features/feedbacks/components/feedback-card';
import { useTaskId } from '@/hooks/use-task-id';
import { useCreateFeedbackController } from '@/lib/nuqs/use-create-feedback-controller';
import { FeedbackWithProfile } from '@/types';
import { For, SimpleGrid } from '@chakra-ui/react';
import { Plus } from 'lucide-react';

type Props = {
  feedbacks: FeedbackWithProfile[];
  loggedInUser: string;
};

export const Feedbacks = ({ feedbacks, loggedInUser }: Props) => {
  const taskId = useTaskId();
  const { open } = useCreateFeedbackController();

  return (
    <div className="mt-6">
      <FlexBox alignItems={'center'} justifyContent={'space-between'}>
        <Heading
          title="Feedbacks"
          subTitle="View all feedbacks for this tasks"
        />
        <CreateButton
          text="Add feedback"
          onClick={() => open(taskId)}
          icon={<Plus color={colors.white} />}
          width={'fit'}
        />
      </FlexBox>
      <Separator className="my-5" />
      {feedbacks.length === 0 && (
        <CustomText className="text-black text-center font-bold text-xl">
          No feedbacks found
        </CustomText>
      )}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={{ base: 5, md: 10 }}>
        <For each={feedbacks}>
          {(feedback) => (
            <FeedbackCards
              key={feedback.$id}
              feedback={feedback}
              loggedInUser={loggedInUser}
            />
          )}
        </For>
      </SimpleGrid>
    </div>
  );
};
