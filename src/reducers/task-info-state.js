export default function(state = false, action) {
  switch (action.type) {
    case "SET_TASK_INFO_STATE":
      return action.payload;
    default:
      return state;
  }
}
