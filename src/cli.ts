#! node
import { command, option, run, string, Type } from 'cmd-ts'
import { createWriteStream } from 'fs'
import * as readline from 'readline'
import { args, ExportFormat, ExportMode } from './args'
import {
  downloadAsteroidExport,
  getAsteroidExportAllUrl,
  getAsteroidExportByOwnersUrl,
} from './asteroid-export'

const readAddresses = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
  })

  const addresses: string[] = []
  for await (const line of rl) {
    addresses.push(line)
  }
  return addresses
}

export const getAsteroidExportUrl = async (
  format: ExportFormat,
  mode: ExportMode
) => {
  switch (mode) {
    case ExportMode.ALL:
      console.log('Generating all asteroid export...')
      return getAsteroidExportAllUrl(format)
    case ExportMode.OWNERS:
      const addresses = await readAddresses()
      console.log('Generating asteroid export based on given owners...')
      return getAsteroidExportByOwnersUrl(format, addresses)
  }
}

const cmd = command({
  name: 'influence-asset-export',
  version: '1.0.4',
  args,
  handler: async (args) => {
    console.log(`Using ${args.format} as export format`)
    const exportUrl = await getAsteroidExportUrl(args.format, args.mode)
    const destination = createWriteStream(args.asteroidExportFile)
    console.log('Downloading and writing asteroid export...')
    await downloadAsteroidExport(exportUrl, destination)
    console.log('Asteroid export finished!')
  },
})

run(cmd, process.argv.slice(2))
