import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  Text,
  TextInput,
  Select,
  Modal,
  Button,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ProjectCard } from "./ProjectCard";
import { RiAddCircleLine } from "react-icons/ri";
import { CgSearch } from "react-icons/cg";
import { CiFilter } from "react-icons/ci";
import { ProjectForm } from "./ProjectForm";

const url_exp =
  "https://www.researchgate.net/profile/Rubiela-Carrillo/publication/318974364/figure/fig3/AS:633794038071296@1528119682065/Software-architecture-of-the-visualization-dashboard.png";

const initialProjects = [
  {
    id: 1,
    image: url_exp,
    description: "Project 1 Description",
    date: "2024-01-01",
    status: "Done",
    link: "/project/1",
  },
  {
    id: 2,
    image: url_exp,
    description: "Project 2 Description",
    date: "2024-01-02",
    status: "In progress",
    link: "/project/2",
  },
  {
    id: 3,
    image: url_exp,
    description: "Project 3 Description",
    date: "2024-01-03",
    status: "Done",
    link: "/project/3",
  },
  {
    id: 4,
    image: url_exp,
    description: "Project 4 Description",
    date: "2024-01-04",
    status: "In progress",
    link: "/project/4",
  },
  {
    id: 5,
    image: url_exp,
    description: "Project 5 Description",
    date: "2024-01-05",
    status: "In progress",
    link: "/project/5",
  },
  {
    id: 6,
    image: url_exp,
    description: "Project 6 Description",
    date: "2024-01-06",
    status: "In progress",
    link: "/project/6",
  },
  {
    id: 7,
    image: url_exp,
    description: "Project 7 Description",
    date: "2024-01-07",
    status: "Done",
    link: "/project/7",
  },
  {
    id: 8,
    image: url_exp,
    description: "Project 8 Description",
    date: "2024-01-08",
    status: "Done",
    link: "/project/8",
  },
  {
    id: 9,
    image: url_exp,
    description: "Project 9 Description",
    date: "2024-01-09",
    status: "In progress",
    link: "/project/9",
  },
  {
    id: 10,
    image: url_exp,
    description: "Project 10 Description",
    date: "2024-01-10",
    status: "Done",
    link: "/project/10",
  },
];

export function ProjectsHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [projects, setProjects] = useState(initialProjects);
  const [formOpened, setFormOpened] = useState(false);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusFilterChange = (value) => {
    if (value) setStatusFilter(value);
  };

  const handleCreateNewProject = () => {
    setFormOpened(true);
  };

  const handleSaveProject = (newProject) => {
    const id = projects.length + 1;
    const projectWithId = {
      ...newProject,
      id,
      image: url_exp,
      date: new Date().toISOString().split("T")[0], // setting current date
      status: "In progress", // assuming the new project starts as "In progress"
      link: `/project/${id}`,
    };
    setProjects([...projects, projectWithId]);
    setFormOpened(false);
  };

  return (
    <Container fluid style={{ padding: "10px", marginTop: "70px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <TextInput
          radius="lg"
          leftSection={<CgSearch size="18" />}
          placeholder="Search by project description"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          style={{
            width: "300px",
            marginRight: "20px",
          }}
        />
        <Select
          data={["All", "Done", "In progress"]}
          radius="lg"
          leftSection={<CiFilter size="18" />}
          checkIconPosition="right"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          dropdownalign="right"
          placeholder="Filter by status"
          style={{ width: "150px" }}
        />
      </div>
      <Grid gutter="xl">
        <Grid.Col span={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 2 }}>
          <Card
            shadow="sm"
            padding="lg"
            style={{
              textAlign: "center",
              alignItems: "center",
              cursor: "pointer",
              marginTop: "70px",
              marginBottom: "auto",
              width: "220px",
            }}
            onClick={handleCreateNewProject}
          >
            <RiAddCircleLine size={100} style={{ marginBottom: "10px" }} />
            <Text>Create new project</Text>
          </Card>
        </Grid.Col>
        {filteredProjects.map((project) => (
          <Grid.Col
            span={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 2 }}
            key={project.id}
          >
            <ProjectCard project={project} />
          </Grid.Col>
        ))}
      </Grid>
      <ProjectForm
        opened={formOpened}
        onClose={() => setFormOpened(false)}
        onSave={handleSaveProject}
      />
    </Container>
  );
}
