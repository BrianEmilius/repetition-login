import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { TokenContext } from "../components/TokenProvider"

export default function Home() {
	const [classes, setClasses] = useState([])
	const { token } = useContext(TokenContext)

	useEffect(function() {
		(async function() {
			try {
				const response = await axios.get("http://localhost:4000/api/v1/classes")
				setClasses(response.data)
			} catch (error) {
				
			}
		})()
	}, [])

	async function subscribeHandler(event) {
		try {
			const response = await axios.post(`http://localhost:4000/api/v1/users/${token.userId}/classes/${event.target.dataset.id}`, undefined, {
				headers: {
					authorization: "Bearer " + token.token
				}
			})
			console.log(response)
		} catch (error) {
			console.log(error)
		}
		
	}

	return (
		<>
			<h1>Home</h1>
			{classes.map(item => <p>{item.className} <button data-id={item.id} onClick={subscribeHandler}>Tilmeld</button></p>)}
		</>
	)
}
