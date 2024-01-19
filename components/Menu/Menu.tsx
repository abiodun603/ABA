import React, { FC } from 'react'

// ** Third Party
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {  Button, Menu } from '@gluestack-ui/themed'

interface ICustmenuProps {
  children : any
}

export const CustomMenu: FC<ICustmenuProps> = ({children}) => {
  return (
    <Menu
      placement="bottom left"
      trigger={({ ...triggerProps }) => {
        return (
          <Button backgroundColor='transparent' {...triggerProps}>
            <MaterialIcons name='more-vert' size={30} />
          </Button>
        )
      }}
    >
      {children}
    </Menu>
  )
}
