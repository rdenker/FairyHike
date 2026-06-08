export interface Trail {
  id: string;
  name: string;
  region: string;
  description: string;
  facts: string[];
  distance: string;
  duration: string;
  difficulty: string;
  sunsetRating: number;
  latitude: number;
  longitude: number;
  imageColor: string;
}

export interface DateSelection {
  date: string;
  time: string;
  altDate?: string;
  altTime?: string;
}

export interface ResponseData {
  id: string;
  trailId: string;
  trailName: string;
  date: string;
  time: string;
  altDate?: string;
  altTime?: string;
  excitement: number;
  notes: string;
  submittedAt: string;
}
