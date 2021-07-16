class BackendResult<A> {
  data: A
  error: string | null

  constructor() {
    this.data = {} as A
    this.error = null
  }

  isError(): boolean {
    return this.error !== null
  }
}

export default BackendResult
