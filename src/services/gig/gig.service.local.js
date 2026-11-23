import data from '../../../data/gigs-data.json'

import { storageService } from '../async-storage.service'
import { makeId, saveToStorage, getRandomIntInclusive } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'gig'

export const sortGigTags = {
  designAndCreative: ['Arts And Crafts', 'Logo Design', 'Web Design'],
  webDevelopment: ['WordPress', 'Web Development'],
  videoAndAudio: [
    'Video Editing',
    'Voiceover',
    'Audio',
    'Music',
    'Composition',
  ],
  writingAndTranslation: ['Writing', 'Translation', 'French'],
  digitalMarketing: ['Social Media', 'SEO'],
}

export const GigTags = [
  'Arts And Crafts',
  'Logo Design',
  'Web Design',
  'WordPress',
  'Web Development',
  'Video Editing',
  'Voiceover',
  'Audio',
  'Music',
  'Composition',
  'Writing',
  'Translation',
  'French',
  'Social Media',
  'SEO',
]

export const gigService = {
  query,
  getById,
  save,
  remove,
  addGigMsg,
}
window.cs = gigService

async function query(filterBy = { txt: '', minPrice: 0 }) {
  var gigs = await storageService.query(STORAGE_KEY)
  if (!gigs || !gigs.length) {
    gigs = _createGigs(data)
  }

  const { txt, minPrice, tag } = filterBy

  if (txt) {
    const term = txt.trim().toLowerCase()
    gigs = gigs.filter(
      (gig) =>
        gig.owner?.fullName?.toLowerCase().includes(term) ||
        gig.description?.toLowerCase().includes(term) ||
        gig.tags?.some((t) => t.toLowerCase().includes(term)),
    )
  }

  if (minPrice) {
    gigs = gigs.filter((gig) => gig.price >= minPrice)
  }

  if (tag) {
    gigs = gigs.filter((gig) => gig.tags.includes(tag))
  }

  gigs.sort((gig1, gig2) => gig2.owner.rate - gig1.owner.rate)

  //   gigs = gigs.map(({ _id, vendor, speed, owner }) => ({
  //     _id,
  //     vendor,
  //     speed,
  //     owner,
  //   }))
  //console.log('S-gigs',gigs)
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
       const price = +prompt('New price?', gig.price) || 0
        if (price === 0 || price === gig.price) return
        
        const fullName = prompt('New name?', gig.owner.fullName)
        const owner = {...gig.owner,fullName}
        const gigToSave = { ...gig, price ,owner }


    savedGig = await storageService.put(STORAGE_KEY, gigToSave)
  } else {

    gig.owner.fullName = prompt('Name:')
    gig.price = prompt('price:')
    gig.imgUrl = prompt('Img-url:')

    const gigToSave = {
      title: 'I will do your gig',
      description: 'I love this app',
      price: gig.price,
      // Later, owner is set by the backend
      owner: userService.getLoggedinUser() || {
        fullName: gig.owner.fullName,
        rate: getRandomIntInclusive(1, 5),
      },
      likedByUsers: ['Dany'],
      level: 'top rated',
      imgUrls:[
        gig.imgUrl || "https://res.cloudinary.com/z6rg2bwn/image/upload/v1795425035/36f2c80749eb69bc80aca7bb9c76b41f8dc589cc.webp",
        "https://res.cloudinary.com/z6rg2bwn/image/upload/v1795244092/d387c66efa952c73c90213927c3383aeaf0f73a9.webp",
        "https://res.cloudinary.com/z6rg2bwn/image/upload/v1795239833/Dashboard100.webp"
      ],
      tags:[],
    }

    savedGig= await storageService.post(STORAGE_KEY, gigToSave)
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

function _createGigs(data) {
  if (!data || !data.length) return

  saveToStorage(STORAGE_KEY, data)
  return data
}