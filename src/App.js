import "./App.css";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import api from "./api/Contact";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditContact from "./components/EditContact";
import contact from "./api/Contact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";

  //Incase of local storage used

  // const [contacts, setContacts] = useState(
  //   JSON.parse([localStorage.getItem(LOCAL_STORAGE_KEY)]) || []
  // );

  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: Math.random(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const editContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: Math.random(),
      ...contact,
    };
    const response = await api.put(`/contacts/${contact.id}`, request);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  //Retrieve contacts using httpclient api axios

  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response;
  };

  //use effect to retrieve contact details from api call

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts.data);
    };
    getAllContacts();
  }, []);

  //use effect to retrive items from localstorage

  // useEffect(() => {
  //   const item = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (item) {
  //     console.log("Items are" + item);
  //     setContacts(item);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contactItem) => {
      return contactItem.id != id;
    });
    setContacts(newContactList);
  };

  const searchHandler = async (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  return (
    <Router>
      <Header />
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <ContactList
              {...props}
              contactItem={searchTerm.length < 1 ? contacts : searchResults}
              getContactsAfterDeleted={removeContactHandler}
              term={searchTerm}
              searchKeyWord={searchHandler}
            />
          )}
        />
        <Route
          path="/add"
          render={(props) => (
            <AddContact {...props} addContactHandler={addContactHandler} />
          )}
        />
        <Route
          path="/edit"
          render={(props) => (
            <EditContact {...props} editContactHandler={editContactHandler} />
          )}
        />
        <Route path="/contact:id" component={ContactDetail} />
      </Switch>
    </Router>
  );
}

export default App;
