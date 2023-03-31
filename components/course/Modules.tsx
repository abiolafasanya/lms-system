import React from 'react'
import { Lesson, Module } from '@prisma/client'
import Link from 'next/link'
import {MdOutlineFilePresent} from 'react-icons/md'

interface ICourse extends Module {
    lessons: Lesson[]
}

type Iprops = {
    modules: ICourse[];
}



const Modules: React.FC<Iprops> = ({modules}) => {
  return (
    <section className='md:max-w-4xl mx-auto mt-14 px-5 flex flex-col md:space-y-5'>
            <h2 className="text-2xl font-semibold text-center">Course Module</h2>
            {
                modules && 
                modules.map((module, index) => (

                    <div key={index}>
                        <h2 className="text-lg font-semibold bg-gray-300 p-2">{module.title}</h2>
                        <menu className="w-full">
                                {module.lessons.map((lesson, index) => (
                                    <div key={index} className='flex justify-between my-2'>
                                        <div>{lesson.title}</div>
                                        {
                                            lesson.file &&
                                            (<Link href={lesson.file as string} target="blank"  className="bg-gray-500 px-5 py-2 rounded-sm">
                                                <MdOutlineFilePresent className="text-2xl text-gray-200" />
                                            </Link>)
                                        }
                                        {
                                            lesson.video &&
                                            (<Link href={lesson.video as string}  className="btn rounded-sm">Start</Link>)
                                        }
                                        
                                    </div>
                                ))}
                        </menu>
                    </div>
                ))
            }
    </section>
  )
}

export default Modules