import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import { useAuthUser } from '../Session';
import MessageList from './MessageList';

const Messages = () => {
  const firebase = useFirebase();
  const authUser = useAuthUser();

  const INITIAL_STATE = {
    loading: false,
    messages: [],
    text: '',
    limit: 5,
  };

  const [values, setValues] = useState(INITIAL_STATE);

  const onListenForMessages = () => {
    setValues({ ...values, loading: true });

    firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(values.limit)
      .on('value', (snapshot) => {
        const messageObject = snapshot.val();

        if (messageObject) {
          // convert messages list from snapshot
          const messageList = Object.keys(messageObject).map((key) => ({
            ...messageObject[key],
            uid: key,
          }));
          setValues({ ...values, loading: false, messages: messageList });
        } else {
          setValues({ ...values, loading: false, messages: null });
        }
      });
  };

  useEffect(() => {
    onListenForMessages();
    return () => firebase.messages().off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.limit]);

  const { text, messages, loading } = values;

  const onChangeText = (event) => {
    // Spread current values and overwrite with the destructured value
    setValues({ ...values, text: event.target.value });
  };

  const onCreateMessage = (event) => {
    firebase.messages().push({
      text,
      userId: authUser.uid,
      createdAt: firebase.serverValue.TIMESTAMP,
    });

    setValues({ ...values, text: '' });

    event.preventDefault();
  };

  const onRemoveMessage = (uid) => {
    firebase.message(uid).remove();
  };

  const onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: firebase.serverValue.TIMESTAMP,
    });
  };

  const onNextPage = () => {
    setValues((previousState) => ({
      ...values,
      limit: previousState.limit + 5,
    }));
  };

  return (
    <div>
      {!loading && messages && (
        <button type='button' onClick={onNextPage}>
          More
        </button>
      )}

      {loading && <div>Loading...</div>}

      {messages ? (
        <MessageList
          authUser={authUser}
          messages={messages}
          onEditMessage={onEditMessage}
          onRemoveMessage={onRemoveMessage}
        />
      ) : (
        <div>There are no messages ...</div>
      )}

      <form onSubmit={onCreateMessage}>
        <input type='text' value={text} onChange={onChangeText} />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

export default Messages;
