import React, {useEffect, useState} from 'react'
import Admin from '@layout/Admin'
import { PrismaClient, User } from '@prisma/client';
import {GetServerSideProps} from 'next'

type Iprops = {
  users: User[]
}
const roles = ({users}: Iprops) => {
   const [maxUser, setMaxUser] = useState(Math.min(users.length, 6));

  return (
    <Admin> 
     <section className='md:max-w-6xl mx-auto'>
      <h2 className='text-2xl'>Assign Role</h2>
      <div className='flex justify-between w-full mb-8'>
        <div className="w-1/2">
      <h2 className='text-xl'>Permission</h2>
        <form>
          <div className='form-group'>    
            <label htmlFor='user'>Name</label>
            <input className="form-control" id="user" list="users" />

            <datalist id="users">
              {users.map((user, index) => (
                <option key={index} value={user.name ? user.name : user.username as string} />
              ))}
            </datalist>
          </div>
          <div className='form-group'>    
            <label htmlFor='role'>Role</label>
            <select id="role" defaultValue='user'>
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
              <option value='tutor'>Tutor</option>
            </select>
          </div>
        </form>
        </div>
        <div className="w-1/2">
          <h2 className='text-xl'>Role</h2>
          <div className='flex justify-between items-center'>
            <label htmlFor='limit'>Limit</label>
            <input type='number' id='limit' className='px-5 py-2' onChange={(e) => setMaxUser(e.target.value)} />
          </div>
          <menu className='card'>
            {
               users.map((user: any, index) => (
                <div key={user.id}>
                { index < maxUser && (
                  <>
                  <div className='p-2 rounded-sm flex justify-between'>
                    <h3>{user?.name? user.name : user.username as string}</h3>
                    <h4>{user?.role as string}</h4>
                  </div>
                <div className='border-b'></div>
                </>
                ) 
               }
                </div>
               ))
            }
            
          </menu>
        </div>
      </div>
     </section>
    </Admin>
  )
}

export default roles


export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return  {
    props:  {
      users: JSON.parse(JSON.stringify(users))
    }
  }
}