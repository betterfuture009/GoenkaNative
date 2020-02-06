import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { Animated } from 'react-native'
import Sound from 'react-native-sound'

import { ScreenNames } from './screens'

const INITIAL_SCREEN = 'InitScreen'

export type SitProps = {
  date: Date
  duration: number
  elapsed: number
  hasChanting?: boolean
  hasExtendedMetta?: boolean
  selected?: boolean
}

type ToggleableStates = {
  amNotification: boolean
  finished: boolean
  hasChanting: boolean
  hasExtendedMetta: boolean
  isEnoughTime: boolean
  pmNotification: boolean
  showHistoryBtnTooltip: boolean
}

export interface State extends ToggleableStates {
  amNotificationTime: Date
  duration: number
  history: SitProps[]
  historyViewIndex: number
  latestTrack: Sound | null
  pmNotificationTime: Date
  safeAreaInsetBottom: number
  safeAreaInsetTop: number
  screen: ScreenNames
  timeouts: ReturnType<typeof setTimeout>[]
  titleOpacity: Animated.Value
  user: FirebaseAuthTypes.User | null
}

export type Toggleables = keyof ToggleableStates

export type setStatePayload = Partial<State>

export interface Props extends State {
  setState: (payload: setStatePayload) => void
  toggle: (key: Toggleables) => () => void
}

const initialState: State = {
  amNotification: false,
  amNotificationTime: new Date('Jan 1, 2020 08:00 AM'),
  duration: 60,
  finished: false,
  hasChanting: true,
  hasExtendedMetta: false,
  history: [],
  historyViewIndex: 0,
  isEnoughTime: true,
  latestTrack: null,
  pmNotification: false,
  pmNotificationTime: new Date('Jan 1, 2020 08:15 PM'),
  safeAreaInsetBottom: 0,
  safeAreaInsetTop: 0,
  screen: INITIAL_SCREEN,
  showHistoryBtnTooltip: false,
  timeouts: [],
  titleOpacity: new Animated.Value(1),
  user: null,
}

type Action =
  | {
      payload: Partial<State>
      type: 'SET_STATE'
    }
  | {
      key: Toggleables
      type: 'TOGGLE'
    }

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case 'SET_STATE':
      return { ...state, ...action.payload }
    case 'TOGGLE':
      return {
        ...state,
        ...{
          [action.key]: !state[action.key],
        },
      }
    default:
      return state
  }
}

export default reducer
