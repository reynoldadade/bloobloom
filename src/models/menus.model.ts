export default interface Menu {
  collection: string;
  categories: Category[];
}
export interface Category {
  name: string;
  url: string;
}
