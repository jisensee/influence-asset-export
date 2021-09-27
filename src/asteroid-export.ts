import * as http from 'https'
import * as fs from 'fs'
import { gql, GraphQLClient } from 'graphql-request'
import { ExportFormat } from './args'

const baseUrl = 'https://adalia.info'
const gqlUrl = `${baseUrl}/graphql`
const client = new GraphQLClient(gqlUrl)

const exportByOwnersMutation = gql`
  mutation ExportAsteroids($format: ExportFormat!, $owners: [String!]!) {
    exportAsteroids(format: $format, filter: { owners: $owners })
  }
`
const exportAllMutation = gql`
  mutation ExportAllAsteroids($format: ExportFormat!) {
    exportAllAsteroids(format: $format)
  }
`

const formatToGql = (format: ExportFormat) =>
  format === ExportFormat.CSV ? 'CSV' : 'JSON'

const getExportDownloadUrl = (exportUrl: string) => `${baseUrl}${exportUrl}`

export const getAsteroidExportByOwnersUrl = async (
  format: ExportFormat,
  owners: string[]
) => {
  const variables = { owners, format: formatToGql(format) }

  const data = await client.request(exportByOwnersMutation, variables)

  return getExportDownloadUrl(data['exportAsteroids'])
}

export const getAsteroidExportAllUrl = async (format: ExportFormat) => {
  const variables = { format: formatToGql(format) }
  const data = await client.request(exportAllMutation, variables)
  return getExportDownloadUrl(data['exportAllAsteroids'])
}

export const downloadAsteroidExport = (
  url: string,
  destination: fs.WriteStream
) => {
  http.get(url, (response) => response.pipe(destination))

  return new Promise((res, rej) => {
    destination.on('finish', res)
    destination.on('error', rej)
  })
}
