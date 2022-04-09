import React from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import Song from './song'

const songs = () => {
  const playlist = useRecoilValue(playlistState)
  return (
    <div className="flex-col space-y-1 px-9 text-white">
      {playlist?.tracks?.items.map((item, i) => (
        <Song key={item.track.id} track={item} order={i} />
      ))}
    </div>
  )
}

export default songs
