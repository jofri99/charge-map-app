import Map from './Map/Map'
import styled from 'styled-components'
import Header from './Header/Header'
import { useState, useEffect } from 'react'
import Marker from './Map/Marker';
import axios from 'axios'
import PopUp from './Map/PopUp'

const Wrapper = styled.div`
    height:100%;
    width:100%;
`

// connector ids for api
const TYPE2 = 25
const CHADEMO = 2
const CCS = 33

const openChargeMapApiKey = 'INSERT_YOUR_API_KEY'

const Dashboard = () => {
    const [maxDistance, setMaxDistance] = useState(10)
    const [filterType, setFilterType] = useState([TYPE2, CHADEMO, CCS])
    const [chargingStations, setChargingStations] = useState([])
    const [center, setCenter] = useState([51.050407, 13.737262])
    const [popUpVisible, setPopUpVisible] = useState(false)
    const [currentMarker, setCurrentMarker] = useState()

    useEffect(() => {
        const fetchData = async () => {

            const options = {
                params: {
                    maxresults: '100',
                    latitude: center[0],
                    longitude: center[1],
                    distance: maxDistance ? maxDistance : 10,
                    distanceunit: 'km',
                    connectiontypeid: filterType.toString()
                },
                headers: { 'Content-Type': 'application/json' }
            };

            const res = await axios.get('/v3/poi?key=' + openChargeMapApiKey, options)

            const markers = []
            res.data.forEach(station => {
                let info = station.AddressInfo
                let color = "red"
                if (station.StatusTypeID === 50 || station.StatusTypeID === 20) {
                    color = "green"
                }

                markers.push(<Marker
                    key={info.ID}
                    keyID={info.ID}
                    longitude={info.Longitude}
                    latitude={info.Latitude}
                    color={color}
                    setCurrentMarker={setCurrentMarker}
                    markerInfo={station} />)
            })
            setChargingStations(markers)
        }

        fetchData()
    }, [filterType, maxDistance, center])

    return (
        <Wrapper>
            <Header setDistanceFunc={setMaxDistance} setFilterFunc={setFilterType}/>
            <Map children={chargingStations} setCenterFunc={setCenter} />
            <PopUp visible={popUpVisible} setVisibility={setPopUpVisible} info={currentMarker} setCurrentMarker={setCurrentMarker} />
        </Wrapper>
    )
}

export default Dashboard