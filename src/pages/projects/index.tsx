import { SimpleGrid } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react"
import { ProjectCard } from "../../components/projects/ProjectCard";
import { useProjectsQuery } from "../../generated/graphql";


const ProjectsView: React.FC<unknown> = (): JSX.Element => {
  const [{ data, error }] = useProjectsQuery();
  console.log(data);
  if (error) {
    console.error(error);
  }

  return (
    <SimpleGrid columns={[2, null, 3]} spacing="20px" maxBlockSize="fit-content">
      {data?.projects?.map((p) => {
        return <ProjectCard key={p.id} id={p.id} description={p.description} title={p.title} createdAt={p.createdAt} updatedAt={p.updatedAt} username={p.owner.username} image={p.image} profileImage={p.owner.image} ownerId={p.ownerId}>  </ProjectCard>
      })}
    </SimpleGrid>
  )
};

export default withUrqlClient(() => ({
  // ...add your Client options here
  url: 'https://server-seven-blue.vercel.app/graphql',
}))(ProjectsView);