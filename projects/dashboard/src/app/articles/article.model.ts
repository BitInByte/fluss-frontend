import { Category } from '../categories/category.model';

export class Article {
  id: string;
  title: string;
  description: string;
  cssCode: string;
  cssDesc: string;
  cssLink: string;
  flutterCode: string;
  flutterDesc: string;
  flutterLink: string;
  previewImg?: string;
  createdAt: Date;
  updatedAt: Date;
  categories: Category[];

  constructor(
    id: string,
    title: string,
    description: string,
    cssCode: string,
    cssDesc: string,
    cssLink: string,
    flutterCode: string,
    flutterDesc: string,
    flutterLink: string,
    createdAt: Date,
    updatedAt: Date,
    categories: Category[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.cssCode = cssCode;
    this.cssDesc = cssDesc;
    this.cssLink = cssLink;
    this.flutterCode = flutterCode;
    this.flutterDesc = flutterDesc;
    this.flutterLink = flutterLink;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.categories = categories;
  }
}
