import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  MiniMap,
  Background,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  useReactFlow,
  MarkerType,
} from "reactflow";
import { clone, find, findIndex, findLastIndex, insert, propEq } from "ramda";
import debounce from "lodash.debounce";
import { useDisclosure } from "@mantine/hooks";

import "reactflow/dist/style.css";
import ResourceGroupNode from "./NodeTypes/ResourceGroupNode";
import LocationNode from "./NodeTypes/LocationNode";
import VnetNode from "./NodeTypes/VnetNode";
import SubnetNode from "./NodeTypes/SubnetNode";
import VmNode from "./NodeTypes/VmNode";
import DiscNode from "./NodeTypes/DiscNode";
import NsgNode from "./NodeTypes/NsgNode";
import NetworkInterfaceNode from "./NodeTypes/NetworkInterfaceNode";
import PublicIpNode from "./NodeTypes/PublicIpNode";
import DeleteModal from "../DeleteModal";
import ConfigModal from "../ConfigModal";
import { getNodeInitValues } from "../../utils/drawBoard";
import { getNodeValues } from "../../utils/nodeConfigForm";

const nodeTypes = {
  ResourceGroupNode,
  LocationNode,
  VnetNode,
  SubnetNode,
  VmNode,
  DiscNode,
  NsgNode,
  PublicIpNode,
  NetworkInterfaceNode,
};

let id = 0;
const getId = (serviceId = "dndnode") => `${serviceId}_${id++}`;

