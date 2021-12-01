import { TextInput } from 'react-materialize'
import { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    padding-bottom:10px;
    padding:5px;
`
const Input = styled.input`
    padding: 0.5em;
    margin: 0.5em;
    border: solid 1px black;
    border-radius: 5px;
`
const InputFilter = (props) => {
    const [text, setText] = useState("")


    const onChangeInput = (evt) => {
        const re = props.regexFilter;
        let val = evt.target.value
        if (evt.target.value === '' || re.test(val)) {
            setText(val)
        }
    }
    const handleSubmit = (evt) => {
        props.getValue(parseInt(text))
        evt.preventDefault()
    }

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <Input value={text} onChange={onChangeInput} placeholder="max distance in km"/>
            </form>
        </Wrapper>
    )
}

export default InputFilter