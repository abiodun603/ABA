interface EventCreator {
  email: string
}

interface IDoc {
  title: string
  description: string
  location: string
  time: string
  data: string
}

export interface EventResponse {
  docs: any
  title: string
  description: string
  location: string
  time: string
  data: string
  user: EventCreator
}