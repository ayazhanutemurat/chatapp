import React from 'react';
import styles from '../styles/Messages.module.css';

const Messages = ({ messages, name }) => {

	console.log(messages)
  return (
    <div className={styles.container}>
      {messages.map(({ user, message }, i) => {
        const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase();
        const className = itsMe ? styles.me : styles.user;

        return (
          <div key={i} className={`${styles.messageContainer} ${className}`}>
            {!itsMe && <span className={styles.userName}>{user.name}</span>}
            <p className={styles.message}>{message}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;