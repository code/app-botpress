import { z } from '@botpress/sdk'
import * as bp from '.botpress'

const telegram = new bp.telegram.Telegram()
const zendesk = new bp.zendesk.Zendesk()

export const bot = new bp.Bot({
  integrations: {
    telegram,
    zendesk,
  },
  configuration: {
    schema: z.object({}),
  },
  states: {
    flow: {
      type: 'conversation',
      schema: z.object({
        hitlEnabled: z.boolean(),
      }),
    },
  },
  events: {},
  recurringEvents: {},
  user: {
    tags: {
      downstream: {
        title: 'Downstream User ID',
        description: 'ID of the downstream user binded to the upstream one',
      },
      upstream: {
        title: 'Upstream User ID',
        description: 'ID of the upstream user binded to the downstream one',
      },
    },
  },
  conversation: {
    tags: {
      downstream: {
        title: 'Downstream Conversation ID',
        description: 'ID of the downstream conversation binded to the upstream one',
      },
      upstream: {
        title: 'Upstream Conversation ID',
        description: 'ID of the upstream conversation binded to the downstream one',
      },
    },
  },
})
