// ** Interface Types
export interface Profile {
  firstname:  string
  lastname:   string
  username:   string
  location:   string
  short_bio:  string
  roles:      string
}

export interface ProfileResponse {
  docs: Profile
  profile: Profile
}
