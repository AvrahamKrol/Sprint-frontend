import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
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

const gigs = [
  {
    _id: 'g101',
    title: 'I will design your logo',
    price: 12.16,
    rate: 4.6,
    owner: { _id: 'u101', fullname: 'Dudu Da', imgUrl: 'url', rate: 4 },
    description: 'Make a unique logo for your brand.',
    imgUrls: ['/img/img1.jpg'],
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
    imgUrls: ['/img/img2.jpg'],
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
    imgUrls: ['/img/img3.jpg'],
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
    imgUrls: ['/img/img4.jpg'],
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
    imgUrls: ['/img/img5.jpg'],
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
    imgUrls: ['/img/img6.jpg'],
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
    imgUrls: ['/img/img7.jpg'],
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
    imgUrls: ['/img/img8.jpg'],
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
    imgUrls: ['/img/img9.jpg'],
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
    imgUrls: ['/img/img10.jpg'],
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
  // if (sortField === 'vendor') {
  //   gigs.sort(
  //     (gig1, gig2) => gig1[sortField].localeCompare(gig2[sortField]) * +sortDir,
  //   )
  // }
  // if (sortField === 'speed') {
  //   gigs.sort((gig1, gig2) => (gig1[sortField] - gig2[sortField]) * +sortDir)
  // }

  // gigs = gigs.map(({ _id, vendor, speed, owner }) => ({
  //   _id,
  //   vendor,
  //   speed,
  //   owner,
  // }))
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
