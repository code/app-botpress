import type * as sdk from '@botpress/sdk'
import * as errors from '../errors'
import * as utils from '../utils'

type PackageRef = { name: string; version: string }

const PLUGIN_PREFIX_SEP = '#'

export const validateBotDefinition = (b: sdk.BotDefinition): void => {
  const { actions, events, states } = b

  const invalidActionNames = _nonCamelCaseKeys(actions ?? {})
  if (invalidActionNames.length) {
    throw new errors.BotpressCLIError(
      `The following action names are not in camelCase: ${invalidActionNames.join(', ')}`
    )
  }

  const invalidEventNames = _nonCamelCaseKeys(events ?? {})
  if (invalidEventNames.length) {
    throw new errors.BotpressCLIError(`The following event names are not in camelCase: ${invalidEventNames.join(', ')}`)
  }

  const invalidStateNames = _nonCamelCaseKeys(states ?? {})
  if (invalidStateNames.length) {
    throw new errors.BotpressCLIError(`The following state names are not in camelCase: ${invalidStateNames.join(', ')}`)
  }

  for (const [pluginName, plugin] of Object.entries(b.plugins ?? {})) {
    const integrationDependencies = plugin.definition.integrations ?? {}
    for (const dep of Object.values(integrationDependencies)) {
      if (!_hasIntegrationDependency(b, dep)) {
        throw new errors.BotpressCLIError(
          `Plugin "${pluginName}" has a dependency on integration "${dep.name}@${dep.version}", but it is not present in the bot definition. Please install it.`
        )
      }
    }

    const interfaceDependencies = plugin.definition.interfaces ?? {}
    for (const [interfaceAlias, dep] of Object.entries(interfaceDependencies)) {
      const interfaceImpl = plugin.interfaces[interfaceAlias]
      if (!interfaceImpl) {
        throw new errors.BotpressCLIError(
          `Plugin "${pluginName}" has a dependency on interface "${dep.name}@${dep.version}" (aliased as "${interfaceAlias}"), but the bot does not specify an implementation for it.`
        )
      }

      if (!_hasIntegrationDependency(b, interfaceImpl)) {
        throw new errors.BotpressCLIError(
          `Integration "${interfaceImpl.name}@${interfaceImpl.version}" is not installed in the bot, but specified as an implementation for interface "${dep.name}@${dep.version}"`
        )
      }
    }
  }
}

const _nonCamelCaseKeys = (obj: Record<string, any>): string[] =>
  Object.keys(obj).filter((key) => {
    const tokens: string[] = key.split(PLUGIN_PREFIX_SEP, 2)
    return !utils.casing.is.camelCase(tokens.at(-1)!)
  })

const _hasIntegrationDependency = (b: sdk.BotDefinition, dep: PackageRef): boolean => {
  const integrationInstances = Object.entries(b.integrations ?? {}).map(([_k, v]) => v)
  return integrationInstances.some(
    (integration) => integration.name === dep.name && integration.version === dep.version
  )
}
