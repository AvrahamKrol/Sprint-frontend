import { storageService } from '../async-storage.service'
import { makeId, saveToStorage } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'gig'

export const gigService = {
  query,
  getById,
  save,
  remove,
  addGigMsg,
}
window.cs = gigService

const gigsData = [
  {
    _id: 'g101',
    title: 'I will design your logo',
    price: 12.16,
    rate: 4.6,
    owner: { _id: 'u101', fullname: 'Dudu Da', imgUrl: 'url', rate: 4 },
    description: 'Make a unique logo for your brand.',
    imgUrls: [
      'https://res.cloudinary.com/z6rg2bwn/image/upload/v1794993684/54cffd5e371a90afc005d388f51f164ab63a4965.webp',
    ],
    tags: ['Arts And Crafts', 'Logo Design'],
  },
  {
    _id: 'g102',
    title: 'I will create a modern website design',
    price: 35,
    rate: 3.5,
    owner: {
      _id: 'u102',
      fullname: 'Maya Smith',
      imgUrl: '/img/img2.jpg',
      rate: 5,
    },
    description: 'Responsive, modern website design tailored to your business.',
    imgUrls: [
      'https://res.cloudinary.com/z6rg2bwn/image/upload/v1795022951/ef02f7ab4038b804f0b8ece8bc83275725d9e338.webp',
    ],
    tags: ['Web Design', 'UI/UX'],
  },
  {
    _id: 'g103',
    title: 'I will edit your videos professionally',
    price: 25,
    rate: 3.8,
    owner: {
      _id: 'u103',
      fullname: 'Liam Jones',
      imgUrl: '/img/img3.jpg',
      rate: 4.8,
    },
    description:
      'Clean and engaging video editing for social media or business.',
    imgUrls: [
      'https://res.cloudinary.com/z6rg2bwn/image/upload/v1795022950/c9b366a2d6add8945098febe1e9ab2de997bc3d7.jpg',
    ],
    tags: ['Video Editing', 'Social Media'],
  },
  {
    _id: 'g104',
    title: 'I will write SEO-friendly articles',
    price: 18,
    rate: 4.2,
    owner: {
      _id: 'u104',
      fullname: 'Ava Patel',
      imgUrl: '/img/img4.jpg',
      rate: 4.7,
    },
    description: 'Well-researched, original articles optimized for search.',
    imgUrls: [
      'https://res.cloudinary.com/z6rg2bwn/image/upload/v1795022950/a6cd67702f6f025c89861951c88fc9667e1ff623.webp',
    ],
    tags: ['Writing', 'SEO'],
  },
  {
    _id: 'g105',
    title: 'I will illustrate a custom character',
    price: 42,
    rate: 4.9,
    owner: {
      _id: 'u105',
      fullname: 'Noah Kim',
      imgUrl: '/img/img5.jpg',
      rate: 5,
    },
    description:
      'A detailed custom character illustration in your preferred style.',
    imgUrls: [
      'https://res.cloudinary.com/z6rg2bwn/image/upload/v1795022950/c4ee9ea05d4c1f6328eb4c7fea482faf448c7843.webp',
    ],
    tags: ['Illustration', 'Character Design'],
  },
  {
    _id: 'g106',
    title: 'I will record a professional voiceover',
    price: 30,
    rate: 4.4,
    owner: {
      _id: 'u106',
      fullname: 'Sofia Garcia',
      imgUrl: '/img/img6.jpg',
      rate: 4.9,
    },
    description: 'Warm, clear voiceover for your video, ad, or presentation.',
    imgUrls: [
      'https://res.cloudinary.com/z6rg2bwn/image/upload/v1795022949/255281b78dc2dfbd80064ff23f9b459869a77dae.jpg',
    ],
    tags: ['Voiceover', 'Audio'],
  },
  {
    _id: 'g107',
    title: 'I will build a custom WordPress website',
    price: 55,
    rate: 3.9,
    owner: {
      _id: 'u107',
      fullname: 'Ethan Brown',
      imgUrl: '/img/img7.jpg',
      rate: 4.9,
    },
    description:
      'A polished WordPress website built around your brand and goals.',
    imgUrls: [
      'https://res.cloudinary.com/z6rg2bwn/image/upload/v1795022949/23e862369df8a2e891513eedff1ae1d3c10001c9.webp',
    ],
    tags: ['WordPress', 'Web Development'],
  },
  {
    _id: 'g108',
    title: 'I will create social media graphics',
    price: 16,
    rate: 4.7,
    owner: {
      _id: 'u108',
      fullname: 'Isabella Chen',
      imgUrl: '/img/img8.jpg',
      rate: 4.6,
    },
    description:
      'Eye-catching branded graphics for your social media channels.',
    imgUrls: [
      'https://res.cloudinary.com/z6rg2bwn/image/upload/v1795022949/64844d2877638a65f7215ad967fa87cb351b037d.webp',
    ],
    tags: ['Social Media', 'Graphic Design'],
  },
  {
    _id: 'g109',
    title: 'I will translate English to French',
    price: 20,
    rate: 4.1,
    owner: {
      _id: 'u109',
      fullname: 'Lucas Martin',
      imgUrl: '/img/img9.jpg',
      rate: 4.8,
    },
    description:
      'Natural, accurate English-to-French translation with proofreading.',
    imgUrls: [
      'https://res.cloudinary.com/z6rg2bwn/image/upload/v1795022950/73efc96a2e18506a9413ea76d3418d6acc432015.webp',
    ],
    tags: ['Translation', 'French'],
  },
  {
    _id: 'g110',
    title: 'I will compose original background music',
    price: 48,
    rate: 4.5,
    owner: {
      _id: 'u110',
      fullname: 'Olivia Wilson',
      imgUrl: '/img/img10.jpg',
      rate: 5,
    },
    description: 'Original background music composed for your project.',
    imgUrls: [
      'https://res.cloudinary.com/z6rg2bwn/image/upload/v1795022950/7ccd4f3719f3f216b45b8d1d72250f6c68d7de0c.webp',
    ],
    tags: ['Music', 'Composition'],
  },
]

