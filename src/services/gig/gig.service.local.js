import data from '../../../data/gigs-data.json'

import { storageService } from '../async-storage.service'
import { makeId, saveToStorage } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'gig'

export const sortGigTags = {
  designAndCreative: ['Arts And Crafts', 'Logo Design', 'Web Design'],
  webDevelopment: ['WordPress', 'Web Development'],
  videoAndAudio: ['Video Editing', 'Voiceover', 'Audio', 'Music', 'Composition'],
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
    const regex = new RegExp(filterBy.txt, 'i')
    gigs = gigs.filter((gig) => regex.test(gig.description))
  }
  if (minPrice) {
    gigs = gigs.filter((gig) => gig.price >= minPrice)
  }

  if(tag){
    gigs = gigs.filter((gig) => gig.tags.includes(tag))
  }
  
    gigs.sort(
        (gig1, gig2) => gig2.owner.rate-gig1.owner.rate
    )
  
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

function _createGigs(data) {
  if (!data || !data.length) return

  saveToStorage(STORAGE_KEY, data)
  return data
}
