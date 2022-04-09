import React from 'react'
import { millisToMinutesAndSeconds } from '../lib/time'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'

const song = ({ order, track }) => {
  const spotifyApi = useSpotify()
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)

  const playSong = () => {
    setCurrentTrackId(track.track.id)
    setIsPlaying(true)
    spotifyApi.play({
      uris: [track.track.uri],
    })
  }

  return (
    <div
      className="grid cursor-pointer grid-cols-2 rounded-lg p-5 hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img className="h-10 w-10" src={track.track.album.images[0].url} />
        <div>
          <p>{track.track.name}</p>
          <p className="text-gray-600">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden text-gray-300 md:inline">
          {track.track.album.name}
        </p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  )
}

export default song
