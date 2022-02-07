import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../../components/Loader/Loader";
import { LinkCard } from "../../components/linkCard/LincCard";
import {ChatPageIo} from "../Chat_io/chat_io"
const DetailPage = () => {

	const { request, loading } = useHttp()
	const [link, setLink] = useState(null)
	const linkId = useParams().id
	const {token} = useContext(AuthContext)

	const getLink = useCallback(async () => {
		try {
			const fetched = await request(`/api/plane/${linkId}`, 'POST', null, {
				Authorization: `Bearer ${token}`
			  })
			setLink(fetched)
		} catch (e) {

		}
	}, [token,linkId, request])

	useEffect(() => {
		getLink()
	}, [getLink])

	if (loading) {
		return <Loader />
	}
	return (
		<>
			{!loading && link && <LinkCard link={link} />}
			<ChatPageIo roomId={linkId}/>
		</>
	);
}

export default DetailPage;