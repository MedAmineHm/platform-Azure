import React from "react";
import { AppShell, Burger, Group, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import BoardNavbar from "../BoardNavbar";

const logoUrl =
  "https://arunpotti.files.wordpress.com/2021/12/microsoft_azure.svg_.png";

const BoardContainer = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image src={logoUrl} w={100} h={40} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <BoardNavbar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default BoardContainer;
