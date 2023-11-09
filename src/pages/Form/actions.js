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

export const setNextPage = () => ({
  type: SET_NEXT_PAGE,
});

export const setPrevPage = () => ({
  type: SET_PREV_PAGE,
});

export const setPageByValue = (val) => ({
  type: CHANGE_PAGE_BY_VALUE,
  val,
});

export const setDataUser = (user) => ({
  type: SET_DATA_USER,
  user,
});
export const setDataPlan = (plan) => ({
  type: SET_DATA_PLAN,
  plan,
});
export const addDataAddOns = (addOns) => ({
  type: SET_DATA_ADDONS,
  addOns,
});
export const deleteDataAddOns = (name) => ({
  type: DELETE_DATA_ADDONS,
  name,
});
export const setIsConfirm = () => ({
  type: SET_IS_CONFIRM,
});
export const resetForm = () => ({
  type: RESET_VALUE,
});
