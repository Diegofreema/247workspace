import { CreateButton } from '@/components/buttons/create-button';
import { FlexBox } from '@/components/custom/flex-box';
import { EmptyUi } from '@/components/ui/empty-ui';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { colors } from '@/constants';
import { FeedbackCards } from '@/features/feedbacks/components/feedback-card';
import { FeedbackWithProfile } from '@/types';
import { For, SimpleGrid } from '@chakra-ui/react';
import { Plus } from 'lucide-react';

type Props = {
  feedbacks: FeedbackWithProfile[];
};

export const Feedbacks = ({ feedbacks }: Props) => {
  return (
    <div className="mt-6">
      <FlexBox alignItems={'center'} justifyContent={'space-between'}>
        <Heading
          title="Feedbacks"
          subTitle="View all feedbacks for this tasks"
        />
        <CreateButton
          text="Add feedback"
          onClick={() => {}}
          icon={<Plus color={colors.white} />}
          width={'fit'}
        />
      </FlexBox>
      <Separator className="my-5" />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={{ base: 5, md: 10 }}>
        <For each={feedbacks} fallback={<EmptyUi text="No feedbacks found" />}>
          {(feedback) => (
            <FeedbackCards key={feedback.$id} feedback={feedback} />
          )}
        </For>
      </SimpleGrid>
    </div>
  );
};
