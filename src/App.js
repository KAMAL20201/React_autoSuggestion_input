import "./App.css";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

function App() {
  const [users, setUsers] = useState([]);
  const [inputText, setInputText] = useState("");
  const [inputFilteredUsers, setinputFilteredUsers] = useState([]);
  const [userClicked, setUserClicked] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleInput = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setInputText(inputValue);

    if (inputValue === "") {
      setinputFilteredUsers([]);
      setUserClicked(false);
      setFilteredUsers(users);
    } else {
      let myFilterUsers = users.filter(
        (user) =>
          user.firstName.toLowerCase().startsWith(inputValue) ||
          user.lastName.toLowerCase().startsWith(inputValue)
      );
      setinputFilteredUsers(myFilterUsers);
    }
  };

  const handleClick = (user) => {
    setInputText(`${user.firstName} ${user.lastName}`);
    setUserClicked(true);
  };

  useEffect(() => {
    async function getUsers() {
      const response = await fetch("https://dummyjson.com/users?limit=100");
      const data = await response.json();
      setUsers(data.users);
      setFilteredUsers(data.users);
    }
    getUsers();
  }, []);

  useEffect(() => {
    if (userClicked) {
      setFilteredUsers([
        inputFilteredUsers.find(
          (user) => `${user.firstName} ${user.lastName}` === inputText
        ),
      ]);
    }
  }, [userClicked, inputFilteredUsers, inputText]);

  return (
    <div className="App">
      <h1>Search For Users</h1>
      <input
        className="input"
        value={inputText}
        onChange={handleInput}
        placeholder="Find a user"
      />
      {inputFilteredUsers.length > 0 && !userClicked && (
        <UsersList>
          <ul>
            {inputText &&
              inputFilteredUsers.map((user) => (
                <li onClick={() => handleClick(user)} key={user.id}>
                  {user.firstName} {user.lastName}
                </li>
                
              ))}
          </ul>
        </UsersList>
      )}
      <div className="users">
        {filteredUsers.map((user) => {
          return (
            <div className="user" key={user.id}>
              <h5>
                FirstName: <span className="span">{user.firstName}</span>
              </h5>
              <h5>
                LastName:<span className="span">{user.lastName}</span>
              </h5>
              <h5>
                Age:<span className="span">{user.age}</span>
              </h5>
              <h5>
                Gender:<span className="span">{user.gender}</span>
              </h5>
              <h5>
                bloodGroup:<span className="span">{user.bloodGroup}</span>
              </h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

const UsersList = styled.div`
  border: 2px solid rgba(0, 0, 0);
  width: 29.6%;
  margin: 0px auto;
  position: absolute;
  left: 34.6%;
  z-index: 1;
  padding: 5px;
  background:white;
  ul {
    /* margin: 5px 10px; */
    padding: 0px;
    list-style-type: none;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background: white;
    li {
      cursor: pointer;
      padding: 2px 0px;
    }
  }
`;
