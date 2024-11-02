export interface newProjectDTO {
  id: number;
  title: string;
  description: string;
  link: string;
  images: Array<{ image_data: string }>;
}
