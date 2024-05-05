import {
  Avatar,
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Text,
} from '@radix-ui/themes'
import React from 'react'

export default async function ProjectsPage() {
  const res = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetProjects {
          projects {
            id
            kind
            name
            environment
            description
            createdAt
            updatedAt
            user {
              id
              email
            }
          }
        }
      `,
    }),
  }).then((res) => res.json())

  return (
    <Section>
      <Container>
        <Box style={{ maxWidth: '240px' }}>
          <Card>
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src="https://github.com/mokatecnologia.png"
                radius="full"
                fallback="T"
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  John Doe
                </Text>
                <Text as="div" size="2" color="gray">
                  moka@moka.com
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
        <h1>Login Page</h1>
        <Grid columns="3" gap="3" width="auto">
          {res.data.projects.map((project: any) => (
            <Card key={project.id} style={{ marginBottom: '.5em', minWidth: '33%' }}>
              <Flex direction="row" justify="between" mb="4">
                <Heading>{project.name}</Heading>
                <Badge>{project.kind}</Badge>
                <Badge>{project.environment}</Badge>
              </Flex>

              <Card variant="ghost">
                <pre style={{ fontSize: 10 }}>{JSON.stringify({ ...project }, null, 2)}</pre>
              </Card>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
