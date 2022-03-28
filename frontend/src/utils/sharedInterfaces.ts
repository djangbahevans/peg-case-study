import { format } from "date-fns"
import { ReactChild } from "react"

export type IReservationCreate = {
  facility: "Swimming Pool" | "Tennis Court" | "Gym" | "Conference Room"
  time: string
}

export type IReservation = {
  id: number
  user_id: number
  created_at: string
} & IReservationCreate

export type IPaymentCreate = {
  amount: number
  username: string
}

export type IPayment = {
  id: number
  user_id: number
  amount: number
  created_at: string
}

export type IError = {
  detail: string
}

export type IApproveUserResponse = {
  password: string
}

export interface IUser {
  id: number
  first_name: string
  last_name: string
  username: string
  dob: string
  address: string
  hobbies: string[]
  national_id: string
  is_admin: boolean
  is_active: boolean
  amount_paid: number
  created_at: Date
}

export interface IUserCreate {
  first_name: string
  last_name: string
  dob: Date | string
  address: string
  hobbies: string[]
  national_id: string
  is_admin: boolean
}

export interface IAuthContext {
  isAuthenticated: boolean;
  loading: boolean;
  user?: IUser;
  login: ({ username: email, password }: ILoginVariables) => Promise<ILoginResponse>
  logout: () => void
}

export interface ILoginResponse {
  access_token: string
  token_type: string
}

export interface ILoginVariables {
  username: string
  password: string
}

export interface IPaginateResponse<T> {
  count: number
  data: T
}

export interface IProviderProps {
  children?: ReactChild | ReactChild[]
}

export interface IThemeContext {
  toggleTheme: () => void
  mode: "light" | "dark"
}

export const paymentDefaults: IPaymentCreate = {
  amount: 0,
  username: ""
}

export const createUserDefaults: IUserCreate = {
  first_name: "",
  last_name: "",
  dob: format(new Date(), "yyyy-MM-dd"),
  address: "",
  hobbies: [],
  national_id: "",
  is_admin: false
}

export const themeContextDefautls: IThemeContext = {
  toggleTheme: () => { },
  mode: "light"
}

export const authContextDefaults: IAuthContext = {
  isAuthenticated: false,
  loading: false,
  login: () => new Promise<ILoginResponse>(() => { }),
  logout: (): void => { }
}
