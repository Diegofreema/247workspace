export const generateRandomString = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const snakeCaseToTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

type Profile = {
  name: string;
  avatarUrl?: string;
  bio?: string;
  role: string;
  email: string;
  phone?: string;
};

export const calculateProfileCompletion = (profile: Profile): number => {
  // Define field groups with their weights
  const fieldGroups = {
    personalInfo: {
      fields: ['role', 'email', 'phone', 'name'],
      weight: 0.6, // 60% of total score
    },
    avatar: {
      fields: ['avatarUrl'],
      weight: 0.2, // 20% of total score
    },
    bio: {
      fields: ['bio'],
      weight: 0.2, // 20% of total score
    },
  };

  let totalScore = 0;

  // Calculate completion for each group
  for (const [, group] of Object.entries(fieldGroups)) {
    const filledFields = group.fields.filter(
      (field) =>
        profile[field as keyof Profile] !== undefined &&
        profile[field as keyof Profile] !== '' &&
        profile[field as keyof Profile] !== null
    ).length;

    const groupCompletion = filledFields / group.fields.length;
    totalScore += groupCompletion * group.weight;
  }

  // Convert to percentage (0-100)
  return Math.round(totalScore * 100);
};
