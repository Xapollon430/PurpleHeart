import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: translateY(-1vh);
  }

  to {
    transform:  translateY(105vh);
  }
`;

const X = styled.span`
  top: 0px;
  left: ${(props) => props.left}px;
  position: absolute;
  animation: ${rotate} 3s ease-in-out;
`;

let count = 0;

function App() {
  const [heartArray, setHeartArray] = useState([]);

  useEffect(() => {
    let heart = heartArray.filter((heart) => heart.key === count)[0];
    if (heart !== undefined) {
      setTimeout(() => {
        // setHeartArray([
        //   ...heartArray.filter(
        //     (currentHeart) => heart.key !== currentHeart.key
        //   ),
        // ]); // fix this by sending in the fresh heartArray to the setHeartArray

        setHeartArray((oldArray) => [
          ...oldArray.filter((currentHeart) => heart.key !== currentHeart.key),
        ]);
      }, 2950);
    }
  }, [count]);
  console.log(heartArray);

  const addHeart = () => {
    count++;
    setHeartArray([
      ...heartArray,
      {
        jsx: (
          <X key={count} left={Math.random() * window.innerWidth - 50}>
            {count}💜
          </X>
        ),
        key: count,
      },
    ]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" />
        <p onClick={addHeart}>
          Click <span className="red">Here</span> Multple Times To Make Purple
          Hearts Fall.
        </p>

        {heartArray ? heartArray.map((heart) => heart.jsx) : null}
      </header>
    </div>
  );
}

export default App;
