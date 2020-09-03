import React, { useState } from 'react';

const MessageItem = ({ authUser, message, onEditMessage, onRemoveMessage }) => {
  const INITIAL_STATE = {
    editMode: false,
    editText: message.text,
  };

  const [values, setValues] = useState(INITIAL_STATE);

  const onToggleEditMode = () => {
    setValues((previousState) => ({
      editMode: !previousState.editMode,
      editText: message.text,
    }));
  };

  const onChangeEditText = (event) => {
    setValues({ ...values, editText: event.target.value });
  };

  const onSaveEditText = () => {
    onEditMessage(message, values.editText);
    setValues({ ...values, editMode: false });
  };

  const { editMode, editText } = values;

  return (
    <li>
      {editMode ? (
        <input type='text' value={editText} onChange={onChangeEditText} />
      ) : (
        <span>
          <strong>{message.userId}</strong> {message.text}
          {message.editedAt && <span>(Edited)</span>}
        </span>
      )}

      {authUser.uid === message.userId && (
        <span>
          {editMode ? (
            <span>
              <button onClick={onSaveEditText}>Save</button>
              <button onClick={onToggleEditMode}>Reset</button>
            </span>
          ) : (
            <button onClick={onToggleEditMode}>Edit</button>
          )}
          {!editMode && (
            <button type='button' onClick={() => onRemoveMessage(message.uid)}>
              Delete
            </button>
          )}
        </span>
      )}
    </li>
  );
};

export default MessageItem;
