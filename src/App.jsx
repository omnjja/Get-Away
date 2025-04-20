import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  let totalItems = items.length;
  let packedItemsNumber = items.filter((item) => item.packed === true).length;
  let percent =
    packedItemsNumber !== 0 ? (packedItemsNumber / totalItems) * 100 : 0;

  return (
    <div className="app">
      <Header />
      <Form items={items} setItems={setItems} />
      <PackingList items={items} setItems={setItems} />
      <Footer
        totalItems={totalItems}
        packedItemsNumber={packedItemsNumber}
        percent={percent}
      />
    </div>
  );
}

function Header() {
  return <div className="header">FAR AWAY🌎🚀</div>;
}
function Form({ items, setItems }) {

  let item = {
    id: Date.now(),
    description: "",
    quantity: 1,
    packed: false,
  };
  function addItem() {
    console.log(item.id);
    setItems([...items, item]);
  }
  return (
    <div className="form">
      <span className="text">What do you need for your trip?🥰</span>
      <select
        name=""
        className="count"
        onChange={(e) => { item.quantity =  e.target.value }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {" "}
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="input"
        placeholder="item..."
        onChange={(e) => { item.description =  e.target.value }}
      />
      <button className="add" onClick={addItem}>
        Add
      </button>
    </div>
  );
}
function PackingList({ items, setItems }) {
  let sortedItems = [...items];
  const [sortType, setSortType] = useState("input");
  function handleSort(e) {
    let value = e.target.value;
    setSortType(value);

    sortType === "description"
      ? sortedItems.sort((a, b) => a.description.localeCompare(b.description))
      : sortedItems.sort((a, b) => Number(a.packed) - Number(b.packed));

      setItems(sortedItems);
  }

  return (
    <div className="list">
      <div className="items">
        {items.map((item, indx) => (
          <Item item={item} key={indx} setItems={setItems} items={items} />
        ))}
      </div>
      <div className="btns">
        <select name="" className="sort" onChange={(e)=> handleSort(e)}>
          <option value="input">sort by input order</option>
          <option value="description">sort by description</option>
          <option value="toggle">sort by toggle</option>
        </select>
        <button className="clear" onClick={() => setItems([])}>
          Clear
        </button>
      </div>
    </div>
  );
}
function Item({ item, items, setItems }) {
  function handleRemoveItem(id) {
    let updatedItems = items.filter((it) => it.id != id);
    setItems(updatedItems);
  }
  function handleToggle(e, indx) {
    const toggledItems = items.map((it) =>
      it.id === indx ? { ...it, packed: e.target.checked } : it
    );
    setItems(toggledItems);
  }
  return (
    <div className="item">
      <input
        style={{ cursor: "pointer" }}
        type="checkbox"
        id="checkbox"
        checked={item.packed}
        onChange={(e) => handleToggle(e, item.id)}
      />
      <label
        htmlFor="checkbox"
        style={item.packed ? { textDecoration: "line-through" } : {}}
      >{` ${item.quantity} ${item.description} `}</label>
      <span className="remove" onClick={() => handleRemoveItem(item.id)}>
        ❌
      </span>
    </div>
  );
}
function Footer({ totalItems, packedItemsNumber, percent }) {
  return (
    <div className="footer">
      {`You have ${totalItems} items in your list, and you already packed ${packedItemsNumber} (${percent}%)`}
    </div>
  );
}
export default App;
