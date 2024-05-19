import { Avatar, Badge, Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { getProjects } from '../../../../components/get-totp'

export default async function ProjectsPage() {
  const res = await getProjects()

  return (
    <>
      <Flex justify="between" align="center" gap="3" mb="3">
        <h1>Projects</h1>
        <JohnDoeCard />
      </Flex>
      <Grid columns="3" gap="3" width="auto">
        {res.data.projects.map((project: Record<string, any>) => (
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
    </>
  )
}

function JohnDoeCard() {
  return (
    <Box style={{ minWidth: '180px' }}>
      <Card>
        <Flex gap="3" align="center">
          <Avatar size="3" src="https://github.com/mokatecnologia.png" radius="full" fallback="T" />
          <Box>
            <Text as="div" size="2" weight="bold">
              John Doe
            </Text>
            <Text as="div" color="gray" style={{ fontSize: 11 }}>
              john@doe.com
            </Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  )
}
