export default function(state = null, action) {
  switch (action.type) {
    case "LOAD_CLIENT":
      return action.payload;
    default:
      return state;
  }
}
