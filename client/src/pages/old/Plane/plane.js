import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {Loader} from '../../components/Loader/Loader'
import {PlaneComp} from '../../components/Plane/plane'

export const PlanePage = () => {
  const [plane, setPlane] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/plane/all', 'GET', null,{
        Authorization: `Bearer ${token}`
      })
      setPlane(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <Loader/>
  }
  console.log(plane)
  console.log(1111)
  return (
    <>
      {!loading && <PlaneComp plane={plane} />}
    </>
  )
}