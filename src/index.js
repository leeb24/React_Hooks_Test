import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// USE INPUT HOOK
const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);

  const onChange = event => {
    const value = event.target.value;
    console.log(event.target);
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

//USETAB HOOK
const content = [
  {
    tab: "Section 1",
    content: "content of section 1"
  },
  {
    tab: "Section 2",
    content: "content of section 2"
  },
  {
    tab: "Section 3",
    content: "content of section 3"
  }
];

const useTabs = (initialTab, allTabs) => {
  const [current, setIndex] = useState(initialTab);

  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }

  return {
    contentNow: allTabs[current].content,
    change: setIndex
  };
};

const App = () => {
  const maxLength = v => {
    return v.length <= 10;
  };

  const [item, setItem] = useState(1);
  const incrementItem = () => {
    setItem(item + 1);
  };
  const decrementItem = () => {
    setItem(item - 1);
  };

  const name = useInput("Mr.Lee", maxLength);
  const { contentNow, change } = useTabs(0, content);
  return (
    <div className="App">
      <h1>{item}</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={incrementItem}>Increment</button>
      <button onClick={decrementItem}>Decrement</button>
      <input placeholder="Name" value={name.value} onChange={name.onChange} />

      <br />
      <br />
      {content.map((section, index) => (
        <button onClick={() => change(index)}>{section.tab}</button>
      ))}
      <div>{contentNow}</div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
