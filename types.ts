
export type Category = 'Science' | 'Art & Literature' | 'Politics' | 'Entertainment';

export interface Personality {
  id: number;
  name: string;
  era: string;
  category: Category;
  imageUrl: string;
}
