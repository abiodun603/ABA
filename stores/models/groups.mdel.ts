interface GroupsCreator {
  email: string
}

export interface GroupsResponse {
  docs: any
  title: string
  description: string
  location: string
  time: string
  data: string
  user: GroupsCreator
}

export interface GroupsDetailsResponse {
  community_name: string;
  members: any[]
  
}