import { useSession, signIn } from 'next-auth/react'
import React, { useEffect } from 'react'
import spotifyApi from '../lib/spotify'

const useSpotify = () => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session) {
      //if RefreshAccessTokenError direct user to login
      if (session.erorr === 'RefreshAccessTokenError') {
        signIn()
      }

      spotifyApi.setAccessToken(session.user.accessToken)
    }
  }, [session])

  return spotifyApi
}

export default useSpotify
