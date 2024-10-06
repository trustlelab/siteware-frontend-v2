import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setId, fetchAgentData } from './agent-slice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setId,
  effect: async (action, listenerApi) => {
    const id = action.payload;
    // Dispatch fetchAgentData thunk
    listenerApi.dispatch(fetchAgentData(id));
  },
});

export default listenerMiddleware;
