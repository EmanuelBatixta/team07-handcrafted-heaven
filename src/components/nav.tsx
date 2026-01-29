'use client'

import Link from 'next/link'
import styles from './components.module.css'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

export default function Nav(){
    const pathname = usePathname()
    const links = [{ href: '/', name: 'Home'}, {href: '/product-list', name: 'Products'},{href: '/about-us', name: 'About Us'}]

    return( 
        <nav className={styles.nav}>
            {links.map((link)=>{
                return (
                    <Link href={link.href} key={link.name} className={clsx(
                    {
                        [styles.actualPage] : pathname === link.href,

                    },
                )}
            >{link.name}</Link>
                )
            })}
        </nav>
    )
}