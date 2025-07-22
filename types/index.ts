import { MouseEventHandler } from "react";

export interface CarProps {
  id: string;
  rate: number;
  category: string;
  name: string;
  seater: string;
  acRate: number;
  fuel: string;
  imageUrl: string;
}

export interface FilterProps {
  manufacturer?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuel?: string;
}

export interface HomeProps {
  searchParams: FilterProps;
}

export interface CarCardProps {
  model: string;
  make: string;
  mpg: number;
  transmission: string;
  year: number;
  drive: string;
  cityMPG: number;
}

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

export interface SearchManuFacturerProps {
  manufacturer: string;
  setManuFacturer: (manufacturer: string) => void;
}

export interface TravelPackage {
  id: string;
  org_id: string;
  title: string;
  slug: string;
  duration: string;
  start_location: string;
  end_location: string;
  route: string[] | null;
  short_description: string;
  full_description: string | null;
  itinerary: any;
  base_price: number | null;
  per_person_cost: number | null;
  include_gst: boolean;
  discount_percentage: number;
  inclusions: string[] | null;
  exclusions: string[] | null;
  thumbnail_image: string | null;
  gallery_images: string[] | null;
  cover_image: string | null;
  status: string | null;
  is_published: boolean;
  created_at: string | null;
  updated_at: string | null;
  featured?: boolean;
}
