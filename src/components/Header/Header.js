import styled from "styled-components";
import Filters from './Filters'
import Impressum from "./Impressum";

const Grid = styled.div`
    display: grid;
    width:100%;
    height:120px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1.5fr 0.5fr;
    grid-column-gap: 5px;
    grid-row-gap: 2px;
    grid-template-areas: 
    "logo . . impressum"
    "filter filter . .";
`

const Logo = styled.div`
    grid-area:logo;
    font-size:30px;
    padding:10px;
    white-space: nowrap;
`

const ImpressumDiv = styled.div`
    grid-area:impressum;
`
const Filter = styled.div`
    grid-area:filter;
`

const Header = (props) => {
   return( 
    <Grid>
        <Logo>
            Chargepoint finder
        </Logo>
        <ImpressumDiv>
            <Impressum></Impressum>
        </ImpressumDiv>
        <Filter>
            <Filters setDistanceFunc={props.setDistanceFunc} setFilterFunc={props.setFilterFunc}/>
        </Filter>
    </Grid>
    )
}

export default Header