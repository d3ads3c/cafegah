import Image from "next/image";
export default function ContactUs() {
  return (
    <main className="">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/90 to-teal-800/90 z-0" />
        <div className="absolute inset-0 bg-[url('/img/about-hero.jpg')] bg-cover bg-center mix-blend-overlay" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-black text-white mb-6">
            ارتباط با کافه گاه
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            شما می توانید در انتقاد و یا پشنهاد خود را در راستای بهبود ارائه
            خدمات و یا امکانات از طریق راه های زیر با ما به اشتراک بگذارید
          </p>
        </div>
      </section>
      <div className="flex gap-5 pb-10 mt-32 mx-auto max-w-7xl px-6">
        <div className="w-1/2 border border-gray-200 rounded-3xl">
          <div className="bg-white p-8 rounded-3xl">
            <div>
              <h2 className="text-[var(--primaryColor)] font-bold">
                فرم آنلاین
              </h2>
              <h2 className="text-2xl">
                به راحتی با کافه گاه در تماس باشید.
              </h2>
              <p className="mt-1">
                با فرم تماس کافه گاه به سادگی نظرات، پیشنهادات و شکایات
                خود را به ما برسانید و از یک ارتباط پایدار بین ما و مشتریان
                مطمئن شوید.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-10 my-5">
                <div className="w-1/2">
                  <p className="mb-1">نام</p>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
                  />
                </div>
                <div className="w-1/2">
                  <p className="mb-1">نام خانوادگی</p>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <div className="w-full">
                  <p className="mb-1">ایمیل</p>
                  <input
                    type="email"
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-5">
                <p className="mb-1">متن شما</p>
                <textarea
                  name=""
                  id=""
                  placeholder="متن خود را اینجا بنویسید ..."
                  rows={5}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
                ></textarea>
              </div>
              <div className="mt-3">
                <button className="w-full py-4 bg-teal-600 text-white rounded-xl hover:shadow-xl hover:shadow-teal-200 hover:cursor-pointer duration-150 active:scale-95">
                  ارسال فرم تماس
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 space-y-3 h-full sticky top-32">
          <div className="bg-white rounded-3xl p-7">
            <Image
              src={"/img/logo/512.png"}
              width={1000}
              height={1000}
              alt="Hamrah Ghate"
              className="max-w-[150px] mx-auto"
            ></Image>
            <h2 className="text-center font-bold mt-2">
              نرم افزار مدیریت کافه گاه
            </h2>
          </div>
          <div className="bg-white rounded-3xl p-7 space-y-3">
            <div className="p-4 rounded-3xl w-full flex items-center bg-gray-50 gap-2">
              <div className="size-12 min-w-[48px] rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                <i className="fi fi-sr-phone-call mt-1.5"></i>
              </div>
              <div>
                <p className="font-bold">تلفن</p>
                <h3 className="text-gray-500">09354244001</h3>
              </div>
            </div>
            <div className="p-4 rounded-3xl w-full flex items-center bg-gray-50 gap-2">
              <div className="size-12 min-w-[48px] rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                <i className="fi fi-sr-envelope mt-1.5"></i>
              </div>
              <div>
                <p className="font-bold">ایمیل</p>
                <h3 className="text-gray-500">contact@cafegah.ir</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
