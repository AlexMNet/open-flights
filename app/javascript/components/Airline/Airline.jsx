import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import styled from 'styled-components'
import ReviewForm from './ReviewForm'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`
const Column = styled.div`
  background-color: #fff;
  height: 100vh;
  overflow: scroll;

  &:last-child {
    background-color: #000;
  }
`
const Main = styled.div`
  padding-left: 50px;
`

const Airline = (props) => {
  const [airline, setAirline] = useState({})
  const [review, setReview] = useState({})
  const [loaded, setLoaded] = useState(false)

  const { slug } = useParams()

  useEffect(() => {
    const url = `/api/v1/airlines/${slug}`

    axios
      .get(url)
      .then((res) => {
        setAirline(res.data)
        setLoaded(true)
      })
      .catch((res) => console.log(res))
  }, [])

  const handleChange = (e) => {
    e.preventDefault()

    setReview({ ...review, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const airline_id = airline.data.id

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios
      .post('/api/v1/reviews', { review, airline_id })
      .then((res) => {
        const included = [...airline.included, res.data]
        setAirline({ ...airline, included })
        setReview({ title: '', description: '', score: 0 })
      })
      .catch((res) => {})
  }

  const setRating = (score, e) => {
    e.preventDefault()

    setReview({ ...review, score })
  }

  return (
    <Wrapper>
      {loaded && (
        <>
          <Column>
            <Main>
              <Header
                attributes={airline.data.attributes}
                reviews={airline.included}
              />
            </Main>
            <div className="reviews"></div>
          </Column>
          <Column>
            <ReviewForm
              attributes={airline.data.attributes}
              review={review}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setRating={setRating}
            />
          </Column>
        </>
      )}
    </Wrapper>
  )
}

export default Airline
