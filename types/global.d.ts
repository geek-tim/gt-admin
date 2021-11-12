declare interface ViteEnv {
  VITE_PORT: number
  VITE_USE_MOCK: boolean
  VITE_GLOB_APP_TITLE: string
}
declare type Recordable<T = any> = Record<string, T>
declare type Nullable<T> = T | null
declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
declare type ComponentSize = 'large' | 'medium' | 'small' | 'mini'
