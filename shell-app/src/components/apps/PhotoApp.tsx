import { AppId } from '@/types/window'
import type { DynamicApp } from './DynamicAppManager'
import DynamicWebApp from './DynamicWebApp'

type Props = {}

const PhotoApp = (props: Props) => {
    const app: DynamicApp = {
        id: AppId.PHOTOS,
        name: 'Photos',
        type: "iframe",
        url: 'https://photos.imsteve.dev',
        icon: 'photos',
        color: "bg-blue-500",
        allowFullscreen: true,
    }
  return (
    <DynamicWebApp app={app} {...props} />
  )
}

export default PhotoApp