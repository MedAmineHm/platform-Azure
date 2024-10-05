import React, { memo, useMemo } from "react";
import { Handle, Position, useNodes } from "reactflow";
import { Button, Image } from "@mantine/core";
import { find } from "ramda";
import { inNodeStyles } from "../../../utils/nodeStyles";

const vmImg = require("../../../assets/img/disk.png");

const DiscNode = ({ data, selected = false, id }) => {
  const { actions } = data;
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
          {data.values.name || "Disc"}
        </p>

        <p
          style={{
            opacity: 0.5,
            marginTop: -12,
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Disc
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
        type="target"
        position={Position.Top}
        id="in1"
        isConnectable={true}
        style={inNodeStyles}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="in2"
        isConnectable={true}
        style={inNodeStyles}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="in3"
        isConnectable={true}
        style={inNodeStyles}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="in4"
        isConnectable={true}
        style={inNodeStyles}
      />
    </>
  );
};

export default memo(DiscNode);
