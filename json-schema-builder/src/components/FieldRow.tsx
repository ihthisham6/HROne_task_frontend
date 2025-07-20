
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import type { SchemaField } from "./SchemaBuilder";
import type { FieldType } from "./SchemaBuilder";

type Props = {
  field: SchemaField;
  onChange: (updated: SchemaField) => void;
  onDelete: () => void;
};

export default function FieldRow({ field, onChange, onDelete }: Props) {
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...field, key: e.target.value });
  };

  const handleTypeChange = (value: FieldType) => {
    if (value === "nested" && !field.children) {
      onChange({ ...field, type: value, children: [] });
    } else {
      onChange({ ...field, type: value, children: undefined });
    }
  };

  const addNestedField = () => {
    if (field.type !== "nested") return;
    const newChild: SchemaField = {
      id: crypto.randomUUID(),
      key: "",
      type: "string",
    };
    onChange({ ...field, children: [...(field.children || []), newChild] });
  };

  const updateNestedChild = (childId: string, updatedChild: SchemaField) => {
    if (!field.children) return;
    const updatedChildren = field.children.map(c => c.id === childId ? updatedChild : c);
    onChange({ ...field, children: updatedChildren });
  };

  const deleteNestedChild = (childId: string) => {
    if (!field.children) return;
    const updatedChildren = field.children.filter(c => c.id !== childId);
    onChange({ ...field, children: updatedChildren });
  };

  return (
    <div className="ml-4 mb-4 border p-3 rounded-md space-y-2">
      <div className="flex items-center gap-2">
        <Input value={field.key} onChange={handleKeyChange} placeholder="Field Key" />
        <Select value={field.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="string">String</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="nested">Nested</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="destructive" onClick={onDelete}>Delete</Button>
        {field.type === "nested" && (
          <Button onClick={addNestedField}>+ Nested Field</Button>
        )}
      </div>

      {field.type === "nested" && field.children?.map(child => (
        <FieldRow
          key={child.id}
          field={child}
          onChange={(updated) => updateNestedChild(child.id, updated)}
          onDelete={() => deleteNestedChild(child.id)}
        />
      ))}
    </div>
  );
}
