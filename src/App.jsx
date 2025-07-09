import { useState } from "react";
import { initialFriends } from "./data";
export default function App() {
  //Add create friend state
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  //Handle to render the friends in UI
  function handleShowFriend() {
    setShowAddFriend(!showAddFriend);
  }

  // Handle to Add new friends in UI
  function handleAddFriend(newFriend) {
    setFriends((prevFriends) => [...prevFriends, newFriend]);
    setShowAddFriend(false);
  }

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendList friends={friends} />
          {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
          <Button onClick={handleShowFriend}>
            {!showAddFriend ? "Add Friend" : "Close"}
          </Button>
        </div>
        <FormSplitBill />
      </div>
    </>
  );
}

function FriendList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
}

//MAIN FRIEND BOX
function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}&#8377;
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}&#8377;
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even!</p>}
      <Button>Select</Button>
    </li>
  );
}

//Button Component
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

//Add Friend Section
function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  // Submit function on form
  function handleSubmit(e) {
    e.preventDefault();

    //guard clause!
    if (!name || !image) return;
    const id = crypto.randomUUID(); //Its a method of in built browser feature to make a random ID
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🫂Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌃Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💵 Bill Value</label>
      <input type="text" />

      <label>💰 Your Expenses</label>
      <input type="text" />

      <label>💰 X's Expenses</label>
      <input type="text" disabled />

      <label>💳Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Add</Button>
    </form>
  );
}
