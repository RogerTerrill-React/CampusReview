import React, { useState } from 'react';
import { useFirebase } from '../Firebase';
import { useAuthUser } from './context';

const withEmailVerification = (Component) => {
  const WithEmailVerification = (props) => {
    const [isSent, SetIsSent] = useState(false);
    const firebase = useFirebase();
    const authUser = useAuthUser();

    const onSendEmailVerification = () => {
      firebase.doSendEmailVerification().then(() => SetIsSent(true));
    };

    return needsEmailVerification(authUser) ? (
      <div>
        {isSent ? (
          <p>
            E-Mail confirmation sent: Check your E-Mails (Spam folder included)
            for a confirmation E-Mail. Refresh this page once you confirmed your
            E-Mail.
          </p>
        ) : (
          <p>
            Verify your E-mail: Check your E-Mails (Spam folder included) for a
            confirmation E-Mail or send another confirmation E-mail.
          </p>
        )}

        <button
          type='button'
          onClick={onSendEmailVerification}
          disabled={isSent}
        >
          Send confirmation E-Mail
        </button>
      </div>
    ) : (
      <Component {...props} />
    );
  };
  return WithEmailVerification;
};

const needsEmailVerification = (authUser) =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map((provider) => provider.providerId)
    .includes('password');

export default withEmailVerification;
