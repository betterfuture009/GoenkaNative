import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Animated} from 'react-native';
import {Contact} from 'react-native-contacts';
import {SoundPlus} from './clips';
import {ScreenNames} from './screens';
import {AM_NOTIFICATION_TIME, PM_NOTIFICATION_TIME} from './constants';

const INITIAL_SCREEN = 'InitQuestionScreen';

export type Sit = {
  date: Date;
  duration: number;
  elapsed: number;
  hasChanting?: boolean;
  hasExtendedMetta?: boolean;
  recording?: string;
  selected?: boolean;
};

export type FriendRequest = {
  accepted?: Date;
  created_at: Date;
  from_name: string;
  from_onesignal_id: string;
  from_phone: string;
  from_wants_notifs: boolean;
  id: string;
  rejected?: Date;
  to_name: string;
  to_onesignal_id: string;
  to_phone: string;
  to_wants_notifs: boolean;
};

type OnlineSit = Sit & {id: string; user_id: string; user_phone?: string};

export type ContactDoc = {
  id: string;
  name: string;
  phoneNumber: string;
  signed_up?: Date;
};

export type RecentlyJoinedContact = ContactDoc & {
  new_name: string;
  new_onesignal_id: string;
};

type ToggleableStates = {
  airplaneModeReminder?: boolean;
  amNotification: boolean;
  autoSyncCompletedSits: boolean;
  finished: boolean;
  hasChanting: boolean;
  hasExtendedMetta: boolean;
  isEnoughTime: boolean;
  pmNotification: boolean;
  showHistoryBtnTooltip: boolean;
};

export type ContactType =
  | 'alreadyFriends'
  | 'availableToFriend'
  | 'notOnApp'
  | 'pendingRequests';
export type ContactWithType = Contact & {
  checking?: boolean;
  display_name?: string;
  type?: ContactType;
};

export interface State extends ToggleableStates {
  acceptedIncomingFriendRequests: FriendRequest[];
  acceptedOutgoingFriendRequests: FriendRequest[];
  airplaneModeReminderOpacity: Animated.Value;
  amNotificationTime: Date;
  backgroundColor: string;
  contacts?: ContactWithType[];
  contactsNotOnApp: ContactDoc[];
  countdownDuration?: number;
  customDuration: number;
  displayName: string | null;
  expandFriendsSection?: boolean;
  friendsSit?: {
    host_name: string;
    host_onesignal: string;
    host_phone: string;
    sit: Sit;
    sit_date: string;
  };
  history: Sit[];
  historyViewIndex: number;
  incomingFriendRequests: FriendRequest[];
  isOldStudent: boolean | null;
  latestTrack: SoundPlus | null;
  mainScreenSwitcherIndex: number;
  notifications_allowed: boolean;
  onesignal_id: string | null;
  onlineSits: OnlineSit[];
  outgoingFriendRequests: FriendRequest[];
  pmNotificationTime: Date;
  recentlyJoinedContacts: RecentlyJoinedContact[];
  rejectedFriendRequests: FriendRequest[];
  safeAreaInsetBottom: number;
  safeAreaInsetTop: number;
  screen: ScreenNames;
  timeouts: ReturnType<typeof setTimeout>[];
  titleOpacity: Animated.Value;
  user: FirebaseAuthTypes.User | null;
}

export type Toggleables = keyof ToggleableStates;

export type setStatePayload = Partial<State>;

export interface Props extends State {
  setState: (payload: setStatePayload) => void;
  toggle: (key: Toggleables) => () => void;
}

const initialState: State = {
  acceptedIncomingFriendRequests: [],
  acceptedOutgoingFriendRequests: [],
  airplaneModeReminderOpacity: new Animated.Value(0),
  amNotification: false,
  amNotificationTime: AM_NOTIFICATION_TIME,
  autoSyncCompletedSits: true,
  backgroundColor: '#001709',
  contactsNotOnApp: [],
  customDuration: 60,
  displayName: null,
  finished: false,
  hasChanting: true,
  hasExtendedMetta: false,
  history: [],
  historyViewIndex: 1,
  incomingFriendRequests: [],
  isEnoughTime: true,
  isOldStudent: null,
  latestTrack: null,
  mainScreenSwitcherIndex: 0,
  notifications_allowed: false,
  onesignal_id: null,
  onlineSits: [],
  outgoingFriendRequests: [],
  pmNotification: false,
  pmNotificationTime: PM_NOTIFICATION_TIME,
  recentlyJoinedContacts: [],
  rejectedFriendRequests: [],
  safeAreaInsetBottom: 0,
  safeAreaInsetTop: 18,
  screen: INITIAL_SCREEN,
  showHistoryBtnTooltip: false,
  timeouts: [],
  titleOpacity: new Animated.Value(1),
  user: null,
};

type Action =
  | {
      payload: Partial<State>;
      type: 'SET_STATE';
    }
  | {
      key: Toggleables;
      type: 'TOGGLE';
    };

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case 'SET_STATE':
      return {...state, ...action.payload};
    case 'TOGGLE':
      return {
        ...state,
        ...{
          [action.key]: !state[action.key],
        },
      };
    default:
      return state;
  }
};

export default reducer;
