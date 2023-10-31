// ** Interface Types
export interface Profile {
  firstname:  string
  name:       string
  username:   string
  location:   string
  short_bio:  string
  roles:      string
}

export interface ProfileResponse {
  docs: Profile
  user: Profile
}
