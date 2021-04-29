import styled from 'styled-components'
import Layout from '@c/Layout'
import FlexyRow from '@c/FlexyRow'
import { Title } from '@c/Title'
import { ArtistName, ArtistPhoto, Portrait } from '@c/Artist/Artist.css'
import { Markdown } from '@c/Layout/Layout.css'
import { getArtistBySlug } from '@l/graphcms'
import { formatUSD, formatDate } from '@l/utils'

export default function Artist({ artist }) {
  return (
    <Layout title={`${artist.fullName} / next-graphcms-shows`} maxWidth="700px" padding="0 2em">  
      <div key={artist.id}>
        <FlexyRow justify="flex-start">
          <Portrait small margin="1em" images={artist.images} />
          <ArtistName>{artist.fullName}</ArtistName>
        </FlexyRow>

          <FlexyRow justify="flex-start">
            <a href={artist.webUrl} target="_blank">Website</a>
            <a href={artist.facebookUrl} target="_blank">Facebook</a>
            <a href={artist.instagramUrl} target="_blank">Instagram</a>
            <a href={artist.youTubeUrl} target="_blank">YouTube</a>
          </FlexyRow>

          <Markdown source={artist.bio} />
        </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const { slug } = params
  const artist = (await getArtistBySlug(slug))

  return {
    props: { artist },
  }
}
