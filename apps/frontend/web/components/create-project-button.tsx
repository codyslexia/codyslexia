'use client'

import { Button, Code, Dialog, Flex, Select, Text, TextField } from '@radix-ui/themes'

export const CreateProjectButton = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="soft">CREATE NEW PROJECT</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>CREATE NEW PROJECT</Dialog.Title>
        <Dialog.Description size="1" mb="4">
          Create a new project on <Code color="green">c0dyslex1a</Code> organization.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root
              placeholder="Enter the name of you project"
              defaultValue="auth-webauthn"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Type
            </Text>
            <Select.Root defaultValue="node">
              <Select.Trigger style={{ width: '100%' }} />
              <Select.Content>
                <Select.Group>
                  <Select.Label>process</Select.Label>
                  <Select.Item value="worker">worker</Select.Item>
                  <Select.Item value="node">node</Select.Item>
                  <Select.Item value="subgraph">subgraph</Select.Item>
                </Select.Group>
                <Select.Separator />
                <Select.Group>
                  <Select.Label>task</Select.Label>
                  <Select.Item value="cronjob">cronjob</Select.Item>
                  <Select.Item value="sidecar">sidecar</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button color="green">Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
