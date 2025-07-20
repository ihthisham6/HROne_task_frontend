import type { FormField } from '../types';

export function generateJSONSchema(fields: FormField[]) {
  const properties: Record<string, any> = {};

  fields.forEach((field) => {
    if (field.type === 'select') {
      properties[field.label] = {
        type: 'string',
        enum: field.options || [],
      };
    } else {
      properties[field.label] = {
        type: 'string',
      };
    }
  });

  return {
    type: 'object',
    properties,
  };
}
