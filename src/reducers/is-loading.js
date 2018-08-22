export default function(state = false, action) {
  switch (action.type) {
    case "CHANGE_LOADING_STATE":
      return action.payload;
    default:
      return state;
  }
}
