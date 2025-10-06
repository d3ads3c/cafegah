import Link from "next/link";
import Image from "next/image";

export default function Headbar() {
    return (
        <div className="w-full px-40 py-4">
            <div className="flex items-center bg-white backdrop-blur-xl p-4 rounded-3xl">
                <div className="w-3/4 flex items-center">
                    <Image src={"/img/logo/512.png"} width={1000} height={1000} alt="Cafegah Logo" className="max-w-[70px]"></Image>
                    <ul className="flex items-center gap-10 mr-14 font-bold">
                        <li>
                            <Link href={"/"}>خانه</Link>
                        </li>
                        <li>
                            <Link href={"/#features"}>قابلیت ها</Link>
                        </li>
                        <li>
                            <Link href={"/#prices"}>قیمت ها</Link>
                        </li>
                        <li>
                            <Link href={"/#faq"}>سوالات متداول</Link>
                        </li>
                        <li>
                            <Link href={"/about-us"}>درباره ما</Link>
                        </li>
                    </ul>
                </div>
                <div className="w-1/4 flex items-center justify-end gap-4">
                    <Link href={"/login"} className="rounded-2xl py-3 px-5 border border-teal-600 text-teal-600 font-bold hover:bg-teal-600 hover:text-white duration-200 hover:shadow-xl hover:shadow-teal-600/30">پنل تامین کنندگان</Link>
                    <Link href={"/login"} className="rounded-2xl py-3 px-5 bg-teal-600 text-white font-bold shadow-xl shadow-teal-600/30">شروع کنید !</Link>
                </div>
            </div>

        </div>
    )

}