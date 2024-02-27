import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex items-center mx-3 p-3 border-t border-slate-200">
      <div className="ml-2">
        <span className="">
          <Link href="/">
            <Image src="/Logo.png" alt="Logo" width={114} height={16} />
          </Link>
        </span>
      </div>

      <div className="flex justify-end flex-1"> 
        <div className="text-gray-700 font-normal text-xs">
          <Link href="" className="ml-2">
            Privacidad
          </Link>
          <Link href="" className="ml-2">
            Terminos
          </Link>
          <Link href="" className="ml-2">
            Acesibilidad
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
