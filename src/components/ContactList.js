import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
  const InputE1 = useRef("");

  const deleteContactHandler = (id) => {
    props.getContactsAfterDeleted(id);
  };

  const readContacts = props.contactItem.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        key={contact.id}
        clickHandler={deleteContactHandler}
      />
    );
  });

  const getSearchTerm = () => {
    // console.log(InputE1.current.value);
    props.searchKeyWord(InputE1.current.value);
  };

  return (
    <div className="ui celled list">
      <h3 className="header-ui">
        Contact list
        <Link to="/add">
          <button className="add contact btn"> Add Contact</button>
        </Link>
      </h3>
      <div className="ui search">
        <div className="search--bar">
          <input
            ref={InputE1}
            type="text"
            placeholder="Search"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <button> Search</button>
        </div>
      </div>
      <hr />
      {readContacts.length > 0
        ? readContacts
        : `No contact found with ${props.term}`}
    </div>
  );
};

export default ContactList;
