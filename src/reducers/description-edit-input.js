import RichTextEditor from "react-rte";

export default function(state = RichTextEditor.createEmptyValue(), action) {
  switch (action.type) {
    case "SET_DESCRIPTION_EDIT_INPUT":
      if (action.payload !== null) {
        return action.payload;
      }
      return state;
    default:
      return state;
  }
}
