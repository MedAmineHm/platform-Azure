import React from "react";
import { ScrollArea, Accordion } from "@mantine/core";
import {
  IconContainer,
  IconMapPin,
  IconPropeller,
  IconNetwork,
  IconCloudComputing,
  IconServer,
  IconDatabase,
  IconAddressBook,
  IconUsersGroup,
  IconSubtask,
  IconAccessPoint,
} from "@tabler/icons-react";

import classes from "./styles.module.css";
import PresentationList from "./Presentations/List";

const servicesMock = [
  {
    id: "container",
    label: "Container",
    description: "",
    icon: IconContainer,
    services: [
      {
        id: "location",
        label: "Location",
        description: "",
        icon: IconMapPin,
        type: "LocationNode",
        backgroundColor: "#3c8fb0",
        dimensions: {
          width: 1150,
          height: 1000,
        },
        serviceType: "group",
        zIndex: 1,
      },
      {
        id: "ressourcegroup",
        label: "Ressource Group",
        description: "",
        icon: IconPropeller,
        type: "ResourceGroupNode",
        backgroundColor: "#b06e3c",
        dimensions: {
          width: 1100,
          height: 940,
        },
        serviceType: "group",
        zIndex: 2,
      },
    ],
  },
  {
    id: "compute",
    label: "Compute",
    description: "",
    icon: IconCloudComputing,
    services: [
      {
        id: "vm",
        label: "Virtual Machine",
        description: "",
        icon: IconServer,
        type: "VmNode",
        serviceType: "node",
        zIndex: 5,
        dimensions: {
          width: 170,
          height: 230,
        },
      },
      {
        id: "disc",
        label: "Disc",
        description: "",
        icon: IconDatabase,
        type: "DiscNode",
        serviceType: "node",
        zIndex: 5,
        dimensions: {
          width: 170,
          height: 230,
        },
      },
    ],
  },
  {
    id: "network",
    label: "Network",
    description: "",
    presentation: "grid",
    icon: IconNetwork,
    services: [
      {
        id: "vnet",
        label: "Virtual network(vnet)",
        description: "",
        icon: IconNetwork,
        type: "VnetNode",
        serviceType: "group",
        backgroundColor: "#2CC8A4",
        zIndex: 3,
        dimensions: {
          width: 800,
          height: 880,
        },
      },
      {
        id: "subnet",
        label: "Subnet",
        description: "",
        icon: IconSubtask,
        type: "SubnetNode",
        serviceType: "group",
        zIndex: 4,
        backgroundColor: "#e0d236",
        dimensions: {
          width: 750,
          height: 820,
        },
      },
      {
        id: "publicIp",
        label: "Public Ip",
        description: "",
        icon: IconAddressBook,
        type: "PublicIpNode",
        serviceType: "node",
        zIndex: 5,
        dimensions: {
          width: 170,
          height: 230,
        },
      },
      // {
      //   id: "nsg",
      //   label: " Network Security Group",
      //   description: "",
      //   icon: IconUsersGroup,
      //   type: "NsgNode",
      //   serviceType: "node",
      //   zIndex: 5,
      //   dimensions: {
      //     width: 170,
      //     height: 230,
      //   },
      // },
      {
        id: "networkInterface",
        label: " Network Interface",
        description: "",
        icon: IconAccessPoint,
        type: "NetworkInterfaceNode",
        serviceType: "node",
        zIndex: 5,
        dimensions: {
          width: 170,
          height: 230,
        },
      },
    ],
  },
];

const BoardNavbar = () => {
  const services = servicesMock.map((item) => (
    <Accordion.Item key={item.id} value={item.id}>
      <Accordion.Control icon={<item.icon />}>{item?.label}</Accordion.Control>
      <Accordion.Panel>
        <PresentationList services={item?.services} />
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.servicesGroup}>
        <Accordion variant="separated" radius="lg" defaultValue="container">
          {services}
        </Accordion>
      </ScrollArea>

      <div className={classes.footer}>
        <p style={{ opacity: 0.4 }}>@copyright 2024</p>
      </div>
    </nav>
  );
};

export default BoardNavbar;
