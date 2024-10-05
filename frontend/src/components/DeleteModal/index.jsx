import React from "react";
import { Blockquote, Box, Button, Group, Modal, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

const DeleteModal = ({ opened, close, selectedNode, onConfirm }) => {
  const icon = <IconInfoCircle />;

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={`Delete: ${selectedNode?.data?.label}`}
      size="lg"
    >
      <Box>
        <Blockquote
          color="red"
          cite="NOTE – node will be delete permanently with children!"
          icon={icon}
          mt="xl"
          style={{ marginBottom: 30, marginLeft: 20, marginRight: 20 }}
        >
          <Text style={{ color: "red" }}>
            are you sure you want to delete this node?
          </Text>
        </Blockquote>

        <Group grow>
          <Button variant="filled" color="pink" onClick={close}>
            Cancel
          </Button>
          <Button variant="filled" color="violet" onClick={onConfirm}>
            Delete
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
