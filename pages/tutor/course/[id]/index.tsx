import React, { useState, useEffect } from 'react';
import Tutor from '@layout/Tutor';
import Container from '@utility/Container';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const courseCurriculum = [
    {
        id: 1,
        title: 'HTML Fundamentals',
        topics: [
            {id: 1, title: 'Section Intro', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 2, title: 'Introduction to HTML', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 3, title: 'Text Element', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 4, title: 'More Text Element: Lists', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 5, title: 'Section Intro',video: 'https://youtube.com', duration: new Date(Date.now())},
        ]
    },
    {
        id: 2,
        title: 'HTML Fundamentals',
        topics: [
            {id: 1, title: 'Section Intro', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 2, title: 'Introduction to HTML', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 3, title: 'Text Element', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 4, title: 'More Text Element: Lists', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 5, title: 'Section Intro',video: 'https://youtube.com', duration: new Date(Date.now())},
        ]
    },
    {
        id: 3,
        title: 'HTML Fundamentals',
        topics: [
            {id: 1, title: 'Section Intro', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 2, title: 'Introduction to HTML', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 3, title: 'Text Element', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 4, title: 'More Text Element: Lists', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 5, title: 'Section Intro',video: 'https://youtube.com', duration: new Date(Date.now())},
        ]
    },
    {
        id: 4,
        title: 'HTML Fundamentals',
        topics: [
            {id: 1, title: 'Section Intro', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 2, title: 'Introduction to HTML', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 3, title: 'Text Element', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 4, title: 'More Text Element: Lists', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 5, title: 'Section Intro',video: 'https://youtube.com', duration: new Date(Date.now())},
        ]
    },
    {
        id: 5,
        title: 'HTML Fundamentals',
        topics: [
            {id: 1, title: 'Section Intro', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 2, title: 'Introduction to HTML', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 3, title: 'Text Element', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 4, title: 'More Text Element: Lists', video: 'https://youtube.com', duration: new Date(Date.now())},
            {id: 5, title: 'Section Intro',video: 'https://youtube.com', duration: new Date(Date.now())},
        ]
    },
]

const show = () => {
  return (
    <Tutor>
      <Container>
        <header className={headerStyle}>
          <h2 className="sm:text-2xl md:text-3xl font-semibold   text-center">Introduction to HTML 5</h2>
          <button className="btn rounded-full inline-block">Enroll for free</button>
        </header>
        <section className='max-w-2xl mx-auto mt-14 flex flex-col justify-center items-center'>
            <h2 className="text-2xl font-semibold text-center">About this course</h2>
            <p className='text-base text-center'>
            Learn about the basics of the HTML.<br />
            HTML5 is a markup language used for structuring and presenting content on the World Wide Web. 
            It is the fifth and final major HTML version that is a World Wide Web Consortium (W3C) recommendation.
            The current specification is known as the HTML Living Standard.
            </p>
        </section>

        <section className='md:max-w-4xl mx-auto mt-14 px-5 flex flex-col md:space-y-5'>
            <h2 className="text-2xl font-semibold text-center">Course Curriculum</h2>
            {
                courseCurriculum && 
                courseCurriculum.map((curriculum, index) => (

                    <div key={index}>
                        <h2 className="text-lg font-semibold bg-gray-300 p-2">{curriculum.title}</h2>
                        <menu className="w-full">
                                {curriculum.topics.map((topic, index) => (
                                    <div key={index} className='flex justify-between my-2'>
                                        <div>{topic.title}</div>
                                        <Link href={topic.video}  className="btn rounded-sm">Start</Link>
                                    </div>
                                ))}
                        </menu>
                    </div>
                ))
            }
        </section>
      </Container>
    </Tutor>
  );
};

const headerStyle = 'bg-gray-300 py-24 px-7 flex flex-col space-y-8 justify-center items-center ';
export default show;
