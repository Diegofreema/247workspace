import { useQueryState } from 'nuqs';
import { useDebounce } from 'use-debounce';
export const useSearchFolder = () => {
  const [query, setQuery] = useQueryState('query', { defaultValue: '' });
  const [value] = useDebounce(query, 1000);

  const clearQuery = () => {
    setQuery('');
  };

  return { value, setQuery, clearQuery, query };
};
