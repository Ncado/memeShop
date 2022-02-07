import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {Loader} from '../../components/Loader/Loader'
import {BiletsList} from '../../components/BiletsList/BiletsList'

export const BiletsPage = () => {
  const [bilets, setBilets] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchBilets = useCallback(async () => {
    try {
      const fetched = await request('/api/plane/myBilets', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setBilets(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchBilets()
  }, [fetchBilets])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <BiletsList bilets={bilets} />}
    </>
  )
}