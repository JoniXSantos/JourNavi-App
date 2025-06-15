const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: '',
			isLogged: false,
			countries: [],
			visitedCountries: [],
			favoriteCountries: [],
			toVisitCountries: [],
			users: [],
			images: [],
			posts: [],
			currentPost: [],
			comments: []
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
					setStore({ message: data.message });
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
			getUsers: async () => {
				const uri = `${process.env.BACKEND_URL}/api/users`;
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				setStore({ users: data.results });
				return data;
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
				setStore({
					user: data.results,
					visitedCountries: data.results.visited_countries,
					favoriteCountries: data.results.favorite_countries,
					toVisitCountries: data.results.to_visit_countries
				});
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
			},
			changePassword: async (dataToSend) => {
				const token = localStorage.getItem('token');
				const uri = `${process.env.BACKEND_URL}/api/password`;
				const options = {
					method: 'PATCH',
					headers: {
						"Content-Type": 'application/json',
						"Authorization": `Bearer ${token}`
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					setStore({ message: data.message });
					return false;
				};
				return true;
			},
			getCountries: async () => {
				const uri = `${process.env.BACKEND_URL}/api/countries`;
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				setStore({ countries: data.results });
				return data;
			},
			addToVisited: async (country) => {
				const token = localStorage.getItem('token');
				const uri = `${process.env.BACKEND_URL}/api/visited-countries`;
				const options = {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${token}`
					},
					body: JSON.stringify({ country })
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				const updatedVisited = data.results.visited_countries;
				setStore({ visitedCountries: updatedVisited });
				return;
			},
			removeFromVisited: async (country) => {
				const token = localStorage.getItem('token');
				const uri = `${process.env.BACKEND_URL}/api/visited-countries`;
				const options = {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${token}`
					},
					body: JSON.stringify({ country })
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				const updatedVisited = data.results.visited_countries;
				setStore({ visitedCountries: updatedVisited });
				return;
			},
			addToFavorites: async (country) => {
				const token = localStorage.getItem('token');
				const uri = `${process.env.BACKEND_URL}/api/favorite-countries`;
				const options = {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${token}`
					},
					body: JSON.stringify({ country })
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				const updatedFavorites = data.results.favorite_countries;
				setStore({ favoriteCountries: updatedFavorites });
				return;
			},
			removeFromFavorites: async (country) => {
				const token = localStorage.getItem('token');
				const uri = `${process.env.BACKEND_URL}/api/favorite-countries`;
				const options = {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${token}`
					},
					body: JSON.stringify({ country })
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				const updatedFavorites = data.results.favorite_countries;
				setStore({ favoriteCountries: updatedFavorites });
				return;
			},
			addToWishes: async (country) => {
				const token = localStorage.getItem('token');
				const uri = `${process.env.BACKEND_URL}/api/to-visit-countries`;
				const options = {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${token}`
					},
					body: JSON.stringify({ country })
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				const updatedWishes = data.results.to_visit_countries;
				setStore({ toVisitCountries: updatedWishes });
				return;
			},
			removeFromWishes: async (country) => {
				const token = localStorage.getItem('token');
				const uri = `${process.env.BACKEND_URL}/api/to-visit-countries`;
				const options = {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${token}`
					},
					body: JSON.stringify({ country })
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				const updatedWishes = data.results.to_visit_countries;
				setStore({ toVisitCountries: updatedWishes });
				return;
			},
			getPosts: async () => {
				const uri = `${process.env.BACKEND_URL}/api/posts`;
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				setStore({ posts: data.results });
				return data;
			},
			uploadImages: async (files) => {
				const uri = `${process.env.BACKEND_URL}/api/uploads`;
				const form = new FormData();
				for (const file of files) {
					form.append('imgs', file);
				};
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
				console.log(data.results);
				setStore({ images: data.results });
				return true;
			},
			createPost: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/posts`;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				setStore({ images: [] });
				getActions().getPosts();
				return true;
			},
			getPost: async (id) => {
				const uri = `${process.env.BACKEND_URL}/api/posts/${id}`;
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				setStore({ currentPost: data.results });
				return data.results;
			},
			editPost: async (id, dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/posts/${id}`;
				const options = {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				setStore({ currentPost: data.results });
				getActions().getPosts();
				return data.results;
			},
			removePost: async (id) => {
				const uri = `${process.env.BACKEND_URL}/api/posts/${id}`;
				const options = {
					method: 'DELETE'
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				getActions().getPosts();
				return true;
			},
			getComments: async () => {
				const uri = `${process.env.BACKEND_URL}/api/comments`;
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				setStore({ comments: data.results });
				return data.results;
			},
			addComment: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/comments`;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				getActions().getComments();
				return data.results;
			},
			removeComment: async (id) => {
				const uri = `${process.env.BACKEND_URL}/api/comments/${id}`;
				const options = {
					method: 'DELETE'
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				getActions().getComments();
				return true;
			}
		}
	};
};

export default getState;