async function query(filterBy = { txt: '', minPrice: 0 }) {
  var gigs = await storageService.query(STORAGE_KEY)
  const { txt, minPrice } = filterBy

  if (txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    gigs = gigs.filter((gig) => regex.test(gig.description))
  }
  if (minPrice) {
    gigs = gigs.filter((gig) => gig.price >= minPrice)
  }
  //   if (sortField === 'vendor') {
  //     gigs.sort(
  //       (gig1, gig2) => gig1[sortField].localeCompare(gig2[sortField]) * +sortDir,
  //     )
  //   }
  //   if (sortField === 'speed') {
  //     gigs.sort((gig1, gig2) => (gig1[sortField] - gig2[sortField]) * +sortDir)
  //   }

  //   gigs = gigs.map(({ _id, vendor, speed, owner }) => ({
  //     _id,
  //     vendor,
  //     speed,
  //     owner,
  //   }))
  return gigs
}

function getById(gigId) {
  return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
  var savedGig
  if (gig._id) {
    const gigToSave = {
      _id: gig._id,
      speed: gig.speed,
    }
    savedGig = await storageService.put(STORAGE_KEY, gigToSave)
  } else {
    const gigToSave = {
      vendor: gig.vendor,
      speed: gig.speed,
      // Later, owner is set by the backend
      owner: userService.getLoggedinUser(),
      msgs: [],
    }
    savedGig = await storageService.post(STORAGE_KEY, gigToSave)
  }
  return savedGig
}

async function addGigMsg(gigId, txt) {
  // Later, this is all done by the backend
  const gig = await getById(gigId)

  const msg = {
    id: makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  gig.msgs.push(msg)
  await storageService.put(STORAGE_KEY, gig)

  return msg
}
