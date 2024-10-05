import React from "react";
import { Box, Text, Group } from "@mantine/core";

import classes from "./styles.module.css";

const PresentationList = ({ services = [] }) => {
  const onDragStart = (event, service) => {
    event.dataTransfer.setData("application/reactflow", service.type);
    event.dataTransfer.setData("serviceId", service.id);
    event.dataTransfer.setData("label", service.label || service.id);
    event.dataTransfer.setData("width", service.dimensions?.width || 100);
    event.dataTransfer.setData("height", service.dimensions?.height || 130);
    event.dataTransfer.setData("serviceType", service?.serviceType || "node");
    event.dataTransfer.setData("zIndex", service?.zIndex || 1);
    event.dataTransfer.setData(
      "backgroundColor",
      service.backgroundColor || "none"
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box className={classes.listContainer}>
      {services.map((service) => (
        <Box
          draggable
          key={service.id}
          className={classes.listService}
          onDragStart={(event) => onDragStart(event, service)}
        >
          <Group>
            <service.icon className={classes.serviceIcon} />
            <Text>{service.label}</Text>
          </Group>

          {service?.serviceType === "group" && (
            <span className={classes.groupNotif}>GROUP</span>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default PresentationList;
