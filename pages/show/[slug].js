import styled from 'styled-components'
import Layout from '@c/Layout'
import FlexyRow from '@c/FlexyRow'
import { Title } from '@c/Title'
import Link from 'next/link'
import { ArtistName, ArtistPhoto, Portrait } from '@c/Artist/Artist.css'
import { Markdown } from '@c/Layout/Layout.css'
import { getShowBySlug } from '@l/graphcms'
import { formatUSD, formatDate } from '@l/utils'

export default function Shows({ show }) {
  return (
    <Layout title={`${show.title} / next-graphcms-shows`} maxWidth="900px" padding="0 2em">
      <Title>{show.title}</Title>

      <FlexyRow>
        <span>Price: {formatUSD(show.ticketPrice)}</span>
        <span>{formatDate(show.scheduledStartTime)}</span>
      </FlexyRow>

      <Markdown source={show.description} />

      <FlexyRow justify="space-around">
        {show.artists.map(artist => (
          <Link href={`/artist/${artist.slug}`}>
            <a>
              <div key={artist.id}>
                <ArtistName>{artist.fullName}</ArtistName>
                <Portrait margin="1em auto" images={artist.images} />
              </div>
            </a>
          </Link>
        ))}
      </FlexyRow>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const { slug } = params
  const show = (await getShowBySlug(slug))

  return {
    props: { show },
  }
}
