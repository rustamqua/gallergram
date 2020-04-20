const initialState = {
  posts: [
    {
      title: "redux",
      image:
        "https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png",
      description: "redux for state management",
      comments: [],
      likes: 0,
      id: 0,
      location: "Almaty Kazakhstan",
    },
  ],
  userPhoto: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Anonymous.svg/1200px-Anonymous.svg.png",
  userName: "Anonym",
  userInfo: ""
};
export const rootReducer = (state = initialState, action) => {
    if(action.type === "CHANGE_INFO"){
        return {
            ...state,
            userPhoto: action.info.userPhoto,
            userName: action.info.userName,
            userInfo: action.info.userInfo
        }
    }
    else if(action.type === "ADD_POST"){
        const copy = {
            ...state, posts: [...state.posts]
        }
        copy.posts.unshift(action.post)
        return copy;
    }
    else if(action.type === "ADD_COMMENT"){
      const find = state.posts.lastIndexOf(state.posts.filter(e => e.id === action.id)[0]);
      const posts = [...state.posts]
      const comments = [...posts[find].comments]
      comments.push(action.comment)
      posts[find].comments = comments;
      return {
        ...state, posts: posts
      }
    }
    return state;
}