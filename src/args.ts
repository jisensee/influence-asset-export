import { command, oneOf, option, optional, string, Type } from 'cmd-ts'

export enum ExportFormat {
  CSV = 'csv',
  JSON = 'json',
}

export enum ExportMode {
  ALL = 'all',
  OWNERS = 'owners',
}

const exportFormatType: Type<string, ExportFormat> = {
  from: async (str) => {
    switch (str.toLowerCase()) {
      case 'json':
        return ExportFormat.JSON
      default:
        return ExportFormat.CSV
    }
  },
}

const exportModeType: Type<string, ExportMode> = {
  from: async (str) => {
    switch (str.toLowerCase()) {
      case 'owners':
        return ExportMode.OWNERS
      default:
        return ExportMode.ALL
    }
  },
}

export const args = {
  format: option({
    long: 'format',
    short: 'f',
    description: `The export format, one of [csv, json] which defaults to 'csv'.`,
    type: oneOf([ExportFormat.JSON, ExportFormat.CSV]),
    defaultValue: () => ExportFormat.CSV,
  }),
  mode: option({
    long: 'mode',
    short: 'm',
    description: `The mode of the export, one of [all, owners] which defaults to 'all'. If 'owners' is selected a list of ETH addresses is read from STDIN (one address per line) to only obtain assets that are owned by any of those addresses.`,
    type: oneOf([ExportMode.ALL, ExportMode.OWNERS]),
    defaultValue: () => ExportMode.ALL,
  }),
  asteroidExportFile: option({
    long: 'asteroid-export-file',
    short: 'a',
    description: 'The file that the asteroid export should be saved to.',
    type: string,
  }),
}
