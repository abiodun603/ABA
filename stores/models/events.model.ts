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
  event_time: string
  event_city: string
  event_name: string
  event_about: string
  status: string
  hosted_by: any[]
  members: any[]
  user: EventCreator
}