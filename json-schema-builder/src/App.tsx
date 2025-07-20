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
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-10">JSON Schema Builder</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Schema Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <SchemaBuilder />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white shadow-lg overflow-auto max-h-[40vh]">
              <CardHeader>
                <CardTitle>JSON Output</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm bg-gray-50 p-4 rounded border overflow-x-auto whitespace-pre-wrap text-gray-800">
                  {JSON.stringify(jsonOutputData, null, 2)}
                </pre>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg overflow-auto max-h-[40vh]">
              <CardHeader>
                <CardTitle>Generated Schema</CardTitle>
              </CardHeader>
              <CardContent>
                <SchemaViewer schema={schemaData} />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6">
          <FileEditor onUpload={handleFileUpload} schema={jsonOutputData} />
        </div>
      </div>

      <footer className="mt-6 py-4 text-center text-gray-600 text-sm w-full">
        Made with <span role="img" aria-label="love">❤️</span> by Ihthisham.
      </footer>
    </FormProvider>
  );
}

export default App;