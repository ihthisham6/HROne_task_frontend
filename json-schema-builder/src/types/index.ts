export type FieldType = 'text' | 'textarea' | 'select';

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  options?: string[];
}