const DrawBoard = ({
  nodes,
  setNodes,
  onNodesChange,
  edges,
  setEdges,
  onEdgesChange,
}) => {
  const [deleteOpened, { open: deleteOpen, close: deleteClose }] =
    useDisclosure(false);

  const [configOpened, { open: configOpen, close: configClose }] =
    useDisclosure(false);

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { getIntersectingNodes } = useReactFlow();
  const [lastDropedNode, setLastDropedNode] = useState();
  const [selectedNode, setSelectedNode] = useState();

  // ======================== Edge Connect ==========================================
  const onConnect = useCallback(
    (params) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 10,
              height: 10,
              color: "#FF0072",
            },
            style: {
              strokeWidth: 2,
              stroke: "#FF0072",
            },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  // =========================== Node Drag Over ====================================
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // ============================== Node Action ====================================
  // delete:
  const handleDeleteNode = (node) => {
    setSelectedNode(node);
    deleteOpen();
  };

  const handleCancelDelete = () => {
    setSelectedNode();
    deleteClose();
  };

  const handleConfirmDeleteNode = () => {
    reactFlowInstance.deleteElements({ nodes: [selectedNode] });
    setSelectedNode();
    deleteClose();
  };

  // config:
  const handleConfigNode = (node) => {
    setSelectedNode(node);
    configOpen();
  };

  const handleCancelConfig = () => {
    setSelectedNode();
    configClose();
  };

  const handleConfirmConfigNode = (nodeDataValues) => {
    const newNode = clone(selectedNode);
    newNode.data.values = getNodeValues(nodeDataValues, newNode.type);
    const selectedNodeIndex = findIndex(propEq(selectedNode.id, "id"))(nodes);
    const newNodes = clone(nodes);
    newNodes[selectedNodeIndex] = newNode;
    setNodes(newNodes);
    setSelectedNode();
    configClose();
  };

  // ============================ Node Drop ========================================
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      const serviceId = event.dataTransfer.getData("serviceId");
      const label = event.dataTransfer.getData("label");
      const width = event.dataTransfer.getData("width");
      const height = event.dataTransfer.getData("height");
      const backgroundColor = event.dataTransfer.getData("backgroundColor");
      const serviceType = event.dataTransfer.getData("serviceType");
      const zIndex = event.dataTransfer.getData("zIndex");

      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(serviceId),
        type,
        position,
        label,
        serviceType,
        zIndex,
        data: {
          values: getNodeInitValues(type),
          actions: {
            onDeleteNode: (nodeId) => handleDeleteNode(nodeId),
            onConfigNode: (nodeId) => handleConfigNode(nodeId),
          },
        },
        style: {
          backgroundColor: `${backgroundColor}20`,
          border: `1px ${serviceType === "group" ? "dotted" : "solid"} black`,
          fontSize: 12,
          width: parseInt(width),
          height: parseInt(height),
        },
      };

      setNodes((nds) => {
        if (serviceType === "node") {
          return nds.concat(newNode);
        } else if (serviceType === "group") {
          const lastGroupIndex = findLastIndex(propEq("group", "serviceType"))(
            nds
          );
          const index = lastGroupIndex < 0 ? 0 : lastGroupIndex + 1;
          return insert(index, newNode, nds);
        }
      });

      setLastDropedNode(newNode);
    },
    [reactFlowInstance, setLastDropedNode]
  );

  // =================================== Node Delete =========================================
  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );

  // ====================================== Node Drag ========================================
  const updateNodeParent = (node, parentIntersection) => {
    if (parentIntersection) {
      setNodes((nodes = []) => {
        return nodes.map((n) => {
          if (n.id === node.id && n?.parentId !== parentIntersection) {
            return {
              ...n,
              parentId: parentIntersection,
              position: { x: 20, y: 30 },
            };
          }
          return n;
        });
      });
    } else {
      setNodes((nodes = []) => {
        return nodes.map((n) => {
          if (n.id === node.id) {
            delete n?.parentId;
            if (n?.positionAbsolute) {
              n.position = n?.positionAbsolute;
            }
          }
          return n;
        });
      });
    }
  };

  const addNodeToParent = (node, intersections) => {
    switch (node.type) {
      case "LocationNode":
        // console.log("location do nothing");
        break;
      case "ResourceGroupNode":
        // find a locationNode
        const parentLocationIntersection = find(
          (inter) => inter.startsWith("location"),
          intersections
        );
        updateNodeParent(node, parentLocationIntersection);
        break;
      case "VnetNode":
        // find a ResourceGroupNode
        const parentResourceIntersection = find(
          (inter) => inter.startsWith("ressourcegroup"),
          intersections
        );
        updateNodeParent(node, parentResourceIntersection);
        break;
      case "SubnetNode":
        // find a VnetNode
        const parentVnetIntersection = find(
          (inter) => inter.startsWith("vnet"),
          intersections
        );
        updateNodeParent(node, parentVnetIntersection);
        break;
      case "PublicIpNode":
        // find a ResourceGroupNode
        const parentResourceForIpIntersection = find(
          (inter) => inter.startsWith("ressourcegroup"),
          intersections
        );
        updateNodeParent(node, parentResourceForIpIntersection);
        break;
      case "NsgNode":
      case "VmNode":
      case "DiscNode":
      case "NetworkInterfaceNode":
        // find a SubnetNode
        const parentIntersection = find(
          (inter) => inter?.startsWith("subnet"),
          intersections
        );
        updateNodeParent(node, parentIntersection);
        break;
    }
  };

  const onNodeDragStop = useCallback(
    debounce((event, node) => {
      event.preventDefault();
      const intersections = getIntersectingNodes(node).map((n) => n.id);
      addNodeToParent(node, intersections);
    }, 300),
    [reactFlowInstance]
  );

  useEffect(() => {
    if (lastDropedNode) {
      const intersections = getIntersectingNodes(lastDropedNode).map(
        (n) => n.id
      );
      addNodeToParent(lastDropedNode, intersections);
      setLastDropedNode();
    }
  }, [lastDropedNode]);

  return (
    <div
      ref={reactFlowWrapper}
      style={{
        width: "100%",
        height: "calc(100vh - 100px)",
        paddingRight: 10,
        borderRight: "1px solid #00000030",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        onNodesDelete={onNodesDelete}
        nodeTypes={nodeTypes}
        onNodeDragStop={onNodeDragStop}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>

      {deleteOpened && (
        <DeleteModal
          opened={deleteOpened}
          close={handleCancelDelete}
          selectedNode={selectedNode}
          onConfirm={handleConfirmDeleteNode}
        />
      )}

      {configOpened && (
        <ConfigModal
          opened={configOpened}
          close={handleCancelConfig}
          selectedNode={clone(selectedNode)}
          onConfirm={handleConfirmConfigNode}
          nodes={nodes}
        />
      )}
    </div>
  );
};

export default DrawBoard;
