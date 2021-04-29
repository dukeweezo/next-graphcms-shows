import { css } from 'styled-components'
import Link from 'next/link'
import Layout from '@c/Layout'
import { Grid, Card, Toggle } from '@c/Grid'
import { Title } from '@c/Title'
import FlexyRow from '@c/FlexyRow'
import { getAllShows } from '@l/graphcms'
import React, { useState, setState } from 'react';

export const ScheduledStartTime = ( {stringDate} ) => {
  let date = new Date(stringDate)
  let niceDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()
  return (
    <div>
      <h3>Scheduled date:</h3>
      <p>{niceDate}</p>
    </div>
  )
}

const ShowListULStyle = css`
  list-style-type: none;
  }
`

const ShowListAnchorStyle = css`
  text-decoration: none;
  transition: 150ms ease;

  :hover,
  :focus,
  :active {
    color: #000;
  }
`
export default function Shows({ shows }) {
  const FIRST_CHOICE = 'grid'
  const SECOND_CHOICE = 'list'
  const [selected, setSelected] = useState(FIRST_CHOICE)

  const toggleGridAndList = () => { 
    setSelected(
      selected === FIRST_CHOICE ? SECOND_CHOICE : 
      selected === SECOND_CHOICE ? FIRST_CHOICE : null)
}  
  return (
    <Layout title="next-graphcms-shows / Shows">
      
      <Toggle icons={[`${FIRST_CHOICE}`, `${SECOND_CHOICE}` ]} onClick={toggleGridAndList} selectedState={selected}/>
      <Title>Shows</Title>
      { 
        selected === 'grid' ? 
          <Grid>
            {shows.map(show => (
              <Card href={`/show/${show.slug}`} header={show.title} key={show.id}>
                <p>{show.artists.map(({ fullName }) => fullName).join(', ')}</p>
              </Card>
            ))}
          </Grid>

        : selected === 'list' ?
          <ul css={ShowListULStyle}>
            {shows.map(show => (
              <Link href={`/show/${show.slug}`}>
                <a css={ShowListAnchorStyle}>
                <hr/>
                <li>
                  <h1>{show.title}</h1>
                  <p>{show.artists.map(({ fullName }) => fullName).join(', ')}</p>
                  <FlexyRow>
                    <ScheduledStartTime stringDate={show.scheduledStartTime}/>
                    <h3>${show.ticketPrice}</h3>
                  </FlexyRow>
                </li>
                <hr/>
              </a></Link>
            ))}
          </ul>
        : null
      }
    </Layout>
  )
}

export async function getServerSideProps() {
  const shows = (await getAllShows()) || []
  return {
    props: { shows },
  }
}
