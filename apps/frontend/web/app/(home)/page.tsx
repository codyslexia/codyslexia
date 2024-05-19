import Image from 'next/image'
import { CheckCircledIcon, CrossCircledIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import {
  Badge,
  Box,
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

import { CreateProjectButton } from '../../components/create-project-button'
import { getTotp } from '../../components/get-totp'

const Home = async () => {
  const [{ id, secret, backup, image }] = await getTotp()
  return (
    <>
      {/* Header */}
      <Box>
        <Flex justify="between" align="center" m="2">
          <h1>Apps & Systems</h1>
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
                  user-graphqlphql service is <Text color="green">up</Text>
                </Text>
              </Flex>
              <Flex direction="row" align="center" py="1">
                <Badge variant="surface" size="1">
                  node
                </Badge>
                <Text size="1" mx="2">
                  user-manager service is <Text color="green">up</Text>
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
                  project-graphql service is <Text color="green">up</Text>
                </Text>
              </Flex>
              <Flex direction="row" align="center" py="1">
                <Badge variant="surface" size="1">
                  node
                </Badge>
                <Text size="1" mx="2">
                  project-manager service is <Text color="red">down</Text>
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
                  oauth-proxy service is <Text color="green">up</Text>
                </Text>
              </Flex>
              <Flex direction="row" align="center" py="1">
                <Badge variant="surface" size="1">
                  node
                </Badge>
                <Text size="1" mx="2">
                  oauth-totp service is <Text color="green">up</Text>
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
                  backup-worker service is <Text color="green">up</Text>
                </Text>
              </Flex>
              <Flex direction="row" align="center" py="1">
                <Badge variant="surface" size="1">
                  node
                </Badge>
                <Text size="1" mx="2">
                  backup-manager service is <Text color="green">up</Text>
                </Text>
              </Flex>
            </Card>
          </Grid>

          <Flex justify="between" py="4">
            <h1>TOTP Multi-factor Authentication</h1>
            <Image src={image} alt="qrcode" width={80} height={80} />
          </Flex>

          <Grid columns="3" gap="3">
            {backup.map((backup: string, i: number) => (
              <Card key={i}>
                <Flex direction="row" justify="between" align="center" pb="2">
                  <Code>{id}</Code>
                  <IconButton variant="ghost" size="2">
                    <CheckCircledIcon />
                  </IconButton>
                </Flex>
                <Flex direction="row" align="center" py="1" gap="3">
                  <Image src={image} alt="qrcode" width={80} height={80} />
                  <Text size="1" mx="2">
                    <Code>totp-api</Code> request: <Code>{backup}</Code>
                  </Text>
                </Flex>
                <Flex justify="end">
                  <IconButton variant="ghost" size="1">
                    <Flex justify="between">
                      <InfoCircledIcon style={{ marginInlineEnd: 4 }} />
                      <Text style={{ fontSize: 10 }}>{new Date().toUTCString()}</Text>
                    </Flex>
                  </IconButton>
                </Flex>
              </Card>
            ))}
          </Grid>
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
