import React from "react";

import "components/Appointment/styles.scss"

import bookInterview from "components/Application"
import useVisualMode from "hooks/useVisualMode";

import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Form from "components/Appointment/Form.js"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );

  function save(name, interviewer) {
    console.log("name and interviewer:", name, interviewer)
    const interview = {
      student: name,
      interviewer
    }

    props.bookInterview(props.id, interview);
    transition(SHOW);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} />}
    </article>
  );
};