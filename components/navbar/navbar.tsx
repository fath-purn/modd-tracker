import NavLink from "@/components/navbar/navlink";

export default function Navbar() {
  return (
    <div className="fixed bottom-0 md:bottom-1 z-50 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/5 w-full md:w-fit">
      <div className="mx-auto bg-[#15b790] text-gray-100 items-center flex justify-center md:bg-none md:flex-none md:rounded-full">
        <NavLink />
      </div>
    </div>
  );
}