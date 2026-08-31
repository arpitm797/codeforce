"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";

const starterCode = {
  javascript: "// Write your JavaScript solution here",
  python: "# Write your Python solution here",
  cpp: "// Write your C++ solution here",
};
type CodeEditorProps = {
  problemId: number;
};

export default function CodeEditor({
  problemId,
}: CodeEditorProps) {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(starterCode.javascript);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function handleLanguageChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newLanguage = event.target.value;

    setLanguage(newLanguage);

    setCode(
      starterCode[newLanguage as keyof typeof starterCode]
    );

    setOutput("");
  }

  async function handleRun() {
    try {
      setOutput("Running...");

      const response = await fetch("/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          code,
          input,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setOutput(data.error || "Something went wrong");
        return;
      }

      setOutput(data.output || "No output");
    } catch (error) {
      console.error(error);
      setOutput("Failed to connect to the server");
    }
  }
  async function handleSubmit() {
  try {
    setOutput("Submitting...");

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        problemId: problemId,
        language,
        code,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setOutput(data.error || "Submission failed");
      return;
    }

    setOutput(data.status);
  } catch (error) {
    console.error(error);
    setOutput("Failed to submit code");
  }
}

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b bg-gray-100 p-3">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="rounded border bg-white px-3 py-2 text-sm"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={handleRun}
            className="rounded bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Run Code
          </button>

          <button
            onClick={handleSubmit}
            className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <Editor
        height="450px"
        language={language === "cpp" ? "cpp" : language}
        value={code}
        onChange={(value) => setCode(value ?? "")}
        theme="vs-dark"
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 14,
        }}
      />

      {/* Input */}
      <div className="border-t p-4">
        <h3 className="text-sm font-semibold">
          Custom Input
        </h3>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input for your program..."
          className="mt-2 h-24 w-full rounded border p-3 font-mono text-sm outline-none focus:ring-2"
        />
      </div>

      {/* Output */}
      <div className="border-t bg-gray-50 p-4">
        <h3 className="text-sm font-semibold">
          Output
        </h3>

        <pre className="mt-2 min-h-12 whitespace-pre-wrap font-mono text-sm text-gray-700">
          {output || "Run your code to see the output."}
        </pre>
      </div>
    </div>
  );
}