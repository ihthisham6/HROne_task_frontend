import React from "react"; //

interface SchemaViewerProps { //
  schema: Record<string, any>; //
}

const SchemaViewer: React.FC<SchemaViewerProps> = ({ schema }) => { //
  return (
    <div className="bg-gray-900 text-white p-4 rounded-md mt-6 max-h-[300px] overflow-auto"> {/* */}
      <h2 className="text-lg font-bold mb-2">Generated Schema</h2> {/* */}
      <pre className="whitespace-pre-wrap text-sm"> {/* */}
        {JSON.stringify(schema, null, 2)} {/* */}
      </pre>
    </div>
  );
};

export default SchemaViewer; //