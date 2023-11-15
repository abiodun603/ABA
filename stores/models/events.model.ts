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
  event_address: string;
  status: string
  hosted_by: any[]
  members: any[]
  user: EventCreator
}

export interface EventRequest {
  event_time: string
  event_city: string
  event_name: string
  event_date: Date
  event_types: string
  event_about: string
  event_address: string
  event_tags: any[]
  status: string
  hosted_by: any[]
  members: any[]
}
