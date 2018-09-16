export default function(state = false, action) {
  switch (action.type) {
    case "SET_ADD_TASK_VISIBILITY":
      return action.payload;
    default:
      return state;
  }
}
