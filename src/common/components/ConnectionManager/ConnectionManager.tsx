import { usePeerplaysApi } from '../../../modules/peerplaysApi';


type Props = {
    children: React.ReactNode
}

export const ConnectionManager = ({ children }: Props) => {

    const { isLoadingConnection, isConnectionError, dbApi } = usePeerplaysApi()
    if (isConnectionError) {
        return (<div>disconnected please try again later</div>)
    }
    if (isLoadingConnection) {
        return (<div>loading</div>)
    }

    return <>{children}</>
}
