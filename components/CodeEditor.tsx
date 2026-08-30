"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";

const starterCode = {
  javascript: "// Write your JavaScript solution here",
  python: "# Write your Python solution here",
  cpp: "// Write your C++ solution here",
};

export default function CodeEditor() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(starterCode.javascript);
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

  return (
    <div>
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

        <button
          onClick={handleRun}
          className="rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Run Code
        </button>
      </div>

      <Editor
        height="500px"
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

      <div className="border-t bg-gray-50 p-4">
        <h3 className="text-sm font-semibold">
          Output
        </h3>

        <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-700">
          {output || "Run your code to see the output."}
        </pre>
      </div>
    </div>
  );
}