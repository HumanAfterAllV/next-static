import React, { PropsWithChildren } from 'react'
import Link, {LinkProps} from 'next/link'
import { NavBar } from '@ui/NavBar'
import { Button } from '@ui/Button'

import { PreviewModeBanner } from './PreviewModeBanner'

// export function Header() {
//   return (
//     <div className="mx-auto" style={{ maxWidth: '98%' }}>
//       <NavBar title="🌿 Plantpedia">
//         <div>{/* NavLink items */}</div>
//       </NavBar>
//     </div>
//   )
// }


export function Header() {
  return (
    <>
      <PreviewModeBanner />
      <div className="mx-auto" style={{ maxWidth: '98%' }}>
        <NavBar title="🌿 Plantpedia">
          <div>
            <NavLink legacyBehavior href="/top-stories">Top Stories</NavLink>
          </div>
        </NavBar>
      </div>
    </>
  )
}

function NavLink({ children, ...linkProps }: PropsWithChildren<LinkProps>) {
  return (
    <Link legacyBehavior {...linkProps} passHref>
      <Button color="inherit" variant="text" component="a">
        {children}
      </Button>
    </Link>
  )
}