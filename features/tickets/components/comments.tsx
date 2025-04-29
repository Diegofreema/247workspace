'use client';

import { FlexBox } from '@/components/custom/flex-box';
import { colors } from '@/constants';
import { Card, IconButton, Textarea } from '@chakra-ui/react';
import { IconSend } from '@tabler/icons-react';
import { useState } from 'react';

type Props = {};

export const Comments = (props: Props) => {
  const [value, setValue] = useState('');
  return (
    <Card.Root width="100%" bg={colors.white}>
      <Card.Body gap="2">
        <Card.Title mt="2">Nue Camp</Card.Title>
        <Card.Description>
          This is the card body. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
          Curabitur nec odio vel dui euismod fermentum.
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <FlexBox
          flexDir={'column'}
          width="100%"
          border={'1px solid #ccc'}
          gap={2}
          p={3}
          borderRadius={5}
        >
          <Textarea
            rows={6}
            resize={'none'}
            placeholder="Add a comment.."
            focusRing={'none'}
          />
          <IconButton
            bg={colors.purple}
            className="hover:opacity-50 transition self-end"
            disabled={!value}
          >
            <IconSend color={colors.white} size={30} />
          </IconButton>
        </FlexBox>
      </Card.Footer>
    </Card.Root>
  );
};
