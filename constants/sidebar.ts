const screens = {
    main_layout: "MainLaoyout",
    home: "Home",
    resources: "Resources",
    events: "Events",
    settings: "Settings",
    chats: "Chats",
    community: "Events",
    profile: "Profile",
    contact: "Explore",
    rate: "Rate Us",
    support: "Support"

}

const sidebar__tabs = [
    {
        id: 0,
        label: screens.home,
    },
    {
      id: 1,
      label: screens.contact
    },
    {
        id: 2,
        label: screens.chats
    },
    {
        id: 3,
        label: screens.community
    },
    {
        id: 4,
        label: screens.profile
    },
    {
      id: 5,
      label: screens.rate
    },
    {
      id: 6,
      label: screens.contact
    },
    {
      id: 7,
      label: screens.support
    }
]

const constants = { sidebar__tabs, screens };

export default constants;