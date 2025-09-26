export type Item = { 
  id: string; 
  title: string; 
  w: number; 
  h: number; 
  url: string;
  type: 'image' | 'video';
  description?: string;
  subtitle?: string;
};
