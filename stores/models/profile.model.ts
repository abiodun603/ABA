// ** Interface Types
export interface Profile {
  firstname:  string
  imageUrl:   string
  name:       string
  username:   string
  location:   string
  short_bio:  string
  roles:      string
  id:         string
}

export interface ProfileResponse {
  docs: Profile[];
  user: Profile
}
