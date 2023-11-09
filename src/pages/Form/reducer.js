import { produce } from 'immer';

import {
  CHANGE_PAGE_BY_VALUE,
  DELETE_DATA_ADDONS,
  RESET_VALUE,
  SET_DATA_ADDONS,
  SET_DATA_PLAN,
  SET_DATA_USER,
  SET_IS_CONFIRM,
  SET_NEXT_PAGE,
  SET_PREV_PAGE,
} from './constants';

export const initialState = {
  currentPage: 0,
  user: {},
  plan: {},
  addOns: [],
  isConfirm: false,
};

export const storedKey = ['currentPage', 'user', 'plan', 'addOns', 'isConfirm'];

const formReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_NEXT_PAGE:
        if (state.currentPage < 3) {
          draft.currentPage = state.currentPage + 1;
        }
        break;
      case SET_PREV_PAGE:
        if (state.currentPage != 0) {
          draft.currentPage = state.currentPage - 1;
        }
        break;
      case CHANGE_PAGE_BY_VALUE:
        draft.currentPage = action.val;
      case SET_DATA_USER:
        draft.user = action.user;
        break;
      case SET_DATA_PLAN:
        draft.plan = action.plan;
        break;
      case SET_DATA_ADDONS:
        draft.addOns = [...state.addOns, action.addOns];
        break;
      case DELETE_DATA_ADDONS:
        draft.addOns = state.addOns.filter((val) => val.name != action.name);
        break;
      case SET_IS_CONFIRM:
        draft.isConfirm = !state.isConfirm;
        break;
      case RESET_VALUE:
        return initialState;
    }
  });

export default formReducer;
