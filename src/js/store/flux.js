const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			apiUrl: "https://playground.4geeks.com/contact",
			agendaSlug: "Anais",
			contacts: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			createAgenda: async () => {
				const store = getStore()
				const response = await fetch(store.apiUrl+"/agendas/"+store.agendaSlug, {method: "POST"})

				if (response.ok) {
					const data = await response.json()
					console.log(data)
				}
			},
			getContacts: async () => {
				const store = getStore()
				const actions = getActions()
				const response = await fetch(store.apiUrl+"/agendas/"+store.agendaSlug+"/contacts")

				if(response.status==404) {
					actions.createAgenda()
				}
				if (response.ok) {
					const data = await response.json()
					setStore({contacts: data.contacts})
					console.log(data)
				}
			},
		}
	};
};

export default getState;
