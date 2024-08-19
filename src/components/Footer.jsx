import { useEffect, useState } from 'react';
import './logoscroll.css';

export function Footer() {
    const [logos, setLogos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Ruta al archivo JSON en la carpeta pública
        fetch('/footer-logos/data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setLogos(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading logos:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading logos...</p>;
    }

    if (error) {
        return <p>Error loading logos: {error.message}</p>;
    }

    return (
        <footer>
            <div className='carousel-container relative m-5 mb-5 bg-[#080808]'>
                <div className='carousel-track flex animate-scroll space-x-8 p-2'>
                    {logos.map((logo, index) => (
                        <img
                            key={index}
                            src={logo.src}
                            alt={logo.alt}
                            className='w-28 h-auto object-contain'
                        />
                    ))}
                    {/* Repetimos los logos para crear el efecto infinito */}
                    {logos.map((logo, index) => (
                        <img
                            key={index + logos.length}
                            src={logo.src}
                            alt={logo.alt}
                            className='w-28 h-auto object-contain'
                        />
                    ))}
                </div>
            </div>
        </footer>
    );
}
