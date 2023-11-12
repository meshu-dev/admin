export interface LaravelListResponse {
  data: {
    data: Array<any>
    meta: {
      total: number
    }
  }
}

export interface LaravelSingleResponse {
  data: {
    data: any
  }
}

export interface LaravelAuthResponse {
  data: {
    token: string
  }
}
