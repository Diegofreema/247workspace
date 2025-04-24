'use server';

import { DATABASE_ID, PROFILE_ID } from '@/config';
import { createSessionClient } from '@/lib/appwrite';
import { Profile } from '@/types';
import { Query } from 'node-appwrite';

export const getLoggedInUser = async () => {
  try {
    const { account, databases } = await createSessionClient();

    const user = await account.get();
    const profiles = await databases.listDocuments<Profile>(
      DATABASE_ID,
      PROFILE_ID,
      [Query.equal('userId', user.$id)]
    );
    const profile = profiles.documents[0];

    return { profile, user };
  } catch (error) {
    console.log(error);

    return { profile: null, user: null };
  }
};
