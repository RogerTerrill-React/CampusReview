import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import MessageList from './MessageList';

const Messages = () => {
  const firebase = useFirebase();

  const INITIAL_STATE = {
    loading: false,
    messages: [],
  };

  const [values, setValues] = useState(INITIAL_STATE);

  useEffect(() => {
    setValues({ ...values, loading: true });

    firebase.messages().on('value', (snapshot) => {
      const messageObject = snapshot.val();

      if (messageObject) {
        // convert messages list from snapshot
        const messageList = Object.keys(messageObject).map((key) => ({
          ...messageObject[key],
          uid: key,
        }));
        setValues({ loading: false, messages: messageList });
      } else {
        setValues({ loading: false, messages: null });
      }
    });
    return () => firebase.messages().off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { messages, loading } = values;

  return (
    <div>
      {loading && <div>Loading...</div>}

      {messages ? (
        <MessageList messages={messages} />
      ) : (
        <div>There are no messages ...</div>
      )}
    </div>
  );
};

export default Messages;
