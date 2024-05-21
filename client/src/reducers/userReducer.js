import produce from 'immer';
import ACTION_TYPES from '../actions/type';
import CONSTANTS from '../constants';

const initialState = {
  user: null,
  users: [],
  userProfile: null,
  profileSubscriptions: { type: null, subscriptions: [] },
  subscriptionsLimit: 6,
  subscriptionsOffset: 0,
  haveMoreSubscriptions: true,
  isFetching: false,
  isFetchingProfile: false,
  error: null,
};

const handleRequests = produce(draftState => {
  draftState.isFetching = true;
});
const handleError = produce((draftState, action) => {
  const {
    payload: { error },
  } = action;
  draftState.isFetching = false;
  draftState.error = error;
});
const handleGetAuthUser = produce((draftState, action) => {
  const {
    payload: { user },
  } = action;
  draftState.isFetching = false;
  user.onlineStatus = 'online';
  draftState.user = user;
});

const handlers = {
  [ACTION_TYPES.SIGN_IN_REQUEST]: handleRequests,
  [ACTION_TYPES.SIGN_UP_REQUEST]: handleRequests,
  [ACTION_TYPES.LOGOUT_REQUEST]: handleRequests,
  [ACTION_TYPES.GET_AUTH_USER_REQUEST]: handleRequests,
  [ACTION_TYPES.UPDATE_USER_REQUEST]: handleRequests,
  [ACTION_TYPES.GET_USERS_REQUEST]: handleRequests,
  [ACTION_TYPES.GET_USER_REQUEST]: produce((draftState, action) => {
    draftState.isFetchingProfile = true;
  }),
  [ACTION_TYPES.GET_USER_FOLLOWERS_REQUEST]: produce((draftState, action) => {
    draftState.isFetching = true;
  }),
  [ACTION_TYPES.GET_USER_FOLLOWING_REQUEST]: produce((draftState, action) => {
    draftState.isFetching = true;
  }),
  [ACTION_TYPES.SIGN_IN_SUCCESS]: handleGetAuthUser,
  [ACTION_TYPES.SIGN_UP_SUCCESS]: handleGetAuthUser,
  [ACTION_TYPES.LOGOUT_SUCCESS]: produce(draftState => {
    draftState.isFetching = false;
    window.localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
    draftState.user = null;
    draftState.users = [];
  }),
  [ACTION_TYPES.GET_AUTH_USER_SUCCESS]: handleGetAuthUser,
  [ACTION_TYPES.GET_USERS_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { users },
    } = action;
    draftState.isFetching = false;
    draftState.users.push(...users);
  }),
  [ACTION_TYPES.GET_USER_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { userData },
    } = action;
    draftState.isFetchingProfile = false;
    draftState.userProfile = userData;
  }),
  [ACTION_TYPES.UPDATE_USER_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { user },
    } = action;
    draftState.isFetching = false;
    draftState.user = user;
  }),
  [ACTION_TYPES.SUBSCRIBE_USER_SUCCESS]: produce((draftState, action) => {
    draftState.user.following += 1;
    draftState.userProfile.followers += 1;
    draftState.userProfile.isFollowed = true;
  }),
  [ACTION_TYPES.UNSUBSCRIBE_USER_SUCCESS]: produce((draftState, action) => {
    draftState.user.following -= 1;
    draftState.userProfile.followers -= 1;
    draftState.userProfile.isFollowed = false;
  }),
  [ACTION_TYPES.SET_ONLINE_STATUS]: produce((draftState, action) => {
    const {
      payload: { userId, status },
    } = action;

    if (draftState.userProfile?.id === userId) {
      draftState.userProfile.onlineStatus = status;
      draftState.userProfile.lastSeen = new Date().toISOString();
    }
  }),
  [ACTION_TYPES.GET_USER_FOLLOWERS_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { followers, haveMoreSubscriptions },
    } = action;
    draftState.isFetching = false;
    draftState.subscriptionsOffset += followers.length;
    draftState.haveMoreSubscriptions = haveMoreSubscriptions;
    draftState.isFetching = false;
    if (followers.length > 0) {
      draftState.profileSubscriptions = {
        type: followers.length === 1 ? 'Follower' : 'Followers',
        subscriptions: [
          ...draftState.profileSubscriptions.subscriptions,
          ...followers,
        ],
      };
    }
  }),
  [ACTION_TYPES.GET_USER_FOLLOWING_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { following, haveMoreSubscriptions },
    } = action;
    draftState.isFetching = false;
    draftState.subscriptionsOffset += following.length;
    draftState.haveMoreSubscriptions = haveMoreSubscriptions;
    if (following.length > 0) {
      draftState.profileSubscriptions = {
        type: 'Following',
        subscriptions: [
          ...draftState.profileSubscriptions.subscriptions,
          ...following,
        ],
      };
    }
  }),
  [ACTION_TYPES.CLEAN_USER_ERROR]: produce((draftState, action) => {
    draftState.error = null;
  }),
  [ACTION_TYPES.CLEAN_USER_PROFILE]: produce((draftState, action) => {
    draftState.userProfile = null;
  }),
  [ACTION_TYPES.CLEAN_PROFILE_SUBSCRIPTIONS]: produce((draftState, action) => {
    draftState.profileSubscriptions = { type: null, subscriptions: [] };
    draftState.subscriptionsOffset = 0;
    draftState.haveMoreSubscriptions = true;
  }),
  [ACTION_TYPES.SIGN_IN_ERROR]: handleError,
  [ACTION_TYPES.SIGN_UP_ERROR]: handleError,
  [ACTION_TYPES.LOGOUT_ERROR]: handleError,
  [ACTION_TYPES.GET_AUTH_USER_ERROR]: handleError,
  [ACTION_TYPES.GET_USERS_ERROR]: handleError,
  [ACTION_TYPES.GET_USER_ERROR]: produce((draftState, action) => {
    const {
      payload: { error },
    } = action;
    draftState.isFetchingProfile = false;
    draftState.error = error;
  }),
  [ACTION_TYPES.GET_USER_FOLLOWERS_ERROR]: handleError,
  [ACTION_TYPES.GET_USER_FOLLOWING_ERROR]: handleError,
  [ACTION_TYPES.UPDATE_USER_ERROR]: handleError,
  [ACTION_TYPES.SUBSCRIBE_USER_ERROR]: handleError,
  [ACTION_TYPES.UNSUBSCRIBE_USER_ERROR]: handleError,
};

const userReducer = (state = initialState, action) => {
  const handler = handlers[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};

export default userReducer;
