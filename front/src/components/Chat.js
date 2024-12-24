import React from 'react'
import io from 'socket.io-client'
import {useLocation, useNavigate} from 'react-router-dom'
import EmojiPicker from 'emoji-picker-react' 
import Messages from './Messages'
import styles from '../styles/Chat.module.css';

const socket = io.connect('http://localhost:3001')

const Chat = () => {
	const { search } = useLocation()
	const navigate = useNavigate()
	const [params, setParams] = React.useState({room: "", name: ""})
	const [messages, setMessages] = React.useState([])
	const [message, setMessage] = React.useState('')
	const [isOpen, setOpen] = React.useState(false)
	const [users, setUsers] = React.useState(0)


	React.useEffect(() => {
		const searchParams = Object.fromEntries(new URLSearchParams(search))
		setParams(searchParams)
		socket.emit('join', searchParams)
	}, [search])


	React.useEffect(() => {
		socket.on('message', ({data}) => {
			setMessages((prev) => [...prev, data])
		})
	}, [search])

	React.useEffect(() => {
		socket.on('joinRoom', ({data}) => {
			setUsers(data?.users?.length)
		})
	}, [search])


	const leftRoom = () => {
		socket.emit('leave', { params });
		navigate('/')
	}

	const handleChange = ({target: {value}}) => {
		setMessage(value)
	}

	const onEmojiClick = ({emoji}) => {
		setMessage(`${message} ${emoji}`)
	}


	const handleSubmit = (e) => {
		e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', { message, params });
      setMessage('');
    }
	}

	return (
		<div className={styles.chatContainer}>
		<div className={styles.header}>
			<div className={styles.roomName}>{params.room}</div>
			<div className={styles.userCount}>{users} users in the room</div>
			<button className={styles.leaveButton} onClick={leftRoom}>
				Leave Room
			</button>
		</div>
		<div className={styles.messages}>
			<Messages messages={messages} name={params.name} />
		</div>
		<form className={styles.form} onSubmit={handleSubmit}>
			<input
				className={styles.input}
				type="text"
				name="message"
				value={message}
				placeholder="Message"
				autoComplete="off"
				onChange={handleChange}
				required
			/>
			<div className={styles.emojiPicker}>
  			<div
    			className={styles.emojiButton}
    			onClick={() => {
      			setOpen(!isOpen);
    			}}
  			>
    		<span className={styles.emojiIcon}>😊</span> 
  		</div>
			<div style={{position: 'absolute', bottom: 40, right: 0}}>

  			{isOpen && <EmojiPicker onEmojiClick={onEmojiClick} />}
			</div>

			</div>
			<button type="submit" className={styles.sendButton}>
				Send
			</button>
		</form>
	</div>
	)
}

export default Chat