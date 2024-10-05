import React, { useEffect } from "react";
import { ReactFlowProvider, useEdgesState, useNodesState } from "reactflow";
import { Grid } from "@mantine/core";

import { useAzureLocationsStore } from "../../store";
import BoardContainer from "../../components/BoardContainer";
import DrawBoard from "../../components/DrawBoard";
import PreviewContainer from "../../components/PreviewContainer";

const initialNodes = [];
const initialEdges = [];

const TerraBoard = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { loadLocationsNames, isLocationsNamesLoading } =
    useAzureLocationsStore();

  useEffect(() => {
    loadLocationsNames();
  }, []);

  return (
    <ReactFlowProvider>
      <BoardContainer>
        <Grid>
          <Grid.Col span={7}>
            <DrawBoard
              nodes={nodes}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
              edges={edges}
              setEdges={setEdges}
              onEdgesChange={onEdgesChange}
            />
          </Grid.Col>
          <Grid.Col span={5}>
            <PreviewContainer nodes={nodes} edges={edges} />
          </Grid.Col>
        </Grid>
      </BoardContainer>
    </ReactFlowProvider>
  );
};

export default TerraBoard;
