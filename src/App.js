import { Fragment, useEffect, useRef, useState } from "react";
import { formatDate, DATE_FORMAT } from "./utils";
import "./styles.css";

//  1. update message state for each input change
//  2. save created message in localstorage
//  3. check if message is more than 200 characters
//  4. show error if there if is more than 200
//  5. set focus to text area field

const MAX_MESSAGE_LENGTH = 200;

export default function App() {
  let messageRef = useRef(null);
  const key = makeLocalStorageKey();

  const [message, setMessage] = useState(getLocalStorage(key) || "");
  const [error, setError] = useState("");

  const isMessageTooLong = message.length >= MAX_MESSAGE_LENGTH;

  useEffect(() => {
    //  2. save created message in localstorage
    setLocalStorage(key, message);
    //  3. check if message is more than 200 characters
    if (isMessageTooLong) {
      setError("Shorten your message");
      return;
    }
  }, [message, isMessageTooLong, key]);

  useEffect(() => {
    //  5. set focus to text area field
    const takeFocus = true;
    if (takeFocus) {
      messageRef.current.focus();
    }
  }, []);

  return (
    <Fragment>
      <div className="container">
        <div className="d-inline-flex flex-column">
          <label>messages: </label>
          <textarea
            ref={messageRef}
            type="input"
            rows="3"
            cols="30"
            style={{ resize: "none", width: "300px" }}
            name="message"
            value={message}
            maxLength="200"
            //  1. update message state for each input change
            onChange={(e) => setMessage(e.target.value)}
          />
          <pre className="ms-auto">{`${message.length}/${MAX_MESSAGE_LENGTH} `}</pre>
          <span>{isMessageTooLong ? error : ""}</span>
        </div>
      </div>
    </Fragment>
  );
}

const makeLocalStorageKey = () => {
  return `newMessage:${formatDate(new Date(), DATE_FORMAT)}`;
};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  if (!value) {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
};
