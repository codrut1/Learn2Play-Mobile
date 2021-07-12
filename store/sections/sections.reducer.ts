import {
  ActionWithPayload,
  HistoryInformation,
  SectionInformation,
  SectionState,
} from "../store";
import {
  ADD_NEW_SECTION,
  SET_SECTIONS,
  GET_SECTIONS_BY_SONG,
  DELETE_SECTION,
  UPLOAD_SECTION,
  UPLOAD_FINISHED,
} from "./sections.constants";

const initialState: SectionState = {
  sections: [],
  loading: false,
  uploadingRecording: false,
  latestTry: {
    date: "",
    id: 0,
    score: 0,
    sectionId: 0,
  },
  latestTryPercentDifference: 0,
};

const sectionsReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case GET_SECTIONS_BY_SONG:
      return {
        ...state,
        loading: true,
      };
    case SET_SECTIONS:
      return {
        ...state,
        sections: (action as ActionWithPayload<{
          sections: SectionInformation[];
        }>).payload.sections,
        loading: false,
      };
    case ADD_NEW_SECTION:
      return {
        ...state,
        sections: [
          ...state.sections,
          (action as ActionWithPayload<{ section: SectionInformation }>).payload
            .section,
        ],
      };
    case DELETE_SECTION:
      return {
        ...state,
        sections: state.sections.filter(
          (section: SectionInformation) =>
            section.id !==
            (action as ActionWithPayload<{ id: number }>).payload.id
        ),
      };
    case UPLOAD_SECTION:
      return {
        ...state,
        uploadingRecording: true,
      };
    case UPLOAD_FINISHED:
      return {
        ...state,
        uploadingRecording: false,
        latestTry: (action as ActionWithPayload<{
          stats: HistoryInformation;
          percentDiff: number;
        }>).payload.stats,
        latestTryPercentDifference: (action as ActionWithPayload<{
          stats: HistoryInformation;
          percentDiff: number;
        }>).payload.percentDiff,
      };
    default:
      return state;
  }
};

export default sectionsReducer;
