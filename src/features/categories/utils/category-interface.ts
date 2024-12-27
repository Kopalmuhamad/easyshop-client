export interface ICategory {
  _id: string;
  name: string;
  image: string;
}

export interface ICategoryResponse {
  message: string;
  data: ICategory[];
}
