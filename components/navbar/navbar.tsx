import NavLink from "@/components/navbar/navlink";

export default function Navbar() {
  return (
    <div className="fixed bottom-4 z-50 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit">
      <div className="mx-auto ">
        <NavLink />
      </div>
    </div>
  );
}
