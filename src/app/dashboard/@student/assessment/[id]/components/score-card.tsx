'use client';
import { Fragment } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Score {
  score: number;
  percentage: number;
}
const ScoreCard = ({ percentage, score }: Score) => {
  return (
    <Fragment>
      <CardHeader>
        <CardTitle>Assessment Completed</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Total Score: {score}</CardDescription>
        <CardDescription>Total Percentage: {percentage}</CardDescription>
      </CardContent>
    </Fragment>
  );
};

export default ScoreCard;
