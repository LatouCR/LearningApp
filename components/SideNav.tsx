"use client"

import Link from "next/link";
import { LayoutDashboard, School, BookMarked, CalendarDays, Inbox, PencilRuler, HelpCircle, LogOut} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation';

const SideNav = () => {
    const router = useRouter();

    return (
        <aside className="flex-1 flex flex-col fixed top-0 left-0 h-screen w-[12.5rem] z-10 bg-background content-between">
            <header className="flex flex-none border-b-2 border-solid shadow-black/50 w-full h-[105px]">
                <span className="flex items-center justify-center w-full">
                    <Link href="/">
                        <svg width="160" height="60" viewBox="0 0 347 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.312 62V16.752H12.096V55.792H36.288V62H5.312ZM42.4995 62V16.752H73.6675V22.96H49.2835V36.528H70.8515V42.672H49.2835V55.792H73.6675V62H42.4995ZM76.948 62L94.036 16.752H102.804L119.828 62H112.532L109.204 52.912H87.572L84.244 62H76.948ZM89.812 46.832H106.964L98.388 23.216L89.812 46.832ZM125.562 62V16.752H142.97C145.402 16.752 147.621 17.008 149.626 17.52C151.631 17.9893 153.381 18.7787 154.874 19.888C156.367 20.9547 157.519 22.4053 158.33 24.24C159.141 26.0747 159.546 28.336 159.546 31.024C159.546 33.456 159.119 35.5467 158.266 37.296C157.413 39.0453 156.239 40.496 154.746 41.648C153.253 42.8 151.567 43.6747 149.69 44.272L159.354 62H151.866L142.906 45.36H132.346V62H125.562ZM132.346 39.28H141.562C143.098 39.28 144.527 39.1733 145.85 38.96C147.215 38.704 148.41 38.2773 149.434 37.68C150.458 37.04 151.247 36.1867 151.802 35.12C152.399 34.0107 152.698 32.6027 152.698 30.896C152.741 28.9333 152.357 27.376 151.546 26.224C150.778 25.0293 149.626 24.1973 148.09 23.728C146.554 23.216 144.698 22.96 142.522 22.96H132.346V39.28ZM168.312 62V16.752H176.184L198.904 52.08V16.752H205.624V62H197.944L175.096 26.864V62H168.312ZM216.25 62V16.752H223.034V62H216.25ZM233.687 62V16.752H241.559L264.279 52.08V16.752H270.999V62H263.319L240.471 26.864V62H233.687ZM300.313 62.512C295.619 62.512 291.694 61.5307 288.537 59.568C285.422 57.6053 283.075 54.896 281.497 51.44C279.918 47.9413 279.129 43.952 279.129 39.472C279.129 36.1013 279.555 33.008 280.409 30.192C281.305 27.3333 282.627 24.8587 284.377 22.768C286.126 20.6773 288.302 19.0773 290.905 17.968C293.55 16.816 296.601 16.24 300.057 16.24C303.427 16.24 306.393 16.7733 308.953 17.84C311.513 18.864 313.625 20.3573 315.289 22.32C316.995 24.2827 318.147 26.6507 318.745 29.424H311.576C311.193 27.9307 310.467 26.672 309.401 25.648C308.377 24.624 307.075 23.8347 305.497 23.28C303.961 22.7253 302.211 22.448 300.249 22.448C297.689 22.448 295.513 22.896 293.721 23.792C291.929 24.688 290.457 25.9253 289.305 27.504C288.195 29.04 287.385 30.832 286.873 32.88C286.361 34.928 286.105 37.104 286.105 39.408C286.105 42.48 286.595 45.296 287.577 47.856C288.558 50.416 290.094 52.464 292.185 54C294.275 55.536 297.006 56.304 300.377 56.304C302.979 56.304 305.219 55.856 307.097 54.96C308.974 54.0213 310.446 52.6987 311.513 50.992C312.579 49.2427 313.134 47.1307 313.177 44.656H299.161V38.704H319.833V42.032C319.833 46.1707 319.065 49.776 317.529 52.848C315.993 55.92 313.774 58.3093 310.873 60.016C307.971 61.68 304.451 62.512 300.313 62.512Z" fill="white" />
                            <path d="M333.8 28.544C332.888 28.544 332.024 28.376 331.208 28.04C330.416 27.704 329.72 27.248 329.12 26.672C328.52 26.096 328.052 25.412 327.716 24.62C327.38 23.804 327.212 22.928 327.212 21.992C327.212 21.056 327.38 20.192 327.716 19.4C328.052 18.584 328.52 17.888 329.12 17.312C329.72 16.736 330.416 16.28 331.208 15.944C332.024 15.608 332.888 15.44 333.8 15.44C334.712 15.44 335.564 15.608 336.356 15.944C337.172 16.28 337.868 16.736 338.444 17.312C339.044 17.888 339.512 18.584 339.848 19.4C340.208 20.192 340.388 21.056 340.388 21.992C340.388 22.928 340.208 23.804 339.848 24.62C339.512 25.412 339.044 26.096 338.444 26.672C337.868 27.248 337.172 27.704 336.356 28.04C335.564 28.376 334.712 28.544 333.8 28.544ZM333.8 27.068C334.496 27.068 335.132 26.96 335.708 26.744C336.308 26.504 336.824 26.18 337.256 25.772C337.688 25.364 338.024 24.872 338.264 24.296C338.528 23.72 338.66 23.072 338.66 22.352V21.632C338.66 20.912 338.528 20.264 338.264 19.688C338.024 19.112 337.688 18.62 337.256 18.212C336.824 17.804 336.308 17.492 335.708 17.276C335.132 17.036 334.496 16.916 333.8 16.916C333.104 16.916 332.456 17.036 331.856 17.276C331.28 17.492 330.776 17.804 330.344 18.212C329.912 18.62 329.564 19.112 329.3 19.688C329.06 20.264 328.94 20.912 328.94 21.632V22.352C328.94 23.072 329.06 23.72 329.3 24.296C329.564 24.872 329.912 25.364 330.344 25.772C330.776 26.18 331.28 26.504 331.856 26.744C332.456 26.96 333.104 27.068 333.8 27.068ZM332.72 25.304H331.28V18.644H334.34C335.012 18.644 335.528 18.836 335.888 19.22C336.272 19.58 336.464 20.072 336.464 20.696C336.464 21.632 336.02 22.256 335.132 22.568L336.788 25.304H335.168L333.764 22.784H332.72V25.304ZM334.016 21.74C334.64 21.74 334.952 21.452 334.952 20.876V20.624C334.952 20.048 334.64 19.76 334.016 19.76H332.72V21.74H334.016Z" fill="white" />
                        </svg>
                    </Link>
                </span>
            </header>

            <nav className="flex flex-col flex-1">
                <ul className="py-4 text-white  w-full">
                    <li className="w-full p-2 hover:bg-hover">
                        <Link href="/pag_institucion" className="gap-2 inline-flex items-center">
                            <School size={24} />
                            <h1 className="font-sm" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                                Página de la Institución
                            </h1>
                        </Link>
                    </li>
                    <li className="w-full p-2 hover:bg-hover">
                        <Link href="/dashboard" className="gap-2 inline-flex items-center">
                            <LayoutDashboard size={24} />
                            <h1 className="font-sm">
                                Dashboard
                            </h1>
                        </Link>
                    </li>
                    <li className="w-full p-2 hover:bg-hover">
                        <Link href="/cursos" className="gap-2 inline-flex items-center">
                            <BookMarked size={24} />
                            <h1 className="font-sm">
                                Cursos
                            </h1>
                        </Link>
                    </li>
                    <li className="w-full p-2 hover:bg-hover">
                        <Link href="/calendario" className="gap-2 inline-flex items-center">
                            <CalendarDays size={24} />
                            <h1 className="font-sm">
                                Calendario
                            </h1>
                        </Link>
                    </li>
                    <li className="w-full p-2 hover:bg-hover">
                        <Link href="/mensajes" className="gap-2 inline-flex items-center">
                            <Inbox size={24} />
                            <h1 className="font-sm">
                                Mensajes
                            </h1>
                        </Link>
                    </li>
                    <li className="w-full p-2 hover:bg-hover">
                        <Link href="/herramientas" className="gap-2 inline-flex items-center">
                            <PencilRuler size={24} />
                            <h1 className="font-sm">
                                Herramientas
                            </h1>
                        </Link>
                    </li>
                    <li className="w-full p-2 hover:bg-hover">
                        <Link href="/help" className="gap-2 inline-flex items-center">
                            <HelpCircle size={24} />
                            <h1 className="font-sm">
                                Ayuda
                            </h1>
                        </Link>
                    </li>
                    <li className="w-full p-2 hover:bg-hover">
                    <Link href="/logIn" className="gap-2 inline-flex items-center">
                            <LogOut size={24} />
                            <h1 className="font-sm">
                                Cerrar Sesion
                            </h1>
                        </Link>
                    </li>

                </ul>
            </nav>


            <div className="inline-flex items-center w-full mt-auto p-4">
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>GU</AvatarFallback>
                </Avatar>
                <div className="px-2 text-white">
                    Usuario
                </div>
            </div>

        </aside>
    );
};

export default SideNav;

