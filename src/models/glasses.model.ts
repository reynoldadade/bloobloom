export interface GlassesResponse {
  glasses: Glass[];
  meta: Meta;
}

export interface Glass {
  id: number;
  name: string;
  configuration_name: string;
  default_collection_name: null;
  cost_breakdown: CostBreakdown;
  glass_variants: GlassVariant[];
}

export interface CostBreakdown {
  id: number;
  materials: number;
  labour: number;
  transport: number;
  taxes: number;
  bloobloom_price: number;
  retail_price: number;
}

export interface GlassVariant {
  id: number;
  barcode: null;
  harmonized_system_code: null;
  stock_keeping_unit: null;
  inventory: boolean;
  home_trial_available: boolean;
  price: number;
  default_glass_variant: boolean;
  frame_variant: FrameVariant;
  media: Media[];
}

export interface FrameVariant {
  id: number;
  name: string;
  configuration_name: string;
  barcode: null;
  harmonized_system_code: null;
  stock_keeping_unit: null;
  status: Status;
  colour: Colour;
}

export interface Colour {
  id: number;
  name: string;
  media: Media[];
}

export interface Media {
  id: number;
  medium_type: MediumType;
  mime_type: MIMEType;
  file_location: FileLocation;
  file_name: string;
  original_file_name: string;
  size: number;
  url: string;
  position: number;
}

export enum FileLocation {
  Colours = "colours",
  GlassVariants = "glass_variants",
}

export enum MediumType {
  Colour = "colour",
  Image = "image",
}

export enum MIMEType {
  ImageJPEG = "image/jpeg",
  ImagePNG = "image/png",
}

export enum Status {
  Active = "active",
}

export interface Meta {
  total_count: number;
}
