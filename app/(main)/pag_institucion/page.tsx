export default function Page() {
    return (
        <section className="flex flex-col w-screen min-h-screen max-w-full">
            <div className="relative w-full bg-cover bg-center">
                <img src="/banner-ulacit.png" alt="" className="object-fit w-screen"/>
            </div>
            
            <div className="pl-10 pr-6 text-sm text-gray-600">
                <br />
                <h1 className="text-5xl font-bold mb-4">Bienvenido a Learning en ULACIT</h1>
                <div className="p-4 border border-gray-300 rounded-md mb-4">
                    <p className="text-lg text-justify overflow-auto">
                        ULACIT ofrece a sus estudiantes y docentes un entorno de aprendizaje moderno, atractivo y accesible, utilizando la plataforma de educación en línea “Learning”. Por medio de esta herramienta, el aprendizaje en línea puede desarrollarse en un entorno sincrónico, con interacción instantánea; o asíncrono, como en el caso de debates entre estudiantes. Los estudiantes y profesores pueden ingresar y hacer uso de la plataforma por medio de dispositivos móviles, de tal forma que facilita soluciones de vanguardia que permiten desarrollar modos flexibles y escalables para la entrega de este servicio. 
                    </p>
                    <br />
                    <p className="text-lg text-justify overflow-auto">
                        “Learning” es el proveedor de tecnología educativa más grande del mundo, garantía que nos permite contar con un soporte adecuado y justo a tiempo en caso de que ocurra cualquier incidente que afecte el servicio. A través de esta plataforma, ULACIT se suma a la comunidad internacional de instituciones de educación superior que tienen acceso a los recursos de información, sobre innovación y mejores prácticas en educación virtual, que comparten las universidades afiliadas alrededor del mundo. En el sitio web de Learning existe una amplia variedad de materiales de capacitación como los tutoriales y la ayuda en línea; y materiales dirigidos tanto para estudiantes como para docentes, disponibles en el idioma español.
                    </p>
                </div>
                <br />
            </div>
            <div className="pl-10 pr-6 text-sm text-gray-600">
                <h2 className="text-3xl mb-4">Sitios Relacionados</h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li><a href="https://www.office.com/" className="text-blue-500">Ingresá aquí a tu cuenta de correo ULACIT</a></li>
                    <li><a href="https://enrollogic.ulacit.ac.cr/#/login" className="text-blue-500">Enrollogic</a></li>
                    <li><a href="http://www.ulacit.ac.cr/" className="text-blue-500">Sitio Web de ULACIT</a></li>
                    <li><a href="https://www.facebook.com/ulacitcostarica/" className="text-blue-500">ULACIT en Facebook</a></li>
                    <li><a href="https://www.instagram.com/ulacitcr/?hl=es-la" className="text-blue-500">ULACIT en Instagram</a></li>
                    <li><a href="https://www.linkedin.com/school/ulacitcostarica/" className="text-blue-500">ULACIT en LinkedIn</a></li>
                    <li><a href="https://twitter.com/ulacitcostarica?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" className="text-blue-500">ULACIT en X/Twitter</a></li>
                </ul>
            </div>
        </section>
    );
}