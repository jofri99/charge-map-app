import styled from 'styled-components'
import { Icon } from 'react-materialize'
import { useState, useEffect } from 'react';

const Card = styled.div`
    position:absolute;
    top:16%;
    right:5%;
    background-color: white;
    padding:20px;
    border:solid 3px black;
    border-radius: 5px;
`

const Grid = styled.div`
    display: grid;
    grid-auto-rows: minmax(30px, auto);
    grid-template-columns:150px 150px;
    grid-column-gap: 15px;
    grid-row-gap: 10px;
    grid-template-areas: 
    "header header"
    "content content"
    "status status"
    "connectors connectors"
    "pricing pricing";
`

const Header = styled.div`
    grid-area: header;
    text-align: center;
    font-size: 20px;
    padding:0.25rem;
`

const ContentBox = styled.div`
    display: flex;
    gap: 0.25rem;
    align-items: center;
    grid-area: content;
    justify-content: center;
`

const Operator = styled.div`
    padding: 0.25rem;
    width: 100%;
    height: 100%;
`

const Position = styled.div`
    padding: 0.25rem;
    width: 100%;
    height: 100%;
`

const Status = styled.div`
    grid-area: status;
    vertical-align: middle;
    line-height: 0px;
    padding-left: 5px;
`

const Connectors = styled.div`
    grid-area:connectors;
    padding:5px;
`

const Pricing = styled.div`
    grid-area:pricing;
`
const CloseIcon = styled.div`
    position:absolute;
    top:1%;
    right:1%;
    cursor: pointer;
`
const Table = styled.table`
    td,th {
        border: 1px solid black;
    }
    border: 1px solid black;
    border-collapse:collapse;
`

const PopUp = (props) => {
    const [info, setInfo] = useState(null)

    useEffect(() => {
        if (props.info) {
            const AddressInfo = props.info.AddressInfo
            const distance = "calc distance"

            const connectors = props.info.Connections.map((conn, index) => {
                let plugType = null
                if (conn.ConnectionType || conn.ConnectionType.Title) {
                    plugType = conn.ConnectionType.Title
                }
                return ({
                    number: index + 1,
                    plugType: plugType,
                    maxPower: conn.PowerKW ? conn.PowerKW : '?'
                })
            })

            const markerInfo = {
                street: AddressInfo.AddressLine1 ? AddressInfo.AddressLine1 : "No address avaible.",
                zip: AddressInfo.Postcode ? AddressInfo.Postcode : "-",
                town: AddressInfo.Town ? AddressInfo.Town : "-",
                country: AddressInfo.Country.ISOCode,
                latitude: AddressInfo.Latitude,
                longitude: AddressInfo.Longitude,
                operator: props.info.OperatorInfo ? props.info.OperatorInfo.Title : "No operator info avaible.",
                distance: distance,
                status: props.info.StatusType ? props.info.StatusType.Title : "No status type avaible.",
                connectors: connectors,
                pricingInfo: props.info.UsageCost ? props.info.UsageCost : "No pricing info avaible."
            }

            setInfo(markerInfo)
        } else {
            setInfo(null)
        }
    }, [props.info])

    const closePopUp = () => {
        props.setCurrentMarker(null)
    }
    return (
        <div>
            {info ? 
            <Card>
                <CloseIcon onClick={closePopUp}>
                    <Icon>close</Icon>
                </CloseIcon>
                <Grid>
                    <Header>{info.street} {info.zip} {info.town} ({info.country})</Header>
                    <ContentBox>
                        <Operator>
                            <b>Operator</b>
                            <p>{info.operator}</p>
                        </Operator>
                        <Position>
                            <p><b>Latidude:</b> {info.latitude}</p>
                            <p><b>Longitude:</b> {info.longitude}</p>
                            <p><b>Distance:</b> {info.distance}km</p>
                        </Position>
                    </ContentBox>
                    <Status><p><b>Status:</b> {info.status} </p></Status>
                    <Connectors>
                        <b>Connectors</b>
                        <Table responsive={true} hoverable={true}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>plug type</th>
                                    <th>max power</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    info.connectors.map((connector) =>
                                        <tr key={"Connector-"+connector.number}>
                                            <td>{connector.number}</td>
                                            <td>{connector.plugType}</td>
                                            <td>{connector.maxPower}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Connectors>
                    <Pricing>
                        <b>Pricing info</b>
                        <p>{info.pricingInfo}</p>
                    </Pricing>
                </Grid>
            </Card> :null
            }
        </div>
    )
}

export default PopUp