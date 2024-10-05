import React, { useState } from "react";
import { Card, Image, Text, Button, Group, Badge } from "@mantine/core";

// Define the keyframes for the flashing animation
const flashAnimation = `
  @keyframes flash {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

export function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <style>{flashAnimation}</style>
      <Card
        shadow={isHovered ? "xl" : "sm"}
        padding="sm"
        withBorder
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transition: "all 0.3s ease",
          transform: isHovered ? "scale(1.05)" : "scale(1.0)",
          backgroundColor: isHovered ? "#f0f0f0" : "white",
          borderRadius: "15px",
          boxShadow: isHovered
            ? "0 10px 10px rgba(0, 0, 0, 0.2)"
            : "0 2px 5px rgba(0, 0, 0, 0.1)",
          width: "250px",
        }}
      >
        <Card.Section style={{ marginTop: "5px" }}>
          <Image
            src={project.image}
            height={180}
            alt={project.description}
            radius="md"
          />
        </Card.Section>
        <Group position="apart" style={{ marginBottom: 5, marginTop: "sm" }}>
          <Text weight={500}>{project.description}</Text>
          <Text size="sm" color="dimmed">
            {project.date}
          </Text>
          {project.status === "Done" ? (
            <Group spacing="xs" align="center">
              <Badge color="green" size="xs" circle></Badge>
              <Text size="xs" color="green">
                Done
              </Text>
            </Group>
          ) : (
            <Group spacing="xs" align="center">
              <Badge
                color="yellow"
                size="xs"
                circle
                style={{ animation: "flash 3s infinite" }}
              ></Badge>
              <Text size="xs" color="yellow">
                In progress
              </Text>
            </Group>
          )}
        </Group>
        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          component="a"
          href={project.link}
        >
          View Project
        </Button>
      </Card>
    </div>
  );
}
