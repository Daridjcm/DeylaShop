import { logos } from '../../public/footer-logos/data'
import './logoscroll.css'

export function Footer() {
    return (
        <footer>
            <div className='carousel-container relative m-5 mb-5 bg-[#080808]'>
            <div className='carousel-track flex animate-scroll space-x-8 p-2'>
                {logos.map((logo, index) => (
                <img key={index} src={logo.src} alt={logo.alt} className='w-28 h-auto object-contain' />
                ))}
                {/* Repetimos los logos para crear el efecto infinito */}
                {logos.map((logo, index) => (
                <img key={index + logos.length} src={logo.src} alt={logo.alt} className='w-28 h-auto object-contain' />
                ))}
            </div>
            </div>
    </footer>
    )
}