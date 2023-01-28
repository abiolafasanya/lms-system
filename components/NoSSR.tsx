import React, {ReactNode, Fragment} from 'react'
import dynamic from 'next/dynamic'

type propType = {
    children: ReactNode
}

const NoSSR = ({children}: propType) => {
  return (
    <Fragment>{children}</Fragment>
  )
}

export default dynamic(() => Promise.resolve(NoSSR), {
    ssr: false
})