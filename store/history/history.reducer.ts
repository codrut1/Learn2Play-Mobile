import { ActionWithPayload, HistoryInformation, HistoryState } from "../store";
import { GET_HISTORY_BY_SECTION, SET_HISTORY } from "./history.constants";

const initialState: HistoryState = {
  history: [],
  loading: false,
  bestScore: {
    date: "",
    id: 0,
    score: 0,
    sectionId: 0,
  },
};

const historyReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case GET_HISTORY_BY_SECTION:
      return {
        ...state,
        loading: true,
      };
    case SET_HISTORY:
      return {
        ...state,
        history: (action as ActionWithPayload<{
          history: HistoryInformation[];
          bestScore: HistoryInformation;
        }>).payload.history,
        loading: false,
        bestScore: (action as ActionWithPayload<{
          history: HistoryInformation[];
          bestScore: HistoryInformation;
        }>).payload.bestScore,
      };

    default:
      return state;
  }
};

export default historyReducer;
