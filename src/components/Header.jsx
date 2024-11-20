import { useState } from "react";
import AddContacts from "./AddContacts";
import inputs from "./inputs";
import ContactsList from "./ContactsList";
import styles from "./Header.module.css"

function Header() {
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    job: "",
    phone: "",
    id: "",
  });

  const addContact = (newContact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  const searchHandler = (e) => {
    setSearch(e.target.value.toLowerCase().trim());
  };

  const toggleContactSelection = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id)
        ? prev.filter((contactId) => contactId !== id)
        : [...prev, id]
    );
  };

  const deleteSelectedContacts = () => {
    setContacts((prev) =>
      prev.filter((contact) => !selectedContacts.includes(contact.id))
    );
    setSelectedContacts([]);
    setIsVisible(!isVisible);
  };

  return (
    <>
    <div className={styles.container}>
      <div>
      <p>Searching Contacts:</p>
      <input
        type="text"
        placeholder="search"
        onChange={searchHandler}
        value={search}
      />

      <button onClick={deleteSelectedContacts}>-</button>
      <button onClick={() => setShowComponent(true)}>+</button>
      </div>

    </div>
      {showComponent && (
        <AddContacts
          addContact={addContact}
          setShowComponent={setShowComponent}
          contact={contact}
          setContact={setContact}
        />
      )}
      <ContactsList
        contacts={contacts}
        setContacts={setContacts}
        toggleContactSelection={toggleContactSelection}
        search={search}
        isVisible={isVisible}
      />
      <button className={styles.btn}  onClick={deleteSelectedContacts} style={{display: isVisible ? "block":"none"}}>Delete</button>
      </>
  );
}

export default Header;
