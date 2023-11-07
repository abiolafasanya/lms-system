import * as React from 'react';
import { Body, Container, Head, Heading, Html, Img, Link, Preview, Text } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

interface EmailTemplateProps {
  firstName: string;
}

export default function WelcomeEmailTemplate({ firstName = 'Abiola Fasanya' }: EmailTemplateProps) {
  return (
    <Html>
      <Head></Head>
      <Tailwind>
        <Body>
          <Heading></Heading>
          <Container className="flex justify-center h-screen px-10 py-10 mx-auto bg-white">
            <Text className="text-2xl">Header</Text>
            <Text className="text-stone-500 text-4xl">Welcome, {firstName}!</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
