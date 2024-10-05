import React from "react";
import { Box, Button, Group, Loader } from "@mantine/core";
import { Editor } from "@monaco-editor/react";
import { createAndDownloadFile } from "../../../utils/download";

const CodeTab = ({ code, isLoading, isError }) => {
  const downloadFile = () => {
    createAndDownloadFile("main.tf", code);
  };

  return (
    <Box>
      <Group justify="space-between">
        <Button
          onClick={downloadFile}
          color="pink"
          variant="outline"
          size="xs"
          style={{ marginBottom: 10 }}
          disabled={isLoading || isError}
        >
          Download
        </Button>

        <Box style={{ marginTop: -10, paddingRight: 10 }}>
          {isLoading && <Loader color="cyan" size="sm" type="dots" />}
        </Box>
      </Group>

      <Editor
        theme="vs-dark"
        height={"calc(100vh - 190px)"}
        defaultLanguage={"hcl"}
        value={code}
        options={{
          readOnly: true,
          fontSize: "12px",
          minimap: {
            enabled: false,
          },
        }}
      />
    </Box>
  );
};

export default CodeTab;
