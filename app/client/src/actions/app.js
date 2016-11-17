import { updateTrack } from './track'

// ======================================================
// Actions
// ======================================================
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

export const RECEIVE_EXTENSION_MESSAGE = 'RECEIVE_EXTENSION_MESSAGE'
export const RECEIVE_EXTENSION_TRACK_MESSAGE = 'RECEIVE_EXTENSION_TRACK_MESSAGE'

// ======================================================
// Action creators
// ======================================================
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

function receiveExtensionMessage(payload) {
  return {
    type: RECEIVE_EXTENSION_MESSAGE,
    payload
  }
}

function receiveExtensionTrackMessage(trackObject) {
  return {
    type: RECEIVE_EXTENSION_TRACK_MESSAGE,
    payload: trackObject
  }
}

// Listen to new messages coming from the content script
export function checkExtensionMessages() {
  return (dispatch) => {
    // send message to check the connection between webapp and extension (content script)
    window.postMessage({ action: 'CONNECTION_REQUEST', source: 'webapp' }, process.env.HOST)

    window.addEventListener('message', (event) => {
      // We only accept messages from our window
      if (event.origin !== process.env.HOST) {
        return
      }

      // we abort if the webapp itself sent the message
      if (!event.data || event.data.source === 'webapp') {
        return
      }

      // we abort if there's no action
      if (!event.data.action) {
        return
      }

      // dispatch the fact that we can communicate with the extension
      dispatch(receiveExtensionMessage(event.data))

      switch (event.data.action) {
        case 'UPDATE_TRACKED_TIME':
          dispatch(receiveExtensionTrackMessage(event.data.trackObject))
          dispatch(updateTrack(event.data.trackObject))
          break
        default:
      }
    }, false)
  }
}
