import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectFormState = (state) => state.form || initialState;

export const selectCurrentPage = createSelector(selectFormState, (state) => state.currentPage);
export const selectIsConfirm = createSelector(selectFormState, (state) => state.isConfirm);
export const selectDataUser = createSelector(selectFormState, (state) => state.user);
export const selectDataPlan = createSelector(selectFormState, (state) => state.plan);
export const selectDataAddOns = createSelector(selectFormState, (state) => state.addOns);
