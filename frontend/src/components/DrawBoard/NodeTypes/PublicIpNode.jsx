import React, { memo, useMemo } from "react";
import { Handle, Position, useNodes } from "reactflow";
import { Button, Grid, Group, Image } from "@mantine/core";
import { find } from "ramda";
import { outNodeStyles } from "../../../utils/nodeStyles";

const vmImg = require("../../../assets/img/publicIP.png");

const PublicIpNode = ({ data, selected = false, isConnectable, id }) => {
  const { forceToolbarVisible, toolbarPosition, actions } = data;
  const nodes = useNodes();
  const node = useMemo(() => find((n) => n.id === id, nodes), [nodes, id]);

  return (
    <>
      <div
        style={{
          padding: 10,
          height: 228,
          backgroundColor: selected ? "#4a9e65" : "#d1d1d1",
        }}
      >
        <Image src={vmImg} width={100} h={80} fit="contain" />
        <p
          style={{
            textAlign: "center",
            color: selected ? "#fff" : "#000",
            marginTop: 10,
            marginBottom: "10px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            fontSize: 16,
          }}
        >
          {data.values.name}
        </p>

        <p
          style={{
            opacity: 0.5,
            marginTop: -12,
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Public IP
        </p>

        <Button
          variant="filled"
          color="violet"
          size="xs"
          fullWidth
          style={{ marginTop: "-100px!important" }}
          onClick={() => actions.onConfigNode(node)}
        >
          Config
        </Button>
        <Button
          variant="filled"
          color="pink"
          size="xs"
          fullWidth
          style={{ marginTop: 5 }}
          onClick={() => actions.onDeleteNode(node)}
        >
          Delete
        </Button>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="in1"
        isConnectable={isConnectable}
        style={outNodeStyles}
      />

      <Handle
        type="source"
        position={Position.Left}
        id="in2"
        isConnectable={isConnectable}
        style={outNodeStyles}
      />

      <Handle
        type="source"
        position={Position.Top}
        id="in3"
        isConnectable={isConnectable}
        style={outNodeStyles}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="in4"
        isConnectable={isConnectable}
        style={outNodeStyles}
      />
    </>
  );
};

export default memo(PublicIpNode);
