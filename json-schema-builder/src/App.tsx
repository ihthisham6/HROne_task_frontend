import { useForm, FormProvider } from "react-hook-form";
import SchemaBuilder from "./components/SchemaBuilder";
import SchemaViewer from "./components/SchemaViewer";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { useEffect } from "react";
import FileEditor from "./components/FileEditor";

function App() {
  const methods = useForm({
    defaultValues: {
      schema: {},
      jsonOutput: {},
    },
  });

  const schemaData = methods.watch("schema");
  const jsonOutputData = methods.watch("jsonOutput");

  useEffect(() => {
  }, [schemaData, jsonOutputData, methods]);

  const handleFileUpload = (uploadedSchema: Record<string, any>) => {
    console.log("Uploaded Schema:", uploadedSchema);
    alert("Upload functionality not fully integrated with builder state yet.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <FormProvider {...methods}>
        <div className="p-6 pb-0">
          <h1 className="text-3xl font-bold text-center mb-10">JSON Schema Builder</h1>
        </div>

        <div className="flex-1 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto min-h-[300px]">
            <Card className="bg-white shadow-lg flex flex-col min-h-[300px]">
              <CardHeader className="flex-shrink-0">
                <CardTitle>Schema Builder</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto p-6">
                <SchemaBuilder />
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg flex flex-col min-h-[300px]">
              <CardHeader className="flex-shrink-0">
                <CardTitle>JSON Output</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto p-6">
                <pre className="text-sm bg-gray-50 p-4 rounded border min-h-[200px] whitespace-pre-wrap text-gray-800">
                  {JSON.stringify(jsonOutputData, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-7xl mx-auto mt-6 pb-6">
            <FileEditor onUpload={handleFileUpload} schema={jsonOutputData} />
          </div>
        </div>
      </FormProvider>

      <footer className="py-4 text-center text-gray-600 text-sm bg-white border-t mt-auto">
        Made with <span role="img" aria-label="love">❤️</span> by Ihthisham.
      </footer>
    </div>
  );
}

export default App;