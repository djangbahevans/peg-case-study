import { IApproveUserResponse, IError, ILoginResponse, ILoginVariables, IPaginateResponse, IPayment, IPaymentCreate, IReservation, IReservationCreate, IUser, IUserCreate } from "../utils/sharedInterfaces"


// RESERVATION CRUD
export const getReservations = async (queryKey: any): Promise<IPaginateResponse<IReservation[]>> => {
  const page: number = queryKey["queryKey"][1]
  const rowsPerPage: number = queryKey["queryKey"][2]

  const response = await fetch(`${process.env.REACT_APP_API_URL}/reservations?skip=${page * rowsPerPage}&limit=${rowsPerPage}`, {
    method: 'get',
    mode: "cors",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
  })

  const count = parseInt(response.headers.get("x-total-count")!)

  const data: IReservation[] | IError = await response.json()
  if ("detail" in data)
    throw new Error(`Code ${response.status}: ${data.detail}`)

  return { count, data }
}

export const createReservation = async (reservation: IReservationCreate): Promise<IReservation> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/reservations`, {
    method: "post",
    mode: "cors",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`,
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({ ...reservation })
  })

  const data: IReservation | IError = await response.json()

  if ("detail" in data)
    throw new Error(`Code ${response.status}: ${data.detail}`)

  return data
}

export const deleteReservation = async (id: number) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/reservations/${id}`, {
    method: 'delete',
    mode: "cors",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
  })

  if (response.status !== 204) {
    const data: IError = await response.json()
    throw new Error(`Code ${response.status}: ${data.detail}`)
  }
}

// PAYMENTS CRUD
export const getPayments = async (queryKey: any): Promise<IPaginateResponse<IPayment[]>> => {
  const page: number = queryKey["queryKey"][1]
  const rowsPerPage: number = queryKey["queryKey"][2]

  const response = await fetch(`${process.env.REACT_APP_API_URL}/payments?skip=${page * rowsPerPage}&limit=${rowsPerPage}`, {
    method: 'get',
    mode: "cors",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
  })

  const count = parseInt(response.headers.get("x-total-count")!)

  const data: IPayment[] | IError = await response.json()
  if ("detail" in data)
    throw new Error(`Code ${response.status}: ${data.detail}`)

  return { count, data }
}

export const createPayment = async (payment: IPaymentCreate): Promise<IPayment> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/payments`, {
    method: "post",
    mode: "cors",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`,
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({ ...payment })
  })

  const data: IPayment | IError = await response.json()

  if ("detail" in data)
    throw new Error(`Code ${response.status}: ${data.detail}`)

  return data
}

// USERS CRUD
export const createUser = async (user: IUserCreate): Promise<IUser> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({ ...user, })
  })

  const data: IUser | IError = await response.json()
  if ("detail" in data)
    throw new Error(`Code ${response.status}: ${data.detail}`)

  return data
}

export const createUserByAdmin = async (user: IUserCreate): Promise<IUser> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/by-admin`, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "authorization": `Bearer ${localStorage.getItem("access_token")}`
    },
    body: JSON.stringify({ ...user, })
  })

  const data: IUser | IError = await response.json()
  if ("detail" in data)
    throw new Error(`Code ${response.status}: ${data.detail}`)

  return data
}

export const approveUser = async (username: string): Promise<IApproveUserResponse> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/approve/${username}`, {
    method: 'put',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "authorization": `Bearer ${localStorage.getItem("access_token")}`
    },
    // body: JSON.stringify({ ...user, })
  })

  const data: IApproveUserResponse | IError = await response.json()
  if ("detail" in data)
    throw new Error(`Code ${response.status}: ${data.detail}`)

  return data
}

export const getUsers = async (queryKey: any): Promise<IPaginateResponse<IUser[]>> => {
  const page: number = queryKey["queryKey"][1]
  const rowsPerPage: number = queryKey["queryKey"][2]

  const response = await fetch(`${process.env.REACT_APP_API_URL}/users?skip=${page * rowsPerPage}&limit=${rowsPerPage}`, {
    method: 'get',
    mode: "cors",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
  })

  const count = parseInt(response.headers.get("x-total-count")!)

  const data: IUser[] | IError = await response.json()
  if ("detail" in data)
    throw new Error(`Code ${response.status}: ${data.detail}`)

  return { count, data }
}

export const getMe = async (): Promise<IUser> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
    method: 'get',
    mode: 'cors',
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
  })

  const data: IUser | IError = await response.json()
  if ("detail" in data)
    throw new Error(`Code ${response.status}: ${data.detail}`)

  return data
}

export const getUserbyId = async (id: number): Promise<IUser> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
    method: 'get',
    mode: "cors",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
  })

  const data: IUser | IError = await response.json()
  if ("detail" in data)
    throw new Error(`Code ${response.status}: ${data.detail}`)

  return data
}

export const deleteUser = async (id: number) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
    method: 'delete',
    mode: "cors",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
  })

  if (response.status !== 204) {
    const data: IError = await response.json()
    throw new Error(`Code ${response.status}: ${data.detail}`)
  }
}

export const login = async ({ username: email, password }: ILoginVariables): Promise<ILoginResponse> => {
  let formBody: string[] | string = [];
  formBody.push(`${encodeURIComponent("username")}=${encodeURIComponent(email)}`)
  formBody.push(`${encodeURIComponent("password")}=${encodeURIComponent(password)}`)
  formBody = formBody.join('&')

  const response = await fetch(`${process.env.REACT_APP_API_URL}/login/access-token`, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })
  const data: ILoginResponse | IError = await response.json()

  if ("detail" in data)
    throw new Error(`Code ${response.status}: ${data.detail}`)

  return data

}
