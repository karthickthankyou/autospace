import create from 'zustand'
import { LocationInfo } from '@autospace-org/hooks/src/location'

export type ViewState = {
  latitude: number
  longitude: number
  zoom?: number
}

export type LngLatTuple = [number, number]
export type DirectionType = {
  start?: LngLatTuple
  end?: LngLatTuple
}

type MapSliceType = {
  selectedGarage: number | null
  selectedHome: boolean
  updatedViewState?: ViewState
  direction: DirectionType
  prevSearches: LocationInfo[]
  addPrevSearches: (loc: LocationInfo) => void
  setSelectedGarage: (garage: number) => void
  setUpdatedViewState: (viewState: ViewState) => void
  setDirectionStart: (start: LngLatTuple) => void
  setDirectionEnd: (end: LngLatTuple) => void
}

export const useMapStore = create<MapSliceType>((set) => ({
  selectedGarage: null,
  selectedHome: false,
  direction: {},
  prevSearches: [],

  // Reducers
  addPrevSearches: (location: LocationInfo) =>
    set((state) => {
      state.prevSearches = [
        location,
        ...state.prevSearches.filter(
          (item) => item.placeName !== location.placeName,
        ),
      ].slice(0, 5)
      return state
    }),
  setSelectedGarage: (garage: number | null) =>
    set((state) => {
      state.selectedGarage = garage
      return state
    }),

  setUpdatedViewState: (viewState: ViewState) =>
    set((state) => {
      state.updatedViewState = viewState
      return state
    }),
  setDirectionStart: (start: LngLatTuple) =>
    set((state) => {
      state.direction.start = start
      return state
    }),
  setDirectionEnd: (end: LngLatTuple) =>
    set((state) => {
      state.direction.end = end
      return state
    }),
}))
