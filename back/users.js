let users = [];


const findUser = (user) => {
	const userName = user.name.trim().toLowerCase();
	const userRoom = user.room.trim().toLowerCase();

	return users?.find((u) => u.name.trim().toLowerCase() === userName && u.room.trim().toLowerCase() === userRoom)
}

const addUser = (user) => {
	const isExist = findUser(user)

	!isExist && users.push(user)

	const currentUser = isExist || user

	return {isExist: !!isExist, user: currentUser}
}


const getRoomUsers = (room) => {
	return users.filter((u) => u.room === room)
}

const removeUser = (user) => {
	const foundUser = findUser(user)

	if (foundUser) {
		users = users.filter(({room, name}) => room === foundUser.room && name !== foundUser.name)
	}

	return foundUser
}



module.exports = {addUser, findUser, getRoomUsers, removeUser}