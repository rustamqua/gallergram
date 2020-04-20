export const addPost = (post) => {
  return { type: "ADD_POST", post };
};
export const changeInfo = (info) => {
    return {type: "CHANGE_INFO", info}
}
export const addComment = (id, comment) => {
  return {type: "ADD_COMMENT", id, comment}
}
