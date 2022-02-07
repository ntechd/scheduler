import React from "react";
import DayListItem from "./Daylistitem";

export default function DayList(props) {
  return (
    <ul>
      {props.days.map((day) => {
        return (
          <DayListItem
            key={day.id}
            selected={day.name === props.value}
            name={day.name}
            spots={day.spots}
            setDay={props.onChange}
          />
        );
      })}
    </ul>
  );
}
