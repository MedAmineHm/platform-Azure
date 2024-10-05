import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mantine/core";

import classes from "./styles.module.css";
import CodeTab from "./CodeTab";
import { useDebouncedState } from "@mantine/hooks";
import { useGenerateTerraformCode } from "../../hooks/TerraformCodeGenerator";
import { useTerraformCodeCost } from "../../hooks/TerraformCodeCost";
import CostTab from "./CostTab";

const PreviewContainer = ({ nodes, edges }) => {
  const [tab, setTab] = useState("code");
  const [boardNodes, setBoardNodes] = useDebouncedState([], 1000);
  const [boardEdges, setBoardEdges] = useDebouncedState([], 1000);
  const { terraformCode, isLoading, isError } = useGenerateTerraformCode(
    boardNodes,
    boardEdges
  );

  const {
    terraformCost,
    isError: isErrorCost,
    isLoading: isLoadingCost,
    refreshTerraformCost,
  } = useTerraformCodeCost(boardNodes, boardEdges);

  useEffect(() => {
    setBoardNodes(nodes);
  }, [nodes]);

  useEffect(() => {
    setBoardEdges(edges);
  }, [edges]);

  const isTabCode = tab === "code";
  const isTabCost = tab === "cost";

  return (
    <Box className={classes.container}>
      <Grid gutter="xs">
        <Grid.Col span={6}>
          <Button
            variant={isTabCode ? "filled" : "light"}
            size="xs"
            fullWidth
            onClick={() => setTab("code")}
          >
            CODE
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button
            variant={isTabCost ? "filled" : "light"}
            size="xs"
            fullWidth
            onClick={() => setTab("cost")}
          >
            COST
          </Button>
        </Grid.Col>
      </Grid>
      <Box className={classes.contentContainer}>
        {isTabCode && (
          <CodeTab
            code={terraformCode}
            isError={isError}
            isLoading={isLoading}
          />
        )}

        {isTabCost && (
          <CostTab
            terraformCost={terraformCost}
            isError={isErrorCost}
            isLoading={isLoadingCost}
            refreshTerraformCost={refreshTerraformCost}
          />
        )}
      </Box>
    </Box>
  );
};

export default PreviewContainer;
