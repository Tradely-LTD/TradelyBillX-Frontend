import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { State } from "../location/location.api";

export type StateProps = {
  state: State | null;
};

const initialState: StateProps = {
  state: null,
};

const setAuthHandler = (state: StateProps, { payload: data }: { payload: Partial<StateProps> }) => {
  return {
    ...state,
    ...data,
  };
};

export const StateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setCurrentState: setAuthHandler,
  },
});

export const { setCurrentState } = StateSlice.actions;

export const useStateSlice = () => useSelector((state: RootState) => state.state);

export default StateSlice.reducer;
