"use client"
import { Fragment } from "react";
import { Progress } from "@/components/ui/progress";

const ProgressIndicator = () => {
  return (
    <Fragment>
      <section>
        <div>React - Week 4</div>
        <Progress value={(4 / 13) * 100} className="transition delay-700 ease-in-out" />
      </section>
      <section>
        <div>Overall Point</div>
        <Progress value={(275 / 300) * 100} className="transition delay-700 ease-in-out" />
      </section>
      <section>
        <div>Stages Completed</div>
        <Progress value={(3 / 9) * 100} className="transition delay-700 ease-in-out" />
      </section>
    </Fragment>
  );
};

export default ProgressIndicator;
