import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import dotenv from 'dotenv'

/**
 * Converts a .env file to JSON format.
 * @param {string} envFilePath - The path to the .env file.
 * @param {boolean} [writeToFile=false] - Whether to write the JSON object to a file.
 * @returns {Object} JSON object containing key-value pairs from the .env file.
 * @example
 * // Converts the .env file to JSON and writes it to a file
 * envFileToJson('.env', true)
 */
export async function envFileToJson(
  envFilePath: string,
  writeToFile = false
): Promise<Record<string, string>> {
  // Read the .env file
  try {
    await readFile(envFilePath)
  } catch {
    throw new Error(`File not found: ${envFilePath}`)
  }

  const envData = await readFile(envFilePath, { encoding: 'utf-8' })

  // Parse the .env data
  const parsed = dotenv.parse(envData)

  // Convert to JSON object
  const json: Record<string, string> = {}
  for (const key in parsed) {
    if (Object.hasOwnProperty.call(parsed, key)) {
      // encode to base64
      json[key] = Buffer.from(parsed[key]).toString('base64')
    }
  }

  if (writeToFile) {
    const jsonFilePath = path.join(path.dirname(envFilePath), 'secrets.json')
    await writeFile(jsonFilePath, JSON.stringify(json, null, 2))
  }

  // console.log(json)

  return json
}
