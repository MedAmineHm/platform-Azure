import React from "react";
import { Box, Button, Group, LoadingOverlay } from "@mantine/core";

import classes from "./styles.module.css";
import { createAndDownloadFile } from "../../../utils/download";

const CostTab = ({
  terraformCost,
  isError,
  isLoading,
  refreshTerraformCost,
}) => {
  const downloadFile = () => {
    createAndDownloadFile("cost.txt", terraformCost);
  };

  return (
    <Box pos="relative" style={{ minWidth: "100%" }}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 1 }}
      />

      <Group>
        <Button
          onClick={refreshTerraformCost}
          color="cyan"
          variant="outline"
          size="xs"
        >
          Calculate
        </Button>

        <Button
          onClick={downloadFile}
          color="pink"
          variant="outline"
          size="xs"
          disabled={!terraformCost || isError}
        >
          Download
        </Button>
      </Group>

      <pre className={classes.resultContainer}>{terraformCost}</pre>
    </Box>
  );
};

export default CostTab;
