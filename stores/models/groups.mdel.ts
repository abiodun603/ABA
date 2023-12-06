interface GroupsCreator {
  email: string
}

export interface GroupRequest {
  id?: string
  community_name: string
  community_description: string
  status: string
  members: string[] 
}

export interface AddGroupAdminRequest {
  communityId: string
  userId: string
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