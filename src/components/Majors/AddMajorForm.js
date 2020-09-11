import React, { useState } from 'react';
import { useFirebase } from '../Firebase';
// import { useAuthUser } from '../Session';

const AddCampusForm = () => {
  const firebase = useFirebase();
  // const authUser = useAuthUser();

  const INITIAL_STATE = {
    name: '',
  };

  const [values, setValues] = useState(INITIAL_STATE);

  const onChangeText = (event) => {
    // Spread current values and overwrite with the destructured value
    setValues({ ...values, name: event.target.value });
  };

  const onSubmit = (event) => {
    const {name} = values;
    firebase.campuses().push({
      name,
    });

    setValues({...values, name: ''});
    event.preventDefault();
  }

  const { name } = values;

  return (
    <div>
      Add Campus Form
      <form onSubmit={onSubmit}>
        <input type='text' value={name} onChange={onChangeText} />
        <button type='submit'>Add Campus</button>
      </form>
    </div>
  )
}

export default AddCampusForm;
