import styled from 'styled-components'

const Card = styled.div`
    display:flex;
    flex-direction: row-reverse;
    margin:5px;
    padding:5px;
`
const LinkWrapper = styled.div`
    border: solid 1px black;
    width:fit-content;
    padding:5px;
`
const Link = styled.a`
    padding:10px;
`

const Impressum = () => {
    return(
        <Card>
            <LinkWrapper>
                <Link>Impressum</Link>
                <Link>Privacy</Link>
            </LinkWrapper>
        </Card>
    )
}

export default Impressum