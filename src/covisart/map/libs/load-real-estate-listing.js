export async function loadRealEstateListing() {

  const listing = await fetch('data/real-estate-listing.json').then(
    res => res.json()
    )
  listing.images = [
    "./data/images/front.jpg",
    "./data/images/bedroom.jpg",
    "./data/images/back.jpg"
  ]

  return listing
}
