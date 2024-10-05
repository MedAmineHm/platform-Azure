import React, { useState } from "react";
import { Modal, TextInput, Button } from "@mantine/core";

export function ProjectForm({ opened, onClose, onSave }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (name && description) {
      onSave({ name, description });
      setName("");
      setDescription("");
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Create New Project">
      <TextInput
        label="Name"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        required
      />
      <TextInput
        label="Description"
        value={description}
        onChange={(event) => setDescription(event.currentTarget.value)}
        required
      />
      <Button onClick={handleSave} style={{ marginTop: "20px" }}>
        Save
      </Button>
    </Modal>
  );
}
