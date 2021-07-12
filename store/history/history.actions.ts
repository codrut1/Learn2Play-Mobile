import { HistoryInformation, ActionWithPayload } from "../store";
import {
  GET_HISTORY_BY_SECTION,
  SET_HISTORY,
} from "../history/history.constants";

export const getHistoryBySection = (
  sectionId: number
): ActionWithPayload<{ sectionId: number }> => ({
  type: GET_HISTORY_BY_SECTION,
  payload: {
    sectionId,
  },
});

export const setHistory = (
  history: HistoryInformation[],
  bestScore: HistoryInformation
): ActionWithPayload<{
  history: HistoryInformation[];
  bestScore: HistoryInformation;
}> => ({
  type: SET_HISTORY,
  payload: {
    history,
    bestScore,
  },
});
