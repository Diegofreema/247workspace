import { ActionBar, Button, ConditionalValue, Portal } from '@chakra-ui/react';
import { IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { IconType } from 'react-icons/lib';

type Props = {
  title: string;
  isPending: boolean;
  icon: IconType;
  colorPalette?:
    | ConditionalValue<
        | 'border'
        | 'bg'
        | 'current'
        | 'transparent'
        | 'black'
        | 'white'
        | 'whiteAlpha'
        | 'blackAlpha'
        | 'gray'
        | 'red'
        | 'orange'
        | 'yellow'
        | 'green'
        | 'teal'
        | 'blue'
        | 'cyan'
        | 'purple'
        | 'pink'
        | 'fg'
        | `var(--${string})`
      >
    | undefined;
};

export const useConfirm = ({
  title,
  isPending,
  icon: Icon,
}: Props): [() => JSX.Element, () => Promise<any>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
    window.location.reload;
  };
  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
    window.location.reload;
  };
  const ConfirmDialog = () => {
    return (
      <ActionBar.Root
        open={promise !== null}
        onOpenChange={(e) => promise?.resolve(e.open)}
      >
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <IconX />
                Cancel
              </Button>
              <Button
                px={2}
                size="sm"
                variant="outline"
                onClick={handleConfirm}
                disabled={isPending}
              >
                <Icon />
                {title}
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    );
  };
  return [ConfirmDialog, confirm];
};
