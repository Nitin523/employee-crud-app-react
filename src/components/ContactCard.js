import React from "react";
import { Link } from "react-router-dom";

const card = (props) => {
  const { id, name, email } = props.contact;
  return (
    <div className="item">
      <div className="content">
        <Link
          to={{
            pathname: `/contacts/${name}`,
            state: { contact: props.contact },
          }}
        >
          <div className="header"> {id} </div>
          <div className="header"> {name} </div>
          <div className="header"> {email} </div>
        </Link>
        <button
          className="trash alternate outline icon"
          onClick={() => props.clickHandler(id)}
        >
          Delete
        </button>
        <Link
          to={{
            pathname: "/edit",
            state: { contact: props.contact },
          }}
        >
          <button className="trash alternate outline icon">update</button>
        </Link>
        <hr />
      </div>
    </div>
  );
};
export default card;
