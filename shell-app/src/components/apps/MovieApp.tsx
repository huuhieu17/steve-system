import { AppId } from '@/types/window'
import type { DynamicApp } from './DynamicAppManager'
import DynamicWebApp from './DynamicWebApp'

type Props = {}

const MovieApp = (props: Props) => {
    const app: DynamicApp = {
        id: AppId.MOVIES,
        name: 'Xem phim',
        type: "iframe",
        url: 'https://movie.imsteve.dev',
        icon: 'film',
        color: "bg-blue-500",
        allowFullscreen: true,
    }
  return (
    <DynamicWebApp app={app} {...props} />
  )
}

export default MovieApp