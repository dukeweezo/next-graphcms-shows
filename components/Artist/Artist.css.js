import  styled, { css }  from 'styled-components'

export const ArtistName = styled.h2`
  text-align: center;
  padding: 0;
  margin: 0;
  height: 100%;
`
export const ArtistPhoto = styled.div`
  background-image: url(${(p) => p.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 100px;
  width: 200px;
  height: 200px;
  border: 4px solid currentColor;
  margin: ${(margin) => margin ? margin : '0 auto'};

  ${props => props.small && css`
      border-radius: 50px;
      width: 100px;
      height: 100px;
    `}
  ${props => props.large && css`
      border-radius: 200px;
      width: 400px;
      height: 400px;
    `}
`
export const Portrait = ({images = [], small = '', large = '', margin = ''}) => {
  if (images.length > 0) {
    const img = images[0]
    return (
      <ArtistPhoto {
        ... small ? {small} :
        large ? {large} :
        ' '
      } 
      margin={margin}      
      imageUrl={img.url} />
    )
  }
  return null
}