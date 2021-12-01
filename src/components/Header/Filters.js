import CheckboxFilter from "./CheckboxFilter"
import InputFilter from "./InputFilter"
import styled from 'styled-components'



const TYPE2 = 25
const CHADEMO = 2
const CCS = 33
const NOSELECTION = 99999999

const Grid = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 0.5fr 1.5fr;
    grid-template-rows:1fr;
`

const Filters = (props) => {
    const filterIds = [TYPE2, CHADEMO, CCS]
    
    
    const onChangeCheckboxes = (values) => {
        const filter = []
        values.forEach((val, index) => {
            if(val) {
                filter.push(filterIds[index])
            }
        })
        if(filter.length < 1) {
            filter.push(NOSELECTION)
        }
        props.setFilterFunc(filter)
    }

    /**
     
     */
    return(
        <Grid>
            <InputFilter getValue={props.setDistanceFunc} regexFilter={/^[0-9\b]+$/}/>
            <CheckboxFilter onChange={onChangeCheckboxes} values={["type2", "chademo", "ccs"]}/>
        </Grid>
    )
}

export default Filters