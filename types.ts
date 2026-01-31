
export interface MedicineInfo {
  medicineName: string;
  composition: string;
  uses: string[];
  sideEffects: string[];
  warnings: string[];
  otherDetails: string;
}

export interface AppState {
  loading: boolean;
  error: string | null;
  data: MedicineInfo | null;
}
