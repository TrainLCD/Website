type Slug =
  | 'pronama'
  | 'born'
  | 'storeDebut'
  | 'appleWatch'
  | 'liveActivities'
  | 'android2k'
  | 'wearos';

export type AppHistory = {
  slug: Slug;
  heading: string;
  description: string;
  startDate: string;
  endDate: string;
};
