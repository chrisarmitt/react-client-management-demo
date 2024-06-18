export interface Client {
  name: string;
  dob: Date | null;
  primary_language: string;
  secondary_language?: string;
  funding_source?: number;
}
