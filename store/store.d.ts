export type ActionWithPayload<TPayload> = {
  type: string;
  payload: TPayload;
};

export interface UserInformation {
  id: number;
  token: string;
  username: string;
  email: string;
  error: string;
  profilePic?: string;
  loading: boolean;
}

export interface SongInformation {
  id: number;
  title: string;
  artist: string;
  album: string;
  cover: string;
  userId: number;
}

export interface SectionInformation {
  id: number;
  title: string;
  audioFile: any;
  difficulty: string;
  songId: number;
}

export interface SongState {
  songs: SongInformation[];
  loading: boolean;
}

export interface SectionState {
  sections: SectionInformation[];
  loading: boolean;
  uploadingRecording: boolean;
  latestTry: HistoryInformation;
  latestTryPercentDifference: number;
}

export interface HistoryInformation {
  id: number;
  score: number;
  date: string;
  sectionId: number;
}

export interface HistoryState {
  history: HistoryInformation[];
  bestScore: HistoryInformation;
  loading: boolean;
}

export interface ChallengeRequest {
  id: number;
  owner: number;
  section: number;
  dateCreated: string;
}

export interface ChallengeRequestModified {
  id: number;
  owner: number;
  section: number;
  dateCreated: string;
  songTitle: string;
  sectionTitle: string;
  songImage: string;
}

export interface ChallengePostInformation {
  challenger: number;
  challenged: number;
  section: number;
}

export interface ChallengeParticipantInformation {
  id: number;
  username: string;
  profilePic: string;
}

export interface ChallengeFullDetails {
  id: number;
  isFinished: boolean;
  challengerBestScore: number;
  challengedBestScore: number;
  challengerLastAttemptDate: string;
  challengedLastAttemptDate: string;
  challengerAttemptsNumber: number;
  challengedAttemptsNumber: number;
  finishDate: string;
  challenger: ChallengeParticipantInformation;
  challenged: ChallengeParticipantInformation;
  sectionId: number;
  sectionTitle: string;
  songTitle: string;
  songArtist: string;
  songAlbum: string;
  songCover: string;
}

export interface ChallengeState {
  challenges: ChallengeFullDetails[];
  challengeRequests: ChallengeRequestModified[];
  currentChallenge: ChallengeFullDetails;
  loading: boolean;
  uploadingRecording: boolean;
  latestScore: number;
}

export interface Store {
  user: UserInformation;
  songs: SongState;
  sections: SectionState;
  history: HistoryState;
  challenges: ChallengeState;
}
