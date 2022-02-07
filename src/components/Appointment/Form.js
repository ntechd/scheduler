import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");

  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const [error, setError] = useState("");

  const reset = function () {
    setStudent("");
    setInterviewer(null);
    setError("");
  };

  const cancelForm = function () {
    reset();
    props.onCancel();
  };

  const validate = function () {
    if (!student) {
      return setError("Student name cannot be blank");
    }

    if (!interviewer) {
      return setError("You need to select an interviewer");
    }
    props.onSave(student, interviewer);
    reset();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            value={student}
            onChange={(event) => {
              setStudent(event.target.value);
            }}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancelForm}>
            Cancel
          </Button>
          <Button
            confirm
            onClick={() => {
              validate(student)
              // props.onSave(student, interviewer);
            }}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
