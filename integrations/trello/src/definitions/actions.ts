import {
  createCardInputSchema,
  createCardOutputSchema,
  updateCardInputSchema,
  updateCardOutputSchema,
  getMemberInputSchema,
  getMemberOutputSchema,
  addCommentInputSchema,
  addCommentOutputSchema,
} from '../misc/custom-schemas'

import {
  createCardUi,
  updateCardUi,
  getMemberUi,
  addCommentUi,
} from '../misc/custom-uis'

const createCard = {
  title: 'Create Card',
  input: {
    schema: createCardInputSchema,
    ui: createCardUi,
  },
  output: {
    schema: createCardOutputSchema,
  },
}

const updateCard = {
  title: 'Update Card',
  input: {
    schema: updateCardInputSchema,
    ui: updateCardUi,
  },
  output: {
    schema: updateCardOutputSchema,
  },
}

const getMember = {
  title: 'Get Member',
  input: {
    schema: getMemberInputSchema,
    ui: getMemberUi,
  },
  output: {
    schema: getMemberOutputSchema,
  },
}

const addComment = {
  title: 'Add Comment',
  input: {
    schema: addCommentInputSchema,
    ui: addCommentUi,
  },
  output: {
    schema: addCommentOutputSchema,
  },
}

export const actions = {
  createCard,
  updateCard,
  getMember,
  addComment,
}
