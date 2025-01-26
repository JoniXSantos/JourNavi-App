const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: '',
			isLogged: false
		},
		actions: {
			// Use getActions to call a function within a function
			signup: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/signup`;
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": 'application/json'
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					setStore({ message: data.message })
					return false;
				}
				await getActions().login(dataToSend);
				return true;
			},
			login: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/login`;
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": 'application/json'
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					setStore({ message: data.message })
					return false;
				};
				localStorage.setItem('token', data.access_token);
				localStorage.setItem('user', JSON.stringify(data.results));
				setStore({ isLogged: true, user: data.results });
				return true;
			},
			isLogged: () => {
				const token = localStorage.getItem('token');
				if (token) {
					const userData = JSON.parse(localStorage.getItem('user'));
					setStore({ isLogged: true, user: userData })
				};
			},
			logout: () => {
				setStore({ isLogged: false, user: '' });
				localStorage.removeItem('token');
				localStorage.removeItem('user');
			},
			getData: async (id) => {
				const token = localStorage.getItem('token');
				const uri = `${process.env.BACKEND_URL}/api/users/${id}`;
				const options = {
					method: 'GET',
					headers: {
						"Authorization": `Bearer ${token}`
					}
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				const data = await response.json();
				setStore({ user: data.results });
			},
			editData: async (id, dataToSend) => {
				const token = localStorage.getItem('token');
				const uri = `${process.env.BACKEND_URL}/api/users/${id}`;
				const options = {
					method: 'PUT',
					headers: {
						"Content-Type": 'application/json',
						"Authorization": `Bearer ${token}`
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return false;
				};
				const data = await response.json();
				getActions().getData(id);
				return true;
			},
			removeAccount: async (id) => {
				const token = localStorage.getItem('token');
				const uri = `${process.env.BACKEND_URL}/api/users/${id}`;
				const options = {
					method: 'DELETE',
					headers: {
						"Authorization": `Bearer ${token}`
					}
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return false;
				};
				const data = await response.json();
				getActions().logout();
				return true;
			},
			uploadImage: async (file) => {
				const uri = `${process.env.BACKEND_URL}/api/upload`;
				const form = new FormData();
				form.append('img', file);
				const options = {
					method: 'POST',
					body: form
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return false;
				};
				const data = await response.json();
				getActions().changePicture(data.results);
				return true;
			},
			changePicture: async (url) => {
				const token = localStorage.getItem('token');
				const user = JSON.parse(localStorage.getItem('user'));
				const uri = `${process.env.BACKEND_URL}/api/profileimage`;
				const options = {
					method: 'PATCH',
					headers: {
						"Content-Type": 'application/json',
						"Authorization": `Bearer ${token}`
					},
					body: JSON.stringify({ picture: url })
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return false;
				};
				const data = await response.json();
				getActions().getData(user.id);
				return true;
			}
		}
	};
};

export default getState;
