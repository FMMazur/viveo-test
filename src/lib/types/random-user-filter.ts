import { GenderType } from "@/lib/utils/gender";

export interface RandomUserFilter {
  gender: GenderType;
  age: {
    min?: number;
    max?: number;
  } | number;
}