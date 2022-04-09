import { useSession, signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import Songs from '../components/songs'
import useSpotify from '../hooks/useSpotify'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

const Center = () => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [color, setColor] = useState()
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  useEffect(() => {
    // console.log('random num', Math.floor(Math.random() * 6))
    setColor(Math.floor(Math.random() * 6))
  }, [playlistId])

  useEffect(() => {
    if (session) {
      spotifyApi.getPlaylist(playlistId).then((data) => {
        // console.log(data.body)
        setPlaylist(data.body)
      })
    }
  }, [spotifyApi, session, playlistId])

  return (
    <div className="h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          onClick={() => signOut()}
          className="flex cursor-pointer items-center justify-center space-x-3 rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-100"
        >
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user?.image}
            alt=""
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b ${colors[color]}  to-black p-8`}
      >
        <img className="h-44 w-44 shadow-2xl" src={playlist?.images?.[0].url} />
        <div className="text-white">
          <p>Playlist</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">{playlist.name}</h1>
        </div>
      </section>
      <Songs />
    </div>
  )
}

export default Center
