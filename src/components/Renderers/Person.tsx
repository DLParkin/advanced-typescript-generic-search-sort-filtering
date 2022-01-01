import React from "react";
import Moment from "react-moment";
import IPerson from "../../interfaces/iPerson";

export const Person = (props: IPerson): JSX.Element => {
  const { firstName, lastName, birthday, eyeColor } = props;
  return (
    <div className="col-12 p-3">
      <div className={"card"}>
        <div className="card-body">
          <h1 className="card-title">{`${firstName} ${lastName}`}</h1>
          <p className="card-text">{eyeColor}</p>
        </div>
        <div className="card-footer text-muted float-right">
          <Moment format="MMMM D, YYYY" date={birthday} />
        </div>
      </div>
    </div>
  );
};
