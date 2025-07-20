import React from "react";
import type { ChangeEvent } from "react";
import { Button } from "./ui/button";

interface FileEditorProps {
  onUpload: (schema: Record<string, any>) => void;
  schema: Record<string, any>;
}

const FileEditor: React.FC<FileEditorProps> = ({ onUpload, schema }) => {
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(schema, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schema.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        try {
          const parsed = JSON.parse(text);
          onUpload(parsed);
        } catch (error) {
          alert("Invalid JSON file.");
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center space-x-4 mt-4">

      <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
        Download Schema
      </Button>

     
      <label htmlFor="file-upload" className="cursor-pointer">
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <span className="cursor-pointer">Upload Schema</span>
        </Button>
        <input
          id="file-upload"
          type="file"
          accept=".json"
          onChange={handleUpload}
          className="hidden" // Keep the actual file input hidden
        />
      </label>
    </div>
  );
};

export default FileEditor;