import styled from 'styled-components'
import { useState, useEffect } from 'react'

const Wrapper = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap:5px;
    background-color:white;
    border-radius: 5px;
    margin:5px;
    white-space: nowrap;
    border:solid 1px black;
    text-align: center;
    vertical-align: middle;
    padding:10px;
`
const CheckboxWrapper = styled.div`
    
`
const CheckboxFilter = (props) => {
    const [checkboxValues, setCheckboxValues] = useState(new Array(props.values.length).fill(true))
    
    useEffect(() => {
        props.onChange(checkboxValues)
    }, [checkboxValues])

    const onChangeCheckbox = (evt) => {
        let newState = [...checkboxValues]
        const index = parseInt(evt.target.value)
        newState[index] = !checkboxValues[index]
        setCheckboxValues(newState)
    }
    
    return(
        <Wrapper>
            Connector Types
            {props.values.map((value, index) => 
            <CheckboxWrapper key={"checkboxFilter" + index} >
                <input 
                type="checkbox" 
                id={"checkboxFilter" + index} 
                checked={checkboxValues[index]} 
                value={index.toString()} 
                onChange={onChangeCheckbox}/>
                <label htmlFor={"checkboxFilter" + index}>{value}</label>
            </CheckboxWrapper>
            )}
        </Wrapper>
    )
}

export default CheckboxFilter