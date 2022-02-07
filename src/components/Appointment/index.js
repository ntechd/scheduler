import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR SAVE";
  const ERROR_DELETE = "ERROR DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then((response) => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function editing(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .editInterview(props.id, interview)
      .then((response) => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  }

  const deleting = () => {
    transition(DELETE, true);

    props
      .deleteInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  };

  const confirmation = () => {
    transition(CONFIRM);
  };

  const edit = () => {
    transition(EDIT);
  };

  function fetchInterviewerName(interviewers, interviewerId) {
    const interviewer = interviewers.find((int) => int.id === interviewerId);
    if (!interviewer) return;
    else return interviewer.name;
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          name={fetchInterviewerName(
            props.interviewers,
            props.interview.interviewer
          )}
          onDelete={confirmation}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={editing}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === DELETE && <Status message="Deleting..." />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this appointment?"
          onCancel={back}
          onConfirm={deleting}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Looks like we ran into an error while saving the data"
          onClose={back} 
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Looks like we ran into an error while deleting the data"
        onClose={back} 
        />
      )}
    </article>
  );
}
