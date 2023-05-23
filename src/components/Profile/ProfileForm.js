import { useContext, useState } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const [newPassword, setNewPassword] = useState('');

  const authCtx = useContext(AuthContext);
  
  const passwordChangeHandler = (event) => {
    event.preventDefault();

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDPloRl2BOnT7Bl4EIlvaBNjsfaKbtdRhI', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: newPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setNewPassword('');
    })
  }

  return (
    <form className={classes.form} onSubmit={passwordChangeHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
