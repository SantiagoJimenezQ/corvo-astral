import config from '../config'
const { groupListingChannelName } = config

/**
 * Get the party channel by matching its name.
 *
 * @param {object} message
 * @returns {object}
 */
export function getPartyChannel (message) {
  return message.client.channels.cache.find(channel => channel.name.includes(groupListingChannelName))
}

/**
 * Get party messages from the party channel.
 *
 * @param {object} message
 * @returns {object[]}
 */
export async function getChannelParties (message) {
  const channel = getPartyChannel(message)
  const messages = await channel.messages.fetch({ limit: 100 })
  return messages.filter(message => {
    const embeds = message.embeds || []
    const partyEmbed = embeds[0]
    if (!partyEmbed) {
      return false
    }
    return partyEmbed.title.includes('Grupo')
  })
}

/**
 * Get a message that matched a embed field name.
 *
 * @param {object[]} messages
 * @param {string} name
 * @param {string} value
 * @returns {object}
 */
export function getMessageByEmbedNameAndValue (messages, name, value) {
  return messages.find(message => {
    return message.embeds[0].fields.find(field => field.name.includes(name) && field.value === value)
  })
}
