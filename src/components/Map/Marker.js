import { Marker as ReactMarker } from 'react-map-gl'
import { Icon } from 'react-materialize'

const Marker = (props) => {
    const onClick = () => {
        props.setCurrentMarker(props.markerInfo)
    }
    return(
        <ReactMarker key={'Marker-' + props.keyID} longitude={ props.longitude } latitude={ props.latitude } onClick={onClick}>
            <Icon style={{ color: props.color }}>room</Icon>
        </ReactMarker>
    )
}

export default Marker