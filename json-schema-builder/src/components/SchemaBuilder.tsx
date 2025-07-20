// src/components/SchemaBuilder.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import FieldRow from "./FieldRow";

export type FieldType = "string" | "number" | "nested";

export type SchemaField = {
  id: string;
  key: string;
  type: FieldType;
  children?: SchemaField[];
};

export default function SchemaBuilder() {
  const [fields, setFields] = useState<SchemaField[]>([]);

  const handleFieldChange = (id: string, updated: SchemaField) => {
    setFields(fields.map(f => f.id === id ? updated : f));
  };

  const handleDelete = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const addField = () => {
    setFields([...fields, {
      id: uuidv4(),
      key: "",
      type: "string",
    }]);
  };

  const buildJSON = (fields: SchemaField[]) => {
    const obj: Record<string, any> = {};
    for (const f of fields) {
      if (!f.key) continue;
      obj[f.key] = f.type === "nested"
        ? buildJSON(f.children || [])
        : f.type === "string" ? "string" : 0;
    }
    return obj;
  };

  return (
    <div className="p-4 space-y-4">
      {fields.map(field => (
        <FieldRow
          key={field.id}
          field={field}
          onChange={updated => handleFieldChange(field.id, updated)}
          onDelete={() => handleDelete(field.id)}
        />
      ))}
      <Button onClick={addField}>Add Field</Button>

      <div className="mt-6 p-4 border rounded-md bg-gray-100">
        <h3 className="font-semibold mb-2">JSON Output:</h3>
        <pre className="text-sm">{JSON.stringify(buildJSON(fields), null, 2)}</pre>
      </div>
    </div>
  );
}
