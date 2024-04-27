import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Code,
  Grid,
  Heading,
  IconButton,
  Flex,
  Link,
  Separator,
  Text,
} from '@radix-ui/themes'

import TOTPPage from '../../components/totp'
import { CreateProjectButton } from '../../components/create-project-button'

const Home = async () => {
  return (
    <>
      {/* Nav */}
      <Box>
        <Flex justify="between" align="center" m="2">
          <Link size="4">c0dyslex1a</Link>
          <Flex gap="6" align="center">
            <Link size="2" color="gray">
              login
            </Link>
            <Link size="2" color="gray">
              register
            </Link>
            <Button variant="soft">LOGOUT</Button>
            <Avatar fallback="M" radius="full" />
          </Flex>
        </Flex>
      </Box>

      {/* Header */}
      <Box py="4">
        <Flex justify="between" align="center" m="2">
          <Heading color="green">pr0jects</Heading>
          <CreateProjectButton />
        </Flex>
      </Box>

      {/* Main */}
      <Box>
        <Flex direction="column" gap="2" m="2">
          <Grid columns="3" gap="3">
            <Card>
              <Flex direction="row" justify="between" align="center" pb="2">
                <Heading size="3">users</Heading>
                <IconButton variant="ghost" size="2">
                  <CheckCircledIcon />
                </IconButton>
              </Flex>
              <Flex direction="row" align="center" py="1">
                <Badge variant="surface" size="1">
                  subgraph
                </Badge>
                <Text size="1" mx="2">
                  <Code>user-graphql</Code> service is <Text color="green">up</Text>
                </Text>
              </Flex>
              <Flex direction="row" align="center" py="1">
                <Badge variant="surface" size="1">
                  node
                </Badge>
                <Text size="1" mx="2">
                  <Code>user-manager</Code> service is <Text color="green">up</Text>
                </Text>
              </Flex>
            </Card>
            <Card>
              <Flex direction="row" justify="between" align="center" pb="2">
                <Heading size="3">projects</Heading>
                <IconButton variant="ghost" size="2" color="red">
                  <CrossCircledIcon />
                </IconButton>
              </Flex>
              <Flex direction="row" align="center" py="1">
                <Badge variant="surface" size="1">
                  subgraph
                </Badge>
                <Text size="1" mx="2">
                  <Code>project-graphql</Code> service is <Text color="green">up</Text>
                </Text>
              </Flex>
              <Flex direction="row" align="center" py="1">
                <Badge variant="surface" size="1">
                  node
                </Badge>
                <Text size="1" mx="2">
                  <Code>project-manager</Code> service is <Text color="red">down</Text>
                </Text>
              </Flex>
            </Card>
            <Card>
              <Flex direction="row" justify="between" align="center" pb="2">
                <Heading size="3">oauth</Heading>
                <IconButton variant="ghost" size="2">
                  <CheckCircledIcon />
                </IconButton>
              </Flex>
              <Flex direction="row" align="center" py="1">
                <Badge variant="surface" size="1">
                  worker
                </Badge>
                <Text size="1" mx="2">
                  <Code>oauth-proxy</Code> service is <Text color="green">up</Text>
                </Text>
              </Flex>
              <Flex direction="row" align="center" py="1">
                <Badge variant="surface" size="1">
                  node
                </Badge>
                <Text size="1" mx="2">
                  <Code>oauth-totp</Code> service is <Text color="green">up</Text>
                </Text>
              </Flex>
            </Card>
            <Card>
              <Flex direction="row" justify="between" align="center" pb="2">
                <Heading size="3">backup</Heading>
                <IconButton variant="ghost" size="2">
                  <CheckCircledIcon />
                </IconButton>
              </Flex>
              <Flex direction="row" align="center" py="1">
                <Badge variant="surface" size="1">
                  worker
                </Badge>
                <Text size="1" mx="2">
                  <Code>backup-worker</Code> service is <Text color="green">up</Text>
                </Text>
              </Flex>
              <Flex direction="row" align="center" py="1">
                <Badge variant="surface" size="1">
                  node
                </Badge>
                <Text size="1" mx="2">
                  <Code>backup-manager</Code> service is <Text color="green">up</Text>
                </Text>
              </Flex>
            </Card>
          </Grid>
          <TOTPPage />
        </Flex>
      </Box>

      {/* Footer */}
      <Box>
        <Separator mt="8" mb="4" size="4" />
        <Flex justify="between" align="center" m="2">
          <Text color="gray" size="1">
            © {new Date().getFullYear()} Codyslexia Inc. All rights reserved.
          </Text>
          <Flex gap="4">
            <Link size="1" color="gray">
              About
            </Link>
            <Link size="1" color="gray">
              Pricing
            </Link>
            <Link size="1" color="gray">
              Terms of Service
            </Link>
            <Link size="1" color="gray">
              Privacy Policy
            </Link>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default Home
