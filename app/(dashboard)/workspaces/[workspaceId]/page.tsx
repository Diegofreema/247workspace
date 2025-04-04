import { getLoggedInUser } from '@/features/auth/actions';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getLoggedInUser();

  if (!user) redirect('/sign-in');

  return (
    <div className="">
      <p className="text-white">Home</p>
    </div>
  );
}
