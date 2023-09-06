import { Metadata } from "next";
import { ReactNode } from "react"

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login to your dashboard',
    keywords: 'learning, learning management system, software development, education, technologiy, software, training, students, tutors, digital learning, digital education'
  }

const AuthLayout = ({children}: {children: ReactNode}) => {
    return ( <div>{children}</div> );
}
 
export default AuthLayout;