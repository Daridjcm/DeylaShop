import { logos } from '../../public/footer-logos/data'
import './logoscroll.css'

export function Footer() {
    return (
        <footer>
            <div className='carousel-container overflow-hidden relative'>
            <div className='carousel-track flex animate-scroll space-x-8'>
                {logos.map((logo, index) => (
                <img key={index} src={logo.src} alt={logo.alt} className='w-32 h-auto object-contain' />
                ))}
                {/* Repetimos los logos para crear el efecto infinito */}
                {logos.map((logo, index) => (
                <img key={index + logos.length} src={logo.src} alt={logo.alt} className='w-32 h-auto object-contain' />
                ))}
            </div>
            </div>
    </footer>
    )
}