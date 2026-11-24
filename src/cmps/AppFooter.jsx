import { useSelector } from 'react-redux'

import logo from '../../public/img/logo.png'

const socialLinks = [
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@fiverr',
    icon: '/icons/tiktok-icon.svg',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/fiverr/',
    icon: '/icons/instagram-icon.svg',
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/company/fiverr-com/',
    icon: '/icons/linkedin-icon.svg',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/Fiverr/',
    icon: '/icons/facebook-icon.svg',
  },
  {
    name: 'Pinterest',
    url: 'https://www.pinterest.com/fiverr/',
    icon: '/icons/pinterest-icon.svg',
  },
  {
    name: 'Twitter',
    url: 'https://x.com/fiverr',
    icon: '/icons/twitter-icon.svg',
  },
]

export function AppFooter() {
  const count = useSelector((storeState) => storeState.userModule.count)

  return (
    <footer className="app-footer">
      <section>
        <div className="footer-social-links">
          <div className="footer-logo">
            <img className="logo-img" src={logo} alt="logo" />
            <span>© Fiverr International Ltd. 2026</span>
          </div>
          <div className="social-links">
            <ul className="social-links">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    <img src={link.icon} alt="" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </footer>
  )
}
