import { colors } from '@/constants';
import { Table } from '@chakra-ui/react';

export const MemberTable = () => {
  return (
    <Table.Root
      size="sm"
      bg={'transparent'}
      mt={5}
      variant={'outline'}
      borderWidth={0}
      borderColor={'transparent'}
    >
      <Table.Header bg={colors.milk}>
        <Table.Row>
          {header.map((item, i) => {
            const isLast = i === header.length - 1;
            return (
              <Table.ColumnHeader
                key={item}
                color={colors.black}
                fontWeight={'bold'}
                textAlign={isLast ? 'end' : 'start'}
              >
                {item}
              </Table.ColumnHeader>
            );
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.category}</Table.Cell>
            <Table.Cell textAlign="end">{item.price}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
const header = ['Member name', 'Email', 'Role', 'Access', 'Action'];

const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  { id: 2, name: 'Coffee Maker', category: 'Home Appliances', price: 49.99 },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 150.0 },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 799.99 },
  { id: 5, name: 'Headphones', category: 'Accessories', price: 199.99 },
];
